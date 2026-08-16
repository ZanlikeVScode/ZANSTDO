# PRD — ZANSTDO
## "ZANSTDO - Studio Lensa Belajar"
### Web All-in-One Studio Fotografi untuk Pembelajaran Web Programming (HTML, CSS, JavaScript)

---

## 0. INFORMASI UMUM PROYEK

### Nama Produk
**ZANSTDO - Studio Lensa Belajar**

### Deskripsi Singkat
Sebuah website studio fotografi all-in-one yang menggabungkan empat fungsi utama ala Pixieset:

1. **Client Gallery & Proofing** — Galeri khusus klien untuk memilih, menyukai, dan mengomentari foto.
2. **Website & Portfolio Builder** — Landing page studio dengan portofolio, layanan, dan form booking.
3. **Studio Manager** — Panel admin untuk mengelola booking, galeri, dan pesanan toko.
4. **Store / E-Commerce Simulation** — Toko simulasi untuk cetak foto, aksesoris, dan file digital.

Website dibuat sebagai **proyek belajar mandiri** untuk memahami:

- Struktur halaman web (multi-page HTML)
- Styling dengan CSS murni (tanpa framework)
- Interaksi pengguna dan manipulasi DOM dengan JavaScript
- Penyimpanan data sederhana menggunakan **LocalStorage**
- Simulasi alur aplikasi nyata tanpa backend dan tanpa database

### Tujuan Pembelajaran

Setelah menyelesaikan proyek, siswa diharapkan mampu:

- Membuat halaman web multi-page yang terhubung melalui navigasi.
- Menyusun halaman dengan HTML yang semantik dan terstruktur.
- Mendesain tampilan responsif dengan **CSS murni** (desktop-first, lalu disesuaikan ke HP).
- Membuat komponen UI: navbar, gallery card, modal, form, cart, dan status board.
- Menggunakan JavaScript untuk interaksi tombol, filter, validasi, dan penyimpanan data.
- Membaca dan menulis data sederhana dari LocalStorage.
- Mensimulasikan proses bisnis studio fotografi secara sederhana.

### Target Pengguna

| Peran | Deskripsi |
|---|---|
| Pengunjung | Orang yang melihat portofolio dan ingin memesan jasa foto. |
| Klien | Orang yang menerima link galeri untuk memilih foto favorit dan memesan cetak. |
| Admin/Fotografer | Pemilik studio yang mengelola booking, galeri, dan pesanan. |

### Prinsip Pengembangan

1. **Tidak memakai database** — semua data disimpan di LocalStorage.
2. **Tidak memakai backend** — semua logika berjalan di browser.
3. **CSS murni** — tanpa Bootstrap/Tailwind, agar konsep dasar CSS benar-benar dikuasai.
4. **JavaScipt vanilla** — tanpa framework, fokus ke DOM dan LocalStorage.
5. **Pendekatan desktop-first** — desain dimulai untuk layar laptop, lalu disesuaikan ke HP/tablet.
6. **Fitur dibangun bertahap** — dari MVP (Minimum Viable Product) ke pengayaan.
7. **Semua aksi penting terlihat secara visual** — feedback selalu muncul setelah aksi pengguna.
8. **Pembayaran hanya simulasi** — bukan payment gateway asli.
9. **Admin tanpa login** — halaman admin terbuka langsung, hanya simulasi role.
10. **Konvensi penamaan** — variabel/fungsi/ID memakai bahasa Inggris; teks antarmuka memakai bahasa Indonesia dengan istilah teknis English (mis. *Cart*, *Checkout*, *Status*).

---

## 1. RINGKASAN MODUL & FITUR UTAMA

Proyek memiliki **4 pilar utama**.

---

## 1.1 Client Gallery & Proofing

### Tujuan
Memberikan galeri foto khusus kepada klien agar mereka bisa melihat, menyukai, mengomentari, dan memesan cetak foto.

### Fitur Utama

| Fitur | Deskripsi | Output Visual |
|---|---|---|
| Cover Gallery | Foto besar sebagai cover halaman galeri. | Hero gallery berisi judul acara dan nama klien. |
| Masonry Grid | Galeri foto dengan tinggi kolom tidak rata, seperti dinding foto. | Grid foto estetik dengan `CSS columns`. |
| Watermark Overlay | Setiap foto diberi watermark agar tidak mudah dicuri. | Tulisan "ZANSTDO" transparan di tengah foto. |
| Heart/Favorite Button | Klien menandai foto favorit. | Ikon hati berubah merah saat diklik; tersimpan setelah refresh. |
| Photo Comment Modal | Klien memberi komentar pada foto tertentu. | Modal berisi form komentar dan daftar komentar. |
| Download PIN Logic | Unduhan dibuka hanya jika PIN benar. | Input PIN; jika benar muncul tombol download. |
| Favorite Summary | Menampilkan jumlah foto favorit. | Badge: "8 foto dipilih" + tombol "Lihat Favorit". |
| Order Print (Pengayaan) | Klien memesan cetak untuk foto tertentu langsung dari galeri. | Tombol "Order Print" yang membawa foto ke halaman Store. |

### Komponen yang Dibuat
`GalleryCover`, `PhotoCard`, `FavoriteButton`, `CommentModal`, `DownloadPinModal`, `MasonryGrid`, `OrderPrintButton`

### Prioritas
**Prioritas 1 / MVP** (Order Print: pengayaan)

---

## 1.2 Website & Portfolio Builder

### Tujuan
Menjadi landing page utama studio untuk menampilkan portofolio, layanan, dan form booking.

### Fitur Utama

| Fitur | Deskripsi | Output Visual |
|---|---|---|
| Navigation Bar | Menu utama yang sama di semua halaman publik. | Home, Portfolio, Services, Booking, Store, Gallery. |
| Hero Banner | Banner utama studio. | Foto besar, judul, tombol "Lihat Portofolio" dan "Pesan Sekarang". |
| Portfolio Grid | Kumpulan karya foto. | Grid foto berdasarkan kategori. |
| Filter Category | Filter foto berdasarkan kategori acara. | Tombol filter aktif/nonaktif; grid berubah sesuai pilihan. |
| Service Package | Daftar paket foto dan harga. | Card paket: Basic, Standard, Premium, Custom. |
| Contact & Booking Form | Form pemesanan jasa foto. | Form nama, email, WhatsApp, tanggal, paket, catatan. |
| Success Page | Halaman terpisah setelah booking berhasil. | Halaman sukses berisi ringkasan booking. |

### Halaman Terkait
`index.html`, `portfolio.html`, `services.html`, `booking.html`, `booking-success.html`

### Prioritas
**Prioritas 1 / MVP**

---

## 1.3 Studio Manager

### Tujuan
Membantu fotografer mengelola booking, invoice, kontrak, dan jadwal.

### Fitur Utama

| Fitur | Deskripsi | Output Visual |
|---|---|---|
| Admin Dashboard | Ringkasan data studio. | Kartu statistik: jumlah booking, favorit, pesanan; daftar booking terbaru. |
| Booking Status Board | Papan status booking. | Kolom Pending, Confirmed, Completed berisi card booking. |
| Change Status Button | Tombol mengubah status booking. | Tombol panah/aksi per card booking. |
| Simple Calendar (Pengayaan) | Kalender jadwal sesi foto. | Kalender bulanan dengan badge jumlah booking per tanggal. |
| Client Selection Viewer | Melihat foto favorit pilihan klien. | Daftar foto yang diberi hati beserta jumlahnya. |
| Comment Viewer | Melihat komentar klien per foto. | List komentar di panel admin. |
| Digital Invoice Preview | Pratinjau invoice berdasarkan data booking. | Tampilan invoice rapi, dapat dicetak dengan `window.print()`. |
| Simple Contract Sign Mockup | Simulasi tanda tangan kontrak digital. | Modal kontrak dengan input nama sebagai tanda tangan. |
| Order Management | Melihat daftar pesanan toko. | Tabel pesanan: nama, produk, total, status. |

### Halaman Terkait
`admin.html`, `admin-bookings.html`, `admin-gallery.html`, `admin-orders.html`, `invoice-preview.html`, `contract-preview.html`

### Prioritas
**Prioritas 2 / Pengayaan MVP** (Invoice & Kontrak: tahap akhir)

---

## 1.4 Store / E-Commerce Simulation

### Tujuan
Mensimulasikan toko penjualan cetak foto, aksesoris, dan file digital.

### Fitur Utama

| Fitur | Deskripsi | Output Visual |
|---|---|---|
| Price List Produk | Daftar produk dan harga. | Card produk: cetak 4R/5R/8R, Frame, File Digital, Kanvas, Mug, Gantungan Kunci, Magnet, Kalender, Album, T-Shirt. |
| Add to Cart | Menambahkan produk ke keranjang. | Tombol "Tambah ke Keranjang"; badge cart bertambah. |
| Cart Page | Menampilkan isi keranjang. | List item, quantity, harga satuan, subtotal. |
| Checkout Simulation | Form data pembeli dan simulasi bayar. | Form nama, email, telepon, metode pembayaran dummy. |
| Payment Method Dummy | Pilihan metode pembayaran simulasi. | Transfer Bank, QRIS (dummy), COD. |
| Order Summary | Ringkasan pesanan. | Tabel pesanan dan total harga. |
| Order History (Pengayaan) | Daftar pesanan yang pernah dibuat. | List order dengan status. |
| Order Print dari Galeri (Pengayaan) | Cetak foto spesifik yang dipilih klien di galeri. | Foto terpilih otomatis masuk cart sebagai produk. |

### Komponen yang Dibuat
`ProductCard`, `CartItem`, `CartSummary`, `CheckoutForm`, `OrderSummary`

### Prioritas
**Prioritas 2 / Pengayaan MVP**

---

## 2. DAFTAR HALAMAN (SITEMAP)

### Halaman Publik (9)

| Halaman | Fungsi |
|---|---|
| `index.html` | Landing page utama studio. |
| `portfolio.html` | Portofolio foto dengan filter kategori. |
| `services.html` | Daftar paket dan harga. |
| `booking.html` | Form booking jasa foto. |
| `booking-success.html` | Halaman konfirmasi booking berhasil. |
| `gallery.html` | Galeri khusus klien (dibuka via `?id=acara`). |
| `store.html` | Toko cetak foto, aksesoris, dan file digital. |
| `cart.html` | Keranjang belanja. |
| `checkout.html` | Checkout simulasi. |
| `custom-package.html` (opsional terpisah) | Form request paket custom. |

### Halaman Admin (6)

| Halaman | Fungsi |
|---|---|
| `admin.html` | Dashboard ringkasan data studio. |
| `admin-bookings.html` | Kelola booking dan ubah status. |
| `admin-gallery.html` | Kelola galeri dan lihat favorit/komentar klien. |
| `admin-orders.html` | Kelola pesanan toko. |
| `invoice-preview.html` | Pratinjau dan cetak invoice. |
| `contract-preview.html` | Pratinjau kontrak digital. |

### Catatan Sitemap
```text
ZANSTDO
├── Home (index.html)
│   ├── Hero
│   ├── Highlight Portfolio
│   ├── Service Preview
│   └── CTA Booking
├── Portfolio (portfolio.html) — Filter Kategori + Photo Grid
├── Services (services.html) — Basic, Standard, Premium, Custom
├── Booking (booking.html) → booking-success.html
├── Client Gallery (gallery.html?id=...)
│   ├── Cover Gallery
│   ├── Masonry Grid + Watermark
│   ├── Favorite + Komentar
│   ├── Download PIN
│   └── Order Print (→ store)
├── Store (store.html) → cart.html → checkout.html
├── Admin (tanpa login)
│   ├── Dashboard (admin.html)
│   ├── Bookings (admin-bookings.html) → invoice-preview.html, contract-preview.html
│   ├── Gallery Viewer (admin-gallery.html)
│   └── Orders (admin-orders.html)
```

---

## 3. ARSITEKTUR DATA

### 3.1 Penyimpanan: LocalStorage Saja

Semua data disimpan di LocalStorage browser. **Tidak ada database**, tidak ada backend, tidak ada API eksternal.

#### Kelebihan
- Mudah dipahami dan langsung dicoba.
- Tidak perlu server, API key, atau instalasi.
- Data tetap ada setelah halaman di-refresh.

#### Kekurangan
- Data hanya ada di browser tempat data dibuat.
- Data hilang jika cache/riwayat browser dihapus atau browser lain dipakai.
- Tidak sinkron antar perangkat (jika dibutuhkan, topik pengayaan di masa depan).

### 3.2 Key LocalStorage yang Digunakan

```text
zanstdo_photos        → data foto (portfolio & galeri)
zanstdo_galleries     → daftar & info galeri klien
zanstdo_bookings      → data booking jasa foto
zanstdo_customRequests → request paket custom (pengayaan)
zanstdo_products      → price list produk toko
zanstdo_cart          → isi keranjang
zanstdo_orders        → data pesanan toko
zanstdo_favorites     → foto favorit klien (bisa di dalam data foto)
zanstdo_settings      → penyimpanan terpusat (mis. daftar komentar, PIN galeri)
```

### 3.3 Struktur Data Foto (Schema JSON)

```json
[
  {
    "id": "photo-001",
    "url": "https://picsum.photos/id/1011/600/400",
    "title": "Akad Nikah Andi & Sari",
    "category": "Wedding",
    "galleryId": "wedding-andi-sari",
    "isFavorite": false,
    "hasWatermark": true,
    "comments": [
      {
        "id": "comment-001",
        "name": "Sari",
        "text": "Foto ini bagus, tolong dicetak.",
        "date": "2026-08-01"
      }
    ]
  }
]
```

### 3.4 Struktur Data Galeri Klien (Schema JSON)

```json
[
  {
    "id": "wedding-andi-sari",
    "title": "Wedding Andi & Sari",
    "coverUrl": "https://picsum.photos/id/1011/1200/600",
    "date": "2026-08-17",
    "downloadPin": "ANDI2026",
    "photoIds": ["photo-001", "photo-002"]
  }
]
```

### 3.5 Struktur Data Booking (Schema JSON)

```json
[
  {
    "id": "booking-001",
    "name": "Andi Pratama",
    "email": "andi@email.com",
    "phone": "081234567890",
    "date": "2026-08-17",
    "package": "Standard",
    "category": "Wedding",
    "notes": "Acara dimulai jam 08.00.",
    "status": "Pending",
    "createdAt": "2026-08-01T09:00:00"
  }
]
```

Status yang valid: `Pending` → `Confirmed` → `Completed`, plus `Cancelled`.

### 3.6 Struktur Data Custom Request (Schema JSON)

```json
[
  {
    "id": "custom-001",
    "name": "Raka",
    "eventType": "Prewedding",
    "duration": "4 jam",
    "budget": "1.500.000",
    "notes": "Lokasi di Lembang.",
    "status": "Menunggu Penawaran",
    "createdAt": "2026-08-03T14:30:00"
  }
]
```

### 3.7 Struktur Data Produk (Schema JSON)

```json
[
  {
    "id": "print-4r",
    "name": "Cetak Foto 4R",
    "type": "print",
    "price": 5000,
    "unit": "pcs"
  }
]
```

### 3.8 Struktur Data Cart (Schema JSON)

```json
[
  {
    "productId": "print-4r",
    "productName": "Cetak Foto 4R",
    "photoId": "photo-001",
    "quantity": 3,
    "price": 5000
  }
]
```

### 3.9 Struktur Data Order (Schema JSON)

```json
[
  {
    "id": "order-001",
    "customerName": "Sari",
    "email": "sari@email.com",
    "phone": "081298765432",
    "items": [
      {
        "productId": "print-4r",
        "productName": "Cetak Foto 4R",
        "photoId": "photo-001",
        "quantity": 3,
        "price": 5000
      }
    ],
    "subtotal": 15000,
    "paymentMethod": "Transfer",
    "total": 15000,
    "status": "Menunggu Pembayaran",
    "createdAt": "2026-08-01T10:30:00"
  }
]
```

### 3.10 Penempatan Data per Jenis

| Jenis Data | Penyimpanan |
|---|---|
| Foto awal (portfolio & galeri) | `zanstdo_photos` (seed data di dalam kode) |
| Favorit foto | `isFavorite` di `zanstdo_photos` atau `zanstdo_favorites` |
| Komentar foto | `comments` di dalam data foto |
| Booking | `zanstdo_bookings` |
| Custom request | `zanstdo_customRequests` |
| Cart | `zanstdo_cart` |
| Order | `zanstdo_orders` |
| Status booking | `status` di dalam data booking |
| Invoice | Dibuat dinamis dari data booking saat halaman dibuka |
| Kontrak digital | Simulasi visual, tidak perlu disimpan rumit |

### 3.11 Data Seed (Data Contoh Awal)

- **5 galeri klien** dengan nama acara fiktif, masing-masing **12 foto**:

| Galeri | Kategori Acara |
|---|---|
| Wedding Andi & Sari | Wedding |
| Prewedding Raka & Nia | Prewedding |
| Graduation SMAN 1 Bandung | Event |
| Family Portrait Keluarga Wijaya | Portrait |
| Nature Adventure Papandayan | Nature |

- **12 produk toko**:

| ID | Produk | Harga | Jenis |
|---|---|---|---|
| print-4r | Cetak Foto 4R | Rp5.000 | Print |
| print-5r | Cetak Foto 5R | Rp8.000 | Print |
| print-8r | Cetak Foto 8R | Rp15.000 | Print |
| frame-simple | Frame Simple | Rp35.000 | Frame |
| digital-file | File Digital HD | Rp25.000 | Digital |
| canvas-photo | Kanvas Foto | Rp150.000 | Aksesoris |
| mug-photo | Mug Foto | Rp75.000 | Aksesoris |
| keychain | Gantungan Kunci Foto | Rp20.000 | Aksesoris |
| magnet-photo | Magnet Foto | Rp15.000 | Aksesoris |
| wall-calendar | Kalender Dinding | Rp60.000 | Aksesoris |
| photo-album | Album Foto | Rp120.000 | Aksesoris |
| tshirt-photo | T-Shirt Foto | Rp90.000 | Aksesoris |

- **PIN galeri contoh**: `ANDI2026` (satu PIN contoh untuk galeri pertama; PIN per galeri ditentukan saat data galeri diisi).
- **Paket layanan**, lengkap dengan harga, durasi sesi, jumlah foto hasil edit, dan benefit:

| Paket | Harga | Durasi | Jumlah Foto Editan | Benefit |
|---|---|---|---|---|
| Basic | Rp500.000 | 2 jam | 20 foto | Klien gallery, cetak 5 foto 4R |
| Standard | Rp1.000.000 | 4 jam | 50 foto | Semua di atas + file digital HD |
| Premium | Rp2.000.000 | 8 jam | 100 foto | Semua di atas + album + kanvas |
| Custom | Negosiasi | Fleksibel | Fleksibel | Request kebutuhan khusus, ditanggapi admin |

### 3.12 Contoh Alur Data Favorit Foto

```text
Klien klik tombol hati
        ↓
JavaScript mengambil data foto dari LocalStorage
        ↓
Foto dengan id yang sama dicari
        ↓
isFavorite diubah false → true
        ↓
Data disimpan kembali ke LocalStorage
        ↓
Tampilan ikon hati diperbarui (merah)
        ↓
Jumlah favorit diperbarui (badge)
```

---

## 4. REKOMENDASI TEKNIS

### 4.1 Tools

| Tools | Fungsi |
|---|---|
| Google Fonts | Font untuk tampilan website. |
| Emoji / teks ikon | Ikon hati ❤️, keranjang 🛒, kalender 📅 (tanpa library ikon). |
| CSS Columns / Flexbox / Grid | Untuk masonry grid dan layout (tanpa library). |
| CSS Media Queries | Responsiveness (desktop-first → HP). |
| URL Placeholder | Foto contoh memakai `https://picsum.photos` agar tidak perlu file gambar. |
| LocalStorage API | Menyimpan semua data di browser. |

### 4.2 Aturan UI/UX

1. **Tombol dengan label jelas**: "Pilih Paket", "Tambah ke Keranjang", "Kirim Booking", "Simpan Komentar".
2. **Feedback setelah aksi**: klik favorit → hati merah; booking sukses → halaman sukses; PIN salah → pesan error; add to cart → badge bertambah.
3. **Empty state**: jika data kosong tampilkan pesan ramah, misal "Belum ada booking masuk." atau "Belum ada foto favorit. Klik ikon hati untuk memilih foto."
4. **Warna status konsisten**:

| Status | Warna |
|---|---|
| Pending | Kuning |
| Confirmed | Biru |
| Completed | Hijau |
| Cancelled | Merah |
| Menunggu Pembayaran | Oranye |
| Menunggu Penawaran | Abu-abu |

5. **Responsive**: desain desktop dulu, lalu gunakan media query untuk HP/tablet (mis. grid 1 kolom di layar kecil).
6. **Konvensi kode**: variabel/fungsi/ID bahasa Inggris (`getPhotos`, `saveBooking`, `photoId`); teks yang tampil di layar bahasa Indonesia.
7. **Komentar kode**: diperbolehkan dan disarankan, terutama untuk konsep yang sulit seperti LocalStorage dan `JSON.parse`.

### 4.3 Struktur Folder Proyek

```text
zanstdo/
│
├── index.html
├── portfolio.html
├── services.html
├── booking.html
├── booking-success.html
├── gallery.html
├── store.html
├── cart.html
├── checkout.html
├── custom-package.html
├── admin.html
├── admin-bookings.html
├── admin-gallery.html
├── admin-orders.html
├── invoice-preview.html
├── contract-preview.html
│
├── css/
│   ├── style.css          ← styling utama (CSS murni)
│   └── responsive.css      ← media query untuk HP/tablet (opsional dipisah)
│
└── js/
    ├── data.js             ← seed data (foto, galeri, produk, paket)
    ├── storage.js          ← helper LocalStorage (baca/tulis)
    ├── app.js              ← navbar, footer, komponen bersama
    ├── gallery.js          ← logika galeri klien
    ├── booking.js          ← logika booking & custom request
    ├── store.js            ← logika toko, cart, checkout
    └── admin.js            ← logika panel admin
```

---

## 5. BATASAN PROYEK (PENTING UNTUK DIPAHAMI)

### Bukan Aplikasi Produksi Nyata
Proyek ini adalah simulasi belajar. **Tidak perlu dibuat:**
- Payment gateway asli.
- Login keamanan tinggi (halaman admin terbuka tanpa login).
- Database SQL / server backend.
- Upload file ke server (foto admin cukup via URL atau preview lokal untuk simulasi).
- Enkripsi data.

### Data Hilang Jika Cache Dihapus
Karena memakai LocalStorage, data hilang jika:
- Cache/riwayat browser dihapus.
- Mode incognito/private dipakai.
- Browser atau perangkat lain dipakai.

### PIN Bukan Keamanan Asli
PIN galeri hanya simulasi UX. PIN (mis. `ANDI2026`) ada di dalam kode sehingga bisa dilihat lewat DevTools. Ini wajar untuk pembelajaran, tetapi tidak cocok untuk keamanan nyata.

### Pembayaran Hanya Simulasi
Metode pembayaran (Transfer, QRIS, COD) hanya pilihan di form. Tidak ada pembayaran sungguhan.

---

## 6. USER STORIES (Arah Pengembangan)

### Sebagai Pengunjung
> Saya ingin melihat portofolio berdasarkan kategori agar bisa menilai kualitas studio sebelum memesan.

> Saya ingin melihat paket dan harga agar bisa memilih sesuai budget.

> Saya ingin mengisi form booking agar bisa memesan sesi foto, termasuk request paket custom.

### Sebagai Klien
> Saya ingin membuka galeri khusus agar bisa melihat foto acara saya.

> Saya ingin menandai foto favorit agar fotografer tahu foto yang saya suka.

> Saya ingin memberi komentar agar bisa memberi catatan pada foto tertentu.

> Saya ingin memesan cetak foto tertentu langsung dari galeri.

### Sebagai Admin/Fotografer
> Saya ingin melihat foto favorit klien agar tahu foto mana yang diprioritaskan.

> Saya ingin mengubah status booking agar bisa menandai booking yang sudah dikonfirmasi.

> Saya ingin melihat pesanan cetak agar bisa memproses pesanan klien.

> Saya ingin membuat invoice dan kontrak dari data booking.

---

## 7. RINGKASAN FINAL

**ZANSTDO - Studio Lensa Belajar** adalah website studio fotografi all-in-one untuk pembelajaran web programming dasar (HTML, CSS, JavaScript) tanpa database dan tanpa backend. Empat pilar utamanya:

1. **Client Gallery & Proofing** — galeri masonry, watermark, favorit, komentar, PIN download, order print.
2. **Website & Portfolio Builder** — landing page, portfolio filter, paket layanan, form booking + custom request.
3. **Studio Manager** — dashboard, status board booking, kalender, invoice, kontrak, viewer favorit & komentar.
4. **Store / E-Commerce Simulation** — price list 12 produk, cart, checkout dummy, order summary.

Pendekatan data: **LocalStorage saja**, tanpa SQL, tanpa API eksternal. Foto memakai URL placeholder. Seluruh dokumen teknis pendukung (workflow, roadmap) ada di folder `docs/`.

Fokus pembelajaran pada: HTML semantik, CSS murni deskripsi responsif, JavaScript DOM manipulation, LocalStorage, dan alur pengguna yang logis — sehingga siswa bukan hanya membuat tampilan, tetapi memahami cara kerja produk digital dari sisi pengguna dan pengelola.