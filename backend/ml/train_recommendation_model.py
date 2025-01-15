import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib
import pymongo
from datetime import datetime, timedelta

# MongoDB bağlantısı
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["duygu-analizi"]

def prepare_training_data():
    # Önerileri al
    recommendations = list(db.recommendations.find())
    
    # Veriyi hazırla
    data = []
    for rec in recommendations:
        data.append({
            'mood': rec['mood'],
            'category': rec['category'],
            'type': rec['type'],
            'effectiveness': rec.get('effectiveness', 0),
            'positive_feedback': rec.get('positiveFeeback', 0),
            'usage_count': rec.get('usageCount', 0)
        })
    
    return pd.DataFrame(data)

def train_model():
    # Veriyi hazırla
    df = prepare_training_data()
    
    if len(df) == 0:
        raise ValueError("Eğitim için veri bulunamadı!")
    
    print("\nVeri seti boyutu:", len(df))
    print("Örnek veri:")
    print(df.head())
    
    # Kategorik değişkenleri encode et
    le_mood = LabelEncoder()
    le_category = LabelEncoder()
    le_type = LabelEncoder()
    
    df['mood_encoded'] = le_mood.fit_transform(df['mood'])
    df['category_encoded'] = le_category.fit_transform(df['category'])
    df['type_encoded'] = le_type.fit_transform(df['type'])
    
    # Özellikler ve hedef
    X = df[['mood_encoded', 'category_encoded', 'type_encoded', 'usage_count']]
    y = (df['effectiveness'] >= 3).astype(int)
    
    print("\nSınıf dağılımı:")
    print(y.value_counts())
    
    # Veriyi böl
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Model performansını değerlendir
    y_pred = model.predict(X_test)
    print("\nModel Performansı:")
    print(classification_report(y_test, y_pred))
    
    # Modeli kaydet
    model_data = {
        'model': model,
        'le_mood': le_mood,
        'le_category': le_category,
        'le_type': le_type,
        'feature_names': ['mood_encoded', 'category_encoded', 'type_encoded', 'usage_count']
    }
    joblib.dump(model_data, 'recommendation_model.joblib')
    
    return model_data

def predict_recommendation_success(model_data, mood, category, rec_type):
    """
    Bir önerinin başarılı olma olasılığını tahmin et
    """
    try:
        model = model_data['model']
        le_mood = model_data['le_mood']
        le_category = model_data['le_category']
        le_type = model_data['le_type']
        feature_names = model_data['feature_names']
        
        # Girdiyi encode et
        mood_encoded = le_mood.transform([mood])[0]
        category_encoded = le_category.transform([category])[0]
        type_encoded = le_type.transform([rec_type])[0]
        
        # Tahmin için DataFrame oluştur
        X = pd.DataFrame([[mood_encoded, category_encoded, type_encoded, 0]], 
                        columns=feature_names)
        
        # Tahmin
        prob = model.predict_proba(X)[0]
        return prob[1] if len(prob) > 1 else prob[0]
        
    except Exception as e:
        print(f"Tahmin hatası: {str(e)}")
        return 0.5  # Hata durumunda nötr bir değer döndür

if __name__ == "__main__":
    print("Model eğitimi başlıyor...")
    model_data = train_model()
    
    # Test tahminleri
    test_cases = [
        ('negatif', 'Kişisel', 'müzik'),
        ('pozitif', 'İş', 'aktivite'),
        ('nötr', 'Sosyal', 'hobi')
    ]
    
    print("\nTest Tahminleri:")
    for mood, category, rec_type in test_cases:
        prob = predict_recommendation_success(model_data, mood, category, rec_type)
        print(f"Mood: {mood}, Category: {category}, Type: {rec_type}")
        print(f"Başarı olasılığı: {prob:.2f}")
        print() 