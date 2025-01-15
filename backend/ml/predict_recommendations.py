import sys
import joblib
import json

def predict_recommendations(mood, category):
    try:
        # Modeli yükle
        model_data = joblib.load('recommendation_model.joblib')
        model = model_data['model']
        le_mood = model_data['le_mood']
        le_category = model_data['le_category']
        le_type = model_data['le_type']
        
        # Girdiyi encode et
        mood_encoded = le_mood.transform([mood])[0]
        category_encoded = le_category.transform([category])[0]
        
        # Tüm öneri tipleri için tahmin yap
        predictions = []
        for type_name in le_type.classes_:
            type_encoded = le_type.transform([type_name])[0]
            X = [[mood_encoded, category_encoded, type_encoded, 0]]
            prob = model.predict_proba(X)[0]
            success_prob = prob[1] if len(prob) > 1 else prob[0]
            
            predictions.append({
                'type': type_name,
                'probability': float(success_prob)
            })
        
        # Olasılığa göre sırala
        predictions.sort(key=lambda x: x['probability'], reverse=True)
        
        # JSON olarak yazdır
        print(json.dumps(predictions))
        return 0
        
    except Exception as e:
        print(f"Hata: {str(e)}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Kullanım: python predict_recommendations.py <mood> <category>", file=sys.stderr)
        sys.exit(1)
        
    mood = sys.argv[1]
    category = sys.argv[2]
    sys.exit(predict_recommendations(mood, category)) 