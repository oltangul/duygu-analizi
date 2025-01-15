// Türkçe Duygu Sözlüğü
const sentimentLexicon = {
    pozitif: [
        // Duygular
        'mutlu', 'harika', 'güzel', 'muhteşem', 'mükemmel', 'iyi', 'başarılı',
        'huzurlu', 'neşeli', 'keyifli', 'sevindim', 'sevinçli', 'heyecanlı',
        'umutlu', 'enerjik', 'motiveli', 'coşkulu', 'rahat', 'hevesli',
        'tatmin', 'memnun', 'pozitif', 'güçlü', 'özgüvenli', 'başardım',
        'seviyorum', 'sevgi', 'aşk', 'mutluluk', 'huzur', 'barış',
        'şanslı', 'şans', 'başarı', 'azim', 'kararlı', 'istekli',
        'heyecan verici', 'ilham verici', 'gurur verici', 'tatmin edici',
        'teşvik edici', 'motive edici', 'cesaret verici', 'ümit verici',

        // Olumlu Eylemler
        'gelişiyorum', 'ilerliyorum', 'öğreniyorum', 'büyüyorum', 'kazandım',
        'başardım', 'tamamladım', 'hallettim', 'çözdüm', 'üstesinden geldim',
        'iyileştim', 'geliştim', 'ilerledim', 'yükseldim', 'yükseliyorum',
        'başarıyorum', 'yapabiliyorum', 'üretiyorum', 'yaratıyorum',

        // Olumlu Durumlar
        'verimli', 'düzenli', 'planlı', 'organize', 'aktif', 'dinamik',
        'destekleyici', 'yardımsever', 'anlayışlı', 'sabırlı', 'sakin',
        'dengeli', 'uyumlu', 'düzgün', 'sistemli', 'tertipli', 'düzenli',
        'başarılı', 'etkili', 'yararlı', 'faydalı', 'değerli', 'önemli',

        // Olumlu İfadeler
        'teşekkür ederim', 'çok iyi', 'süper', 'harika', 'mükemmel',
        'tam istediğim gibi', 'çok memnunum', 'çok beğendim',
        'kendimi iyi hissediyorum', 'mutluyum', 'huzurluyum'
    ],

    negatif: [
        // Olumsuz Duygular
        'üzgün', 'kötü', 'berbat', 'korkunç', 'kötü', 'başarısız', 'mutsuz',
        'gergin', 'kaygılı', 'endişeli', 'stresli', 'yorgun', 'bitkin',
        'umutsuz', 'enerjisiz', 'motivasyonsuz', 'isteksiz', 'rahatsız',
        'tatminsiz', 'memnuniyetsiz', 'negatif', 'güçsüz', 'özgüvensiz',
        'nefret', 'öfke', 'kızgın', 'sinirli', 'çaresiz', 'yalnız',
        'başarısız', 'yetersiz', 'eksik', 'huzursuz', 'tedirgin',
        'endişe verici', 'moral bozucu', 'can sıkıcı', 'hayal kırıklığı',
        'umutsuzluk', 'çaresizlik', 'yetersizlik', 'başarısızlık',

        // Olumsuz Eylemler
        'kaybettim', 'başaramadım', 'yapamadım', 'beceremedim', 'olmadı',
        'yetişemedim', 'yetiştiremiyorum', 'zorlanıyorum', 'bunalıyorum',
        'düşüyorum', 'kaybediyorum', 'başaramıyorum', 'yapamıyorum',
        'beceremiyorum', 'zorlanıyorum', 'yoruluyorum', 'tükeniyorum',

        // Olumsuz Durumlar
        'verimsiz', 'düzensiz', 'plansız', 'dağınık', 'pasif', 'durgun',
        'engelleyici', 'zorlayıcı', 'anlayışsız', 'sabırsız', 'huzursuz',
        'dengesiz', 'uyumsuz', 'düzensiz', 'sistemsiz', 'tertipsiz',
        'başarısız', 'etkisiz', 'yararsız', 'faydasız', 'değersiz',

        // Olumsuz İfadeler
        'hiç beğenmedim', 'çok kötü', 'berbat', 'rezalet', 'felaket',
        'hiç istemiyorum', 'asla olmaz', 'imkansız', 'yapamam',
        'kendimi kötü hissediyorum', 'mutsuzum', 'huzursuzum',
        'istemiyorum', 'sevmiyorum', 'nefret ediyorum'
    ],

    nötr: [
        // Nötr Duygular
        'normal', 'orta', 'idare', 'fena değil', 'şöyle böyle', 'eh işte',
        'değişken', 'karışık', 'belirsiz', 'standart', 'olağan', 'sıradan',
        'bilmiyorum', 'emin değilim', 'kararsızım', 'belki',

        // Nötr Eylemler
        'devam ediyorum', 'sürdürüyorum', 'gidiyorum', 'bakıyorum',
        'düşünüyorum', 'bekliyorum', 'izliyorum', 'takip ediyorum',
        'deniyorum', 'çalışıyorum', 'uğraşıyorum',

        // Nötr Durumlar
        'dengeli', 'değişken', 'kararsız', 'belirsiz', 'rutin', 'alışılmış',
        'her zamanki gibi', 'olağan', 'standart', 'tipik', 'klasik'
    ],

    güçlendiriciler: [
        'çok', 'aşırı', 'fazla', 'oldukça', 'bayağı', 'epey', 'gayet',
        'son derece', 'fazlasıyla', 'ziyadesiyle', 'hayli', 'epeyce',
        'inanılmaz', 'müthiş', 'kesinlikle', 'gerçekten', 'hakikaten',
        'ciddi anlamda', 'büyük ölçüde', 'tamamen', 'tümüyle'
    ],

    zayıflatıcılar: [
        'biraz', 'azıcık', 'birazcık', 'az', 'kısmen', 'belki',
        'sanırım', 'galiba', 'neredeyse', 'yaklaşık', 'bir miktar',
        'pek', 'hafifçe', 'kısmen', 'bir nebze', 'bir parça',
        'az çok', 'biraz olsun', 'az da olsa'
    ]
};

module.exports = sentimentLexicon; 