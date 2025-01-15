const questions = [
    {
        id: 1,
        text: "Şu anda kendini nasıl hissediyorsun?",
        options: [
            "Muhteşem ve enerjik hissediyorum",
            "İyi ve pozitif hissediyorum",
            "Normal/ortalama hissediyorum",
            "Biraz yorgun ve durgun hissediyorum",
            "Çok kötü ve mutsuz hissediyorum"
        ]
    },
    {
        id: 2,
        text: "Günün en keyifli anı hangisiydi?",
        options: [
            "Harika bir deneyim yaşadım ve unutulmaz bir an oldu",
            "Güzel bir an yaşadım ve beni mutlu etti",
            "Normal bir gündü, özel bir an yoktu",
            "Pek keyifli bir anım olmadı",
            "Bugün hiç keyif alamadım"
        ]
    },
    {
        id: 3,
        text: "Şu anda ruh halini hangi renk temsil ederdi?",
        options: [
            "Parlak sarı (enerji ve mutluluk dolu)",
            "Açık mavi (huzurlu ve sakin)",
            "Yeşil (dengeli ve normal)",
            "Gri (durgun ve belirsiz)",
            "Siyah (karamsar ve negatif)"
        ]
    },
    {
        id: 4,
        text: "Bugün seni en çok ne mutlu etti?",
        options: [
            "Birçok harika olay yaşadım ve çok mutluyum",
            "Güzel bir olay beni mutlu etti",
            "Normal şeyler, özel bir mutluluk yaşamadım",
            "Pek mutlu eden bir şey olmadı",
            "Hiçbir şey beni mutlu etmedi"
        ]
    },
    {
        id: 5,
        text: "Seni şu anda en çok endişelendiren şey nedir?",
        options: [
            "Hiçbir endişem yok, çok huzurluyum",
            "Küçük endişelerim var ama yönetilebilir",
            "Normal seviyede endişelerim var",
            "Birçok şey beni endişelendiriyor",
            "Çok yoğun endişe ve kaygı yaşıyorum"
        ]
    },
    {
        id: 6,
        text: "Şu anda enerjin düşük mü, yoksa yüksek mi hissediyorsun?",
        options: [
            "Enerjim çok yüksek, kendimi çok dinamik hissediyorum",
            "Enerjim iyi seviyede, aktif hissediyorum",
            "Normal bir enerji seviyesindeyim",
            "Enerjim biraz düşük, yorgun hissediyorum",
            "Enerjim çok düşük, kendimi bitkin hissediyorum"
        ]
    },
    {
        id: 7,
        text: "Bugün seni zorlayan bir durumla karşılaştın mı?",
        options: [
            "Hiçbir zorlukla karşılaşmadım, her şey yolunda gitti",
            "Küçük zorluklarla karşılaştım ama kolayca üstesinden geldim",
            "Normal zorluklar yaşadım",
            "Birkaç zorlayıcı durumla karşılaştım ve zorlandım",
            "Çok fazla zorlukla karşılaştım ve başa çıkamadım"
        ]
    },
    {
        id: 8,
        text: "Kendini şu anda rahatlamış mı, yoksa gergin mi hissediyorsun?",
        options: [
            "Çok rahat ve huzurluyum",
            "Genel olarak rahatım",
            "Normal hissediyorum",
            "Biraz gerginim",
            "Çok gergin ve stres altındayım"
        ]
    },
    {
        id: 9,
        text: "Şu anda düşündüğün bir şey varsa, bunu paylaşmak ister misin?",
        options: [
            "Çok pozitif düşünceler içindeyim",
            "İyi şeyler düşünüyorum",
            "Normal, günlük düşünceler",
            "Biraz kaygılı düşüncelerim var",
            "Çok olumsuz düşünceler içindeyim"
        ]
    },
    {
        id: 10,
        text: "Bugün seni gülümseten bir şey oldu mu?",
        options: [
            "Birçok kez kahkaha attım ve çok eğlendim",
            "Birkaç kez gülümsedim ve mutlu oldum",
            "Normal bir gündü",
            "Pek gülümseyemedim",
            "Hiç gülümseyemedim"
        ]
    },
    {
        id: 11,
        text: "Şu an yapmak istediğin bir şey var mı?",
        options: [
            "Çok heyecan verici planlarım var",
            "Yapmak istediğim güzel şeyler var",
            "Normal planlarım var",
            "Pek bir şey yapmak istemiyorum",
            "Hiçbir şey yapmak istemiyorum"
        ]
    },
    {
        id: 12,
        text: "Bugün kendine vakit ayırabildin mi?",
        options: [
            "Kendime çok güzel vakit ayırdım",
            "Biraz vakit ayırabildim",
            "Normal bir gündü",
            "Çok az vakit ayırabildim",
            "Hiç vakit ayıramadım"
        ]
    },
    {
        id: 13,
        text: "Şu anda ruh halini hangi şarkı yansıtırdı?",
        options: [
            "Çok neşeli ve enerjik bir şarkı",
            "Pozitif ve mutlu bir şarkı",
            "Normal, sakin bir şarkı",
            "Hüzünlü bir şarkı",
            "Çok karamsar bir şarkı"
        ]
    },
    {
        id: 14,
        text: "Kendini şu anda bir hayvanla tanımlaman gerekse, bu hangi hayvan olurdu?",
        options: [
            "Neşeli bir yunus",
            "Özgür bir kuş",
            "Sakin bir kedi",
            "Yalnız bir kurt",
            "Üzgün bir köpek"
        ]
    },
    {
        id: 15,
        text: "Şu anda huzurlu hissediyor musun?",
        options: [
            "Çok huzurlu ve mutluyum",
            "Huzurluyum",
            "Normal hissediyorum",
            "Pek huzurlu değilim",
            "Hiç huzurlu değilim"
        ]
    },
    {
        id: 16,
        text: "Bugün kendine yeterince iyi davrandığını düşünüyor musun?",
        options: [
            "Kendime çok iyi davrandım",
            "İyi davrandım",
            "Normal davrandım",
            "Pek iyi davranmadım",
            "Hiç iyi davranmadım"
        ]
    },
    {
        id: 17,
        text: "Şu anda kafanda beliren bir kelime var mı?",
        options: [
            "Çok pozitif bir kelime (mutluluk, neşe, vb.)",
            "İyi bir kelime (huzur, rahatlık, vb.)",
            "Normal bir kelime",
            "Negatif bir kelime (üzüntü, endişe, vb.)",
            "Çok olumsuz bir kelime (mutsuzluk, stres, vb.)"
        ]
    },
    {
        id: 18,
        text: "Bugün biriyle keyifli bir konuşma yaptın mı?",
        options: [
            "Harika sohbetler ettim",
            "Güzel konuşmalarım oldu",
            "Normal konuşmalar yaptım",
            "Pek keyifli konuşmalar yapmadım",
            "Hiç keyifli konuşma yapmadım"
        ]
    },
    {
        id: 19,
        text: "Şu anda bir dileğin olsaydı, ne dilerdin?",
        options: [
            "Çok pozitif ve umut dolu bir dilek",
            "Güzel bir dilek",
            "Normal bir dilek",
            "Kaygılı bir dilek",
            "Çok olumsuz bir dilek"
        ]
    },
    {
        id: 20,
        text: "Bugün kendinle ilgili ne öğrendin?",
        options: [
            "Çok olumlu şeyler öğrendim",
            "İyi şeyler öğrendim",
            "Normal şeyler öğrendim",
            "Pek iyi şeyler öğrenmedim",
            "Hiç iyi bir şey öğrenmedim"
        ]
    }
];

const moodRanges = [
    {
        min: 20,
        max: 30,
        name: "Düşük Moral ve Enerji",
        recommendations: {
            müzik: [
                "Sakinleştirici klasik müzik",
                "Pozitif sözlü şarkılar",
                "Rahatlatıcı doğa sesleri"
            ],
            aktivite: [
                "Kısa yürüyüşler",
                "Hafif yoga",
                "Nefes egzersizleri"
            ],
            kitap: [
                "Kişisel gelişim kitapları",
                "Motivasyon hikayeleri",
                "Pozitif psikoloji kitapları"
            ],
            hobi: [
                "Resim yapma",
                "Günlük tutma",
                "Mandala boyama"
            ],
            öneri: [
                "Profesyonel destek almayı düşünebilirsiniz",
                "Sevdiklerinizle duygularınızı paylaşın",
                "Kendinize zaman ayırın ve dinlenin"
            ]
        }
    },
    {
        min: 31,
        max: 40,
        name: "Gergin ve Karamsar",
        recommendations: {
            müzik: [
                "Rahatlatıcı meditasyon müzikleri",
                "Yumuşak enstrümantal müzik",
                "Pozitif ritimli şarkılar"
            ],
            aktivite: [
                "Meditasyon",
                "Bahçe işleri",
                "Hafif egzersizler"
            ],
            kitap: [
                "Mindfulness kitapları",
                "Hafif romanlar",
                "İlham verici hikayeler"
            ],
            hobi: [
                "Bitki yetiştirme",
                "Origami",
                "El işi"
            ],
            öneri: [
                "Düzenli uyku rutini oluşturun",
                "Sosyal medyaya ara verin",
                "Doğada vakit geçirin"
            ]
        }
    },
    {
        min: 41,
        max: 50,
        name: "Karışık Duygular",
        recommendations: {
            müzik: [
                "Jazz müzik",
                "Soft rock",
                "Akustik müzik"
            ],
            aktivite: [
                "Dans etme",
                "Yemek yapma",
                "Fotoğraf çekme"
            ],
            kitap: [
                "Macera romanları",
                "Biyografiler",
                "Seyahat kitapları"
            ],
            hobi: [
                "Fotoğrafçılık",
                "Koleksiyon yapma",
                "Blog yazma"
            ],
            öneri: [
                "Günlük rutinler oluşturun",
                "Yeni hobiler keşfedin",
                "Arkadaşlarınızla vakit geçirin"
            ]
        }
    },
    {
        min: 51,
        max: 60,
        name: "Nötr ve Durağan",
        recommendations: {
            müzik: [
                "Pop müzik",
                "Ritimli şarkılar",
                "Dans müzikleri"
            ],
            aktivite: [
                "Yeni yerler keşfetme",
                "Bisiklet sürme",
                "Yürüyüş yapma"
            ],
            kitap: [
                "Polisiye romanlar",
                "Bilim kurgu",
                "Fantastik kitaplar"
            ],
            hobi: [
                "Yeni dil öğrenme",
                "Puzzle yapma",
                "Spor yapma"
            ],
            öneri: [
                "Yeni aktiviteler deneyin",
                "Sosyal gruplara katılın",
                "Rutininizi değiştirin"
            ]
        }
    },
    {
        min: 61,
        max: 70,
        name: "Olumlu ve İyimser",
        recommendations: {
            müzik: [
                "Enerjik pop şarkıları",
                "Dans müzikleri",
                "Pozitif şarkılar"
            ],
            aktivite: [
                "Grup sporları",
                "Dans kursları",
                "Sosyal etkinlikler"
            ],
            kitap: [
                "İlham verici başarı hikayeleri",
                "Kişisel gelişim",
                "Pozitif psikoloji"
            ],
            hobi: [
                "Enstrüman çalma",
                "Dans etme",
                "Resim yapma"
            ],
            öneri: [
                "Yeni projeler başlatın",
                "Sosyal etkinlikler düzenleyin",
                "Başkalarına yardım edin"
            ]
        }
    },
    {
        min: 71,
        max: 80,
        name: "Mutlu ve Motive",
        recommendations: {
            müzik: [
                "Hareketli şarkılar",
                "Motivasyon playlist'leri",
                "Enerji dolu müzikler"
            ],
            aktivite: [
                "Koşu",
                "Yüzme",
                "Takım sporları"
            ],
            kitap: [
                "Kişisel gelişim",
                "Girişimcilik",
                "Liderlik"
            ],
            hobi: [
                "Yeni spor dalları",
                "Gönüllü çalışmalar",
                "Proje geliştirme"
            ],
            öneri: [
                "Hedefler belirleyin",
                "Başkalarına yardım edin",
                "Deneyimlerinizi paylaşın"
            ]
        }
    },
    {
        min: 81,
        max: 90,
        name: "Çok Mutlu ve Dinamik",
        recommendations: {
            müzik: [
                "Rock müzik",
                "Elektronik müzik",
                "Dans müziği"
            ],
            aktivite: [
                "Ekstrem sporlar",
                "Dans partileri",
                "Grup aktiviteleri"
            ],
            kitap: [
                "Yaratıcılık kitapları",
                "Liderlik",
                "İnovasyon"
            ],
            hobi: [
                "DJ'lik",
                "Performans sanatları",
                "Organizasyon düzenleme"
            ],
            öneri: [
                "Başkalarına ilham verin",
                "Deneyimlerinizi paylaşın",
                "Yeni projeler başlatın"
            ]
        }
    },
    {
        min: 91,
        max: 100,
        name: "Zirve Noktası",
        recommendations: {
            müzik: [
                "Festival müzikleri",
                "Coşkulu şarkılar",
                "Dans müzikleri"
            ],
            aktivite: [
                "Organizasyon düzenleme",
                "Liderlik aktiviteleri",
                "Sosyal sorumluluk projeleri"
            ],
            kitap: [
                "Felsefe",
                "Sanat",
                "Yaratıcılık"
            ],
            hobi: [
                "Mentorluk",
                "Workshop düzenleme",
                "Topluluk oluşturma"
            ],
            öneri: [
                "Başarı hikayenizi paylaşın",
                "Topluluk oluşturun",
                "İlham kaynağı olun"
            ]
        }
    }
];

class SurveyService {
    getQuestions() {
        return questions;
    }

    calculateMoodRange(totalScore) {
        return moodRanges.find(range => 
            totalScore >= range.min && totalScore <= range.max
        );
    }

    getRandomRecommendations(moodRange) {
        const recommendations = [];
        const types = ['müzik', 'aktivite', 'kitap', 'hobi', 'öneri'];

        types.forEach(type => {
            const typeRecommendations = moodRange.recommendations[type];
            const randomIndex = Math.floor(Math.random() * typeRecommendations.length);
            recommendations.push({
                type,
                content: typeRecommendations[randomIndex]
            });
        });

        return recommendations;
    }

    calculateTotalScore(answers) {
        return answers.reduce((total, answer) => total + answer.score, 0);
    }
}

module.exports = new SurveyService(); 