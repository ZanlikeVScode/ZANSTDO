# WORKFLOW — ZANSTDO
## Alur Kerja Pengguna (User Flow)

Dokumen ini berisi **alur kerja pengguna saja** — langkah demi langkah dari tiga peran (Pengunjung, Klien, Admin) ditambah alur paket custom. Untuk spesifikasi produk, lihat `PRD.md`; untuk tahapan pengerjaan, lihat `ROADMAP.md`.

---

## 1. ALUR PENGUNJUNG / CALON KLIEN

**Tujuan:** Melihat portofolio, memilih paket, lalu mengisi form booking.

### Langkah-Langkah

1. **Membuka halaman utama** (`index.html`).
   - Melihat hero banner.
   - Ada tombol ajakan: "Lihat Portofolio" dan "Pesan Sekarang".

2. **Membuka halaman Portfolio** (`portfolio.html`).
   - Melihat grid foto.
   - Memfilter berdasarkan kategori: Wedding, Portrait, Nature, Event, Prewedding.

3. **Membuka halaman Services** (`services.html`).
   - Melihat daftar paket: Basic, Standard, Premium, Custom.
   - Setiap paket menampilkan harga, durasi, jumlah foto editan, dan benefit.

4. **Memilih paket**.
   - Klik "Pilih Paket" pada paket Basic/Standard/Premium.
   - Paket terpilih terisi otomatis di form booking.

5. **Mengisi Booking Form** (`booking.html`).
   - Data yang diisi: nama lengkap, email, nomor WhatsApp, tanggal acara, paket, catatan.

6. **Sistem melakukan validasi form**.
   - Nama tidak boleh kosong.
   - Email harus valid.
   - Tanggal tidak boleh kosong.
   - Paket harus terpilih.
   - Jika gagal validasi dan ada field kosong → pesan error muncul di samping field.

7. **Booking disimpan.**
   - Data masuk ke LocalStorage (`zanstdo_bookings`) dengan status awal `Pending`.
   - Redirect ke halaman sukses.

8. **Halaman sukses muncul** (`booking-success.html`).
   - Menampilkan ringkasan booking (nama, tanggal, paket).
   - Menampilkan status: "Menunggu konfirmasi fotografer."
   - Ada tombol kembali ke Home.

### Visual Flow

```text
Home
 → Portfolio (filter kategori)
 → Services (pilih paket)
 → Booking Form
 → Validasi
 → Simpan Booking (LocalStorage)
 → Halaman Sukses
```

---

## 2. ALUR KLIEN PENERIMA LINK GALERI

**Tujuan:** Klien membuka galeri khusus, memilih foto favorit, memberi komentar, lalu mensimulasikan pemesanan cetak foto.

### Langkah-Langkah

1. **Klien menerima link galeri.**
   - Contoh URL: `gallery.html?id=wedding-andi-sari`
   - JavaScript membaca id dari URL dan mencari galeri yang sesuai di `zanstdo_galleries`.

2. **Klien membuka halaman galeri.**
   - Melihat cover gallery (foto besar + judul acara + nama klien).
   - Melihat watermark pada setiap foto.

3. **Klien melihat daftar foto.**
   - Foto ditampilkan dalam masonry grid (CSS columns).
   - Setiap foto memiliki tombol favorit.

4. **Klien menekan tombol favorit.**
   - Ikon hati berubah merah.
   - `isFavorite` pada foto berubah `true` dan disimpan.
   - Jumlah foto favorit bertambah.

5. **Klien memberi komentar pada foto.**
   - Klik tombol komentar.
   - Modal komentar terbuka.
   - Klien mengisi nama dan komentar.
   - Komentar tersimpan ke data foto.

6. **Klien melihat ringkasan foto favorit.**
   - Badge muncul: "8 foto dipilih".
   - Tombol "Lihat Favorit" menampilkan foto favorit saja.

7. **Klien mengunduh atau mencetak foto.**
   - Klik tombol "Download" pada galeri.
   - Modal PIN terbuka.

8. **Klien memasukkan PIN.**
   - Contoh: `ANDI2026`

9. **Jika PIN benar:**
   - Tombol download aktif.
   - Muncul pilihan: Download Preview atau Order Print.

10. **Jika PIN salah:**
    - Muncul pesan error: "PIN salah. Silakan coba lagi."
    - Tombol download tetap tersembunyi.

11. **Klien memesan cetak foto tertentu (Order Print).**
    - Klik "Order Print" pada foto.
    - Foto terpilih dibawa ke halaman Store dan masuk cart sebagai produk cetak.

12. **Klien masuk ke Store** (`store.html`).
    - Melihat 12 produk: cetak 4R/5R/8R, Frame, File Digital, Kanvas, Mug, Gantungan Kunci, Magnet, Kalender Dinding, Album, T-Shirt.

13. **Klien menambahkan produk ke keranjang.**
    - Produk masuk ke `zanstdo_cart`.
    - Badge cart bertambah dan total harga diperbarui.

14. **Klien melakukan checkout simulasi** (`checkout.html`).
    - Mengisi nama, email, telepon.
    - Memilih metode pembayaran dummy: Transfer, QRIS, atau COD.
    - Klik "Buat Pesanan".

15. **Pesanan disimpan.**
    - Muncul order summary (ringkasan pesanan + total).
    - Status pesanan awal: "Menunggu Pembayaran".
    - Pesanan tersimpan di `zanstdo_orders`.

### Visual Flow

```text
Link Galeri (gallery.html?id=...)
 → Cover Gallery
 → Lihat Foto (masonry + watermark)
 → Favorit Foto
 → Komentar Foto
 → Lihat Favorit (badge)
 → Input PIN
   ├─ PIN benar → Download / Order Print
   └─ PIN salah → Pesan error
 → Order Print → Store (masuk cart)
 → Tambah Produk ke Cart
 → Checkout (Transfer/QRIS/COD)
 → Order Summary
```

---

## 3. ALUR ADMIN / FOTOGRAFER

**Tujuan:** Admin mengelola galeri, melihat pilihan klien, mengelola booking, dan melihat pesanan toko.

**Catatan:** Halaman admin **tanpa login**. Cukup buka `admin.html` langsung.

### Langkah-Langkah

1. **Admin membuka halaman admin** (`admin.html`).
   - Tanpa login, langsung masuk dashboard.

2. **Admin melihat dashboard.**
   - Statistik: jumlah booking masuk, jumlah foto favorit klien, jumlah pesanan toko.
   - Daftar booking terbaru.

3. **Admin mengelola galeri** (`admin-gallery.html`).
   - Menambah foto preview menggunakan URL.
   - Memberi judul foto dan memilih kategori/galeri.
   - Menyimpan ke LocalStorage.

4. **Admin melihat pilihan klien.**
   - Foto mana yang difavoritkan klien (ikon hati merah + jumlah).
   - Komentar klien per foto.

5. **Admin melihat booking masuk** (`admin-bookings.html`).
   - Booking tampil dalam status board: Pending, Confirmed, Completed.

6. **Admin mengubah status booking.**
   - Pending → Confirmed → Completed.
   - Update tersimpan dan kartu berpindah kolom.

7. **Admin membuka invoice preview** (`invoice-preview.html`).
   - Invoice dibuat dari data booking: nama klien, paket, tanggal, harga.
   - Bisa dicetak dengan `window.print()`.

8. **Admin membuka kontrak digital sederhana** (`contract-preview.html`).
   - Menampilkan isi kontrak.
   - Klien/admin mengisi nama sebagai tanda tangan simulasi.
   - Muncul tampilan nama bergaya tanda tangan.

9. **Admin melihat pesanan toko** (`admin-orders.html`).
   - Daftar pesanan cetak foto: nama pemesan, produk, total harga, status.

10. **(Pengayaan) Admin melihat kalender.**
    - Kalender bulanan sederhana menampilkan badge booking per tanggal.

### Visual Flow

```text
Buka admin.html (tanpa login)
 → Dashboard (statistik)
 → Kelola Galeri (tambah foto, lihat favorit & komentar)
 → Kelola Booking (status board: Pending/Confirmed/Completed)
 → Ubah Status Booking
 → Preview Invoice (print)
 → Preview Kontrak (tanda tangan simulasi)
 → Lihat Order Store
 → (Pengayaan) Kalender jadwal
```

---

## 4. ALUR PAKET CUSTOM

**Tujuan:** Klien yang tidak cocok dengan paket tetap dapat memesan layanan khusus, dan admin menerima notifikasi request.

### Langkah-Langkah

1. **Klien melihat paket Custom di halaman Services.**
   - Card Custom menampilkan "Negosiasi" sebagai harga.
   - Tombol: "Request Custom".

2. **Klien membuka form custom request** (`custom-package.html` atau modal).
   - Data diisi: nama, jenis acara (Wedding, Prewedding, dll), durasi, budget, catatan.

3. **Sistem memvalidasi form.**
   - Nama, jenis acara, dan budget tidak boleh kosong.

4. **Request disimpan.**
   - Data masuk ke `zanstdo_customRequests` dengan status `Menunggu Penawaran`.
   - Tampil pesan sukses: "Permintaan custom terkirim. Admin akan menghubungi Anda."

5. **Admin melihat request custom di dashboard.**
   - Dashboard menampilkan daftar request custom terbaru dengan status `Menunggu Penawaran`.

6. **Admin menanggapi.**
   - (Simulasi) Admin mengubah status menjadi `Ditawarkan` atau `Ditolak`.
   - Klien melihat statusnya saat membuka kembali halaman custom request.

### Visual Flow

```text
Services → Paket Custom → Form Request Custom
 → Validasi → Simpan (zanstdo_customRequests)
 → Pesan Sukses
 → Admin melihat request di Dashboard
 → Admin ubah status (Menunggu Penawaran → Ditawarkan / Ditolak)
```

---

## 5. RINGKASAN ALUR ANTAR HALAMAN

```text
index.html ──→ portfolio.html ──→ services.html ──→ booking.html ──→ booking-success.html
                                                       └─→ custom-package.html
gallery.html (id acara) ──→ store.html ──→ cart.html ──→ checkout.html ──→ order summary
admin.html ──→ admin-bookings.html ──→ invoice-preview.html
            ──→ admin-gallery.html
            ──→ admin-orders.html
            ──→ contract-preview.html
```