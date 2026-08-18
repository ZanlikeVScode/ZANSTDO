/* ============================================================
   ZANSTDO - data.js
   Seed data (data contoh awal): galeri, foto, produk, paket
   ============================================================ */

// Paket layanan (statis, tidak disimpan ke LocalStorage)
const SEED_PACKAGES = [
  {
    id: "basic",
    name: "Basic",
    price: 500000,
    duration: "2 jam",
    edited: "20 foto",
    benefits: ["Sesi pemotretan 2 jam", "20 foto hasil edit", "Galeri klien digital", "Cetak 5 foto 4R"],
    tag: "Ekonomis"
  },
  {
    id: "standard",
    name: "Standard",
    price: 1000000,
    duration: "4 jam",
    edited: "50 foto",
    benefits: ["Sesi pemotretan 4 jam", "50 foto hasil edit", "Galeri klien digital", "File digital HD", "Cetak 10 foto 4R"],
    tag: "Best Seller"
  },
  {
    id: "premium",
    name: "Premium",
    price: 2000000,
    duration: "8 jam",
    edited: "100 foto",
    benefits: ["Sesi pemotretan 8 jam", "100 foto hasil edit", "Galeri klien digital", "File digital HD", "Album foto", "Kanvas 30x40"],
    tag: "Lengkap"
  },
  {
    id: "custom",
    name: "Custom",
    price: null,
    duration: "Fleksibel",
    edited: "Fleksibel",
    benefits: ["Kebutuhan khusus", "Budget menyesuaikan", "Ditanggapi langsung oleh admin"],
    tag: "Request"
  }
];

// 5 galeri klien (nama acara fiktif)
const SEED_GALLERIES = [
  {
    id: "wedding-andi-sari",
    title: "Wedding Andi & Sari",
    category: "Wedding",
    date: "2026-08-17",
    coverUrl: ph("Wedding Andi & Sari", 1400, 600, true),
    downloadPin: "ANDI2026"
  },
  {
    id: "prewedding-raka-nia",
    title: "Prewedding Raka & Nia",
    category: "Prewedding",
    date: "2026-09-05",
    coverUrl: ph("Prewedding Raka & Nia", 1400, 600, true),
    downloadPin: "RAKA2026"
  },
  {
    id: "graduation-sman1",
    title: "Graduation SMAN 1 Bandung",
    category: "Event",
    date: "2026-06-20",
    coverUrl: ph("Graduation SMAN 1 Bandung", 1400, 600, true),
    downloadPin: "GRAD2026"
  },
  {
    id: "family-wijaya",
    title: "Family Portrait Keluarga Wijaya",
    category: "Portrait",
    date: "2026-07-12",
    coverUrl: ph("Family Portrait Keluarga Wijaya", 1400, 600, true),
    downloadPin: "WIJA2026"
  },
  {
    id: "nature-papandayan",
    title: "Nature Adventure Papandayan",
    category: "Nature",
    date: "2026-05-30",
    coverUrl: ph("Nature Adventure Papandayan", 1400, 600, true),
    downloadPin: "PAPA2026"
  }
];

// 12 produk toko
const SEED_PRODUCTS = [
  { id: "print-4r", name: "Cetak Foto 4R", type: "Cetak", price: 5000, unit: "pcs", emoji: "🖨️" },
  { id: "print-5r", name: "Cetak Foto 5R", type: "Cetak", price: 8000, unit: "pcs", emoji: "🖨️" },
  { id: "print-8r", name: "Cetak Foto 8R", type: "Cetak", price: 15000, unit: "pcs", emoji: "🖨️" },
  { id: "frame-simple", name: "Frame Simple", type: "Cetak & Frame", price: 35000, unit: "pcs", emoji: "🖼️" },
  { id: "digital-file", name: "File Digital HD", type: "Digital", price: 25000, unit: "file", emoji: "💾" },
  { id: "canvas-photo", name: "Kanvas Foto", type: "Aksesoris", price: 150000, unit: "pcs", emoji: "🎨" },
  { id: "mug-photo", name: "Mug Foto", type: "Aksesoris", price: 75000, unit: "pcs", emoji: "☕" },
  { id: "keychain", name: "Gantungan Kunci Foto", type: "Aksesoris", price: 20000, unit: "pcs", emoji: "🔑" },
  { id: "magnet-photo", name: "Magnet Foto", type: "Aksesoris", price: 15000, unit: "pcs", emoji: "🧲" },
  { id: "wall-calendar", name: "Kalender Dinding", type: "Aksesoris", price: 60000, unit: "pcs", emoji: "📅" },
  { id: "photo-album", name: "Album Foto", type: "Aksesoris", price: 120000, unit: "pcs", emoji: "📔" },
  { id: "tshirt-photo", name: "T-Shirt Foto", type: "Aksesoris", price: 90000, unit: "pcs", emoji: "👕" }
];

// Ukuran foto bergantian supaya grid masonry terlihat bervariasi
// (lebar 600, tinggi bervariasi)
const PHOTO_SIZES = [
  [600, 400], [600, 800], [600, 500], [600, 900], [600, 700], [600, 600]
];

// Judul foto per galeri (12 judul per galeri)
const GALLERY_TITLES = {
  "wedding-andi-sari": [
    "Akad Nikah di Pelaminan", "Pertukaran Cincin", "Sesi Taman Kota",
    "Detail Buket Bunga", "Foto Bersama Keluarga", "Sanding",
    "Entrance Mobil Hias", "Tari Adat", "Potret Pengantin",
    "Momen Haru Orang Tua", "Suguhan Hidangan", "Foto Penutup Senja"
  ],
  "prewedding-raka-nia": [
    "Jalanan Kota Tua", "Siluet Senja", "Bermain Hujan",
    "Di Taman Bunga", "Gerbang Kereta", "Piknik Rumput Hijau",
    "Nostalgia Sekolah", "Malam Cahaya Lampu", "Tebing Pantai",
    "Sawah & Gunung", "Bulan Purnama", "Cium Kening"
  ],
  "graduation-sman1": [
    "Toga Terlempar", "Wisuda Bersama Teman", "Bersama Keluarga",
    "Momen Kelulusan", "Foto Kelas 12 IPS", "Geng Persahabatan",
    "Jalan Sehat Kelulusan", "Ceria di Lapangan", "Potret Guru Favorit",
    "Kenangan Koridor", "Pamit di Gerbang", "Syukuran Rumah"
  ],
  "family-wijaya": [
    "Bingkai Keluarga", "Senyum Hangat", "Potret Ayah & Ibu",
    "Tawa Anak-anak", "Baju Senada Putih", "Kebun Belakang",
    "Keluarga Besar", "Momen Santai", "Kumpul di Teras",
    "Nenek Tersenyum", "Permainan Anak", "Hari Minggu Ceria"
  ],
  "nature-papandayan": [
    "Sunrise Puncak", "Kawah Panas", "Padang Edelweis",
    "Hutan Kabut", "Trekking Pagi", "Berkemah Malam",
    "Air Terjun Tersembunyi", "Bunga Langka", "Sawah Lereng",
    "Gunung dari Kejauhan", "Mata Air Sejuk", "Tim Sunset"
  ]
};

// Bangun 60 foto dari data galeri (placeholder siluet, bukan foto asli)
function buildSeedPhotos() {
  const photos = [];
  let index = 0;

  SEED_GALLERIES.forEach(gallery => {
    const titles = GALLERY_TITLES[gallery.id];
    for (let i = 0; i < 12; i++) {
      const size = PHOTO_SIZES[index % PHOTO_SIZES.length];
      photos.push({
        id: gallery.id + "-" + (i + 1),
        url: ph(titles[i], size[0], size[1]),
        title: titles[i],
        category: gallery.category,
        galleryId: gallery.id,
        isFavorite: false,
        hasWatermark: true,
        comments: []
      });
      index++;
    }
  });

  return photos;
}

// Isi LocalStorage jika masih kosong
// Bump versi ini saat data seed berubah (mis. ganti gambar placeholder),
// supaya data lama di LocalStorage ikut di-reset
const SEED_VERSION = "chihiros-v1";

function seedData() {
  // Data lama (versi sebelumnya) di-replace sekali dengan seed terbaru
  if (localStorage.getItem("zanstdo_seedVersion") !== SEED_VERSION) {
    savePhotos(buildSeedPhotos());
    saveGalleries(SEED_GALLERIES);
    saveProducts(SEED_PRODUCTS);
    localStorage.setItem("zanstdo_seedVersion", SEED_VERSION);
    return;
  }

  if (!getPhotos().length) {
    savePhotos(buildSeedPhotos());
  }
  if (!getGalleries().length) {
    saveGalleries(SEED_GALLERIES);
  }
  if (!getProducts().length) {
    saveProducts(SEED_PRODUCTS);
  }
}

// Jalankan otomatis setiap kali halaman dimuat
seedData();