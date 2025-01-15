const recommendations = {
    pozitif: {
        music: [
            { title: "Happy", artist: "Pharrell Williams", mood: "Neşeli" },
            { title: "I Gotta Feeling", artist: "The Black Eyed Peas", mood: "Enerjik" }
        ],
        books: [
            { title: "Akış", author: "Mihaly Csikszentmihalyi", category: "Kişisel Gelişim" },
            { title: "İçimizdeki Mutluluk", author: "Ahmet Şerif İzgören", category: "Motivasyon" }
        ],
        movies: [
            { title: "Ölü Ozanlar Derneği", genre: "Drama", mood: "İlham Verici" },
            { title: "Forrest Gump", genre: "Drama/Komedi", mood: "Umut Dolu" }
        ],
        hobbies: [
            { name: "Dans", category: "Spor", benefit: "Enerji ve mutluluk" },
            { name: "Resim", category: "Sanat", benefit: "Yaratıcılık" }
        ]
    },
    nötr: {
        music: [
            { title: "Relaxing Piano", artist: "Various", mood: "Sakin" },
            { title: "Meditation Music", artist: "Various", mood: "Dinlendirici" }
        ],
        books: [
            { title: "Dijital Minimalizm", author: "Cal Newport", category: "Yaşam Tarzı" },
            { title: "Sakin Bir Hayat", author: "Susan Cain", category: "Kişisel Gelişim" }
        ],
        movies: [
            { title: "Chef", genre: "Komedi/Drama", mood: "Rahatlatıcı" },
            { title: "The Secret Life of Walter Mitty", genre: "Macera", mood: "İlham Verici" }
        ],
        hobbies: [
            { name: "Yoga", category: "Spor", benefit: "Denge ve huzur" },
            { name: "Bahçecilik", category: "Doğa", benefit: "Sakinlik" }
        ]
    },
    negatif: {
        music: [
            { title: "Fix You", artist: "Coldplay", mood: "Duygusal" },
            { title: "Breathe Me", artist: "Sia", mood: "Sakinleştirici" }
        ],
        books: [
            { title: "Kaygı Çağı", author: "Scott Stossel", category: "Psikoloji" },
            { title: "Mutluluk Hipotezi", author: "Jonathan Haidt", category: "Psikoloji" }
        ],
        movies: [
            { title: "Inside Out", genre: "Animasyon", mood: "Duygusal Farkındalık" },
            { title: "The Pursuit of Happyness", genre: "Drama", mood: "İlham Verici" }
        ],
        hobbies: [
            { name: "Meditasyon", category: "Zihinsel", benefit: "Sakinlik ve farkındalık" },
            { name: "Günlük Tutma", category: "Yazı", benefit: "Duygusal ifade" }
        ]
    }
};

module.exports = recommendations; 