# ROADMAP — ZANSTDO
## Tahapan Pengerjaan & Status Fitur

Dokumen ini berisi **tahapan pengerjaan bertahap** dan **pembagian MVP vs Pengayaan**. Tanpa estimasi waktu, tanpa kode — fokus pada urutan kerja dan target setiap tahap.

- Untuk spesifikasi produk: `PRD.md`
- Untuk alur pengguna: `WORKFLOW.md`

---

## PRINSIP

1. Kerjakan **satu tahap sampai selesai** sebelum lanjut ke tahap berikutnya.
2. Setiap tahap memakai data yang sama dari LocalStorage — data antar halaman terhubung.
3. Variabel/fungsi berbahasa Inggris, teks tampilan berbahasa Indonesia.
4. Styling memakai **CSS murni** (tanpa framework), desktop-first lalu disesuaikan ke HP.
5. Prioritaskan fitur MVP dulu; fitur Pengayaan dikerjakan setelah MVP tuntas.

---

## TAHAP 1: Landing Page & Portfolio (MVP)

**Tujuan:** Membuat halaman statis dan grid foto.

### Tugas Checklist
- [ ] Buat `index.html` dengan navbar, hero banner, highlight portfolio, service preview, CTA booking, footer.
- [ ] Buat `css/style.css` untuk styling dasar (warna, tipografi, spacing).
- [ ] Buat `portfolio.html` dengan grid foto (CSS flexbox/grid).
- [ ] Buat tombol filter kategori (Wedding, Portrait, Nature, Event, Prewedding).
- [ ] Filter bekerja: grid berubah sesuai kategori yang dipilih (JavaScript).
- [ ] Buat `js/data.js` berisi seed data foto (URL picsum.photos) dan `js/storage.js` sebagai helper LocalStorage.
- [ ] Halaman responsif di HP/tablet via `css/responsive.css`.

### Kriteria Selesai
- Semua halaman statis tampil rapi dan terhubung lewat navbar.
- Filter portfolio berfungsi mengubah tampilan grid.

---

## TAHAP 2: Client Gallery & Favorite (MVP)

**Tujuan:** Menampilkan galeri foto dengan penyimpanan favorit di LocalStorage.

### Tugas Checklist
- [ ] Buat `gallery.html` yang membaca id galeri dari URL (query `?id=...`).
- [ ] Buat data galeri (`zanstdo_galleries`) dan foto (`zanstdo_photos`) di seed data.
- [ ] Tampilkan cover gallery (foto besar, judul acara, nama klien).
- [ ] Tampilkan foto dalam masonry grid (CSS columns).
- [ ] Tambahkan watermark di atas foto (CSS overlay).
- [ ] Buat tombol favorit: klik → hati merah, tersimpan setelah refresh.
- [ ] Tampilkan badge jumlah favorit + tombol "Lihat Favorit".

### Kriteria Selesai
- Galeri terbuka sesuai id acara di URL.
- Favorit tersimpan di LocalStorage dan bertahan setelah refresh.
- Jumlah favorit otomatis diperbarui.

---

## TAHAP 3: Komentar & PIN Download (MVP)

**Tujuan:** Membuat modal, form sederhana, dan validasi PIN.

### Tugas Checklist
- [ ] Buat modal komentar pada foto (form nama + komentar).
- [ ] Komentar tersimpan di data foto (LocalStorage).
- [ ] Tampilkan daftar komentar di dalam modal.
- [ ] Buat modal PIN download.
- [ ] PIN benar → tombol download aktif; PIN salah → pesan error (`ANDI2026`).

### Kriteria Selesai
- Komentar bisa disimpan dan tetap ada setelah refresh.
- PIN benar menampilkan tombol download, PIN salah menampilkan error.

---

## TAHAP 4: Booking Form (MVP)

**Tujuan:** Membuat form booking dengan validasi dan halaman sukses.

### Tugas Checklist
- [ ] Buat `services.html` dengan card paket: Basic, Standard, Premium (+ Custom).
- [ ] Buat `booking.html` dengan form: nama, email, WhatsApp, tanggal, paket, catatan.
- [ ] Klik "Pilih Paket" → paket otomatis terisi di form booking.
- [ ] Validasi form: field wajib dan format email.
- [ ] Simpan booking ke `zanstdo_bookings` dengan status `Pending`.
- [ ] Redirect ke `booking-success.html` yang menampilkan ringkasan booking.
- [ ] (Pengayaan) `custom-package.html`: form request custom dengan status `Menunggu Penawaran`.

### Kriteria Selesai
- Booking valid tersimpan di LocalStorage.
- Form kosong/email salah menampilkan pesan error.
- Booking berhasil menampilkan halaman sukses.

---

## TAHAP 5: Admin Dashboard Sederhana (MVP)

**Tujuan:** Membaca data dan mengubah status dari sisi admin.

### Tugas Checklist
- [ ] Buat `admin.html` (tanpa login) dengan kartu statistik: booking, favorit, pesanan.
- [ ] Buat `admin-bookings.html`: status board Pending / Confirmed / Completed.
- [ ] Kartu booking bisa dipindah antar kolom (ubah status).
- [ ] Buat `admin-gallery.html`: lihat favorit dan komentar klien per foto.
- [ ] (Pengayaan) Kelola galeri: tambah foto lewat URL.
- [ ] (Pengayaan) Tambahkan kalender sederhana dengan badge booking per tanggal.

### Kriteria Selesai
- Booking tampil sesuai statusnya di board.
- Ubah status tersimpan di LocalStorage dan kartu berpindah kolom.
- Admin dapat melihat foto favorit dan komentar klien.

---

## TAHAP 6: Store, Cart & Checkout (MVP)

**Tujuan:** Membuat simulasi toko, keranjang, dan checkout.

### Tugas Checklist
- [ ] Buat `store.html` dengan daftar 12 produk (cetak, frame, digital, aksesoris) dan harganya.
- [ ] "Tambah ke Keranjang" → produk masuk `zanstdo_cart`, badge bertambah.
- [ ] Buat `cart.html`: list item, quantity, subtotal, total.
- [ ] Buat `checkout.html`: form nama, email, telepon + pilihan pembayaran dummy (Transfer, QRIS, COD).
- [ ] "Buat Pesanan" → simpan ke `zanstdo_orders` dengan status `Menunggu Pembayaran`.
- [ ] Tampilkan order summary.
- [ ] (Pengayaan) Order print per foto dari galeri: foto masuk cart sebagai produk cetak.
- [ ] (Pengayaan) Order history di halaman checkout/admin.

### Kriteria Selesai
- Produk bisa masuk cart dan total harga dihitung otomatis.
- Checkout menghasilkan order summary dan tersimpan di LocalStorage.

---

## TAHAP 7: Invoice & Contract Preview (Pengayaan)

**Tujuan:** Menampilkan data yang sudah disimpan dalam bentuk dokumen.

### Tugas Checklist
- [ ] Buat `invoice-preview.html`: invoice dari data booking (nama klien, paket, tanggal, harga).
- [ ] Tombol print memakai `window.print()`.
- [ ] Buat `contract-preview.html`: modal kontrak dengan input nama sebagai tanda tangan simulasi.
- [ ] Tampilan nama bergaya tanda tangan setelah diisi.

### Kriteria Selesai
- Invoice tampil dari data booking dan bisa dicetak.
- Kontrak menampilkan tanda tangan simulasi.

---

## RINGKASAN STATUS FITUR (MVP vs PENGAYAAN)

### MVP (Wajib — Tahap 1–6)
| Fitur | Tahap |
|---|---|
| Navbar, hero, footer, halaman statis | 1 |
| Portfolio grid + filter kategori | 1 |
| Galeri klien (cover, masonry, watermark) | 2 |
| Favorit foto (LocalStorage) + badge jumlah | 2 |
| Komentar foto (modal + simpan) | 3 |
| Download PIN logic | 3 |
| Halaman services + 3 paket | 4 |
| Booking form + validasi + halaman sukses | 4 |
| Admin dashboard tanpa login | 5 |
| Status board booking + ubah status | 5 |
| Viewer favorit & komentar (admin) | 5 |
| Store 12 produk + add to cart | 6 |
| Cart page (quantity, total) | 6 |
| Checkout simulasi (Transfer/QRIS/COD) + order summary | 6 |

### Pengayaan (Opsional — setelah MVP tuntas)
| Fitur | Tahap |
|---|---|
| Custom paket request (`custom-package.html`) | 4 |
| Kelola galeri via URL (admin) | 5 |
| Kalender jadwal sederhana (admin) | 5 |
| Order print per foto dari galeri | 6 |
| Order history | 6 |
| Invoice preview + print | 7 |
| Kontrak digital + tanda tangan simulasi | 7 |

---

## TIPS BELAJAR PER TAHAP

| Tahap | Skill Utama |
|---|---|
| 1 | HTML semantic, semantic layout, CSS layout (flexbox/grid), desain responsif |
| 2 | Query string URL, rendering list (loop), CSS columns, event click, LocalStorage |
| 3 | Modal, form, DOM manipulation, validasi sederhana |
| 4 | Form validation, penyimpanan terstruktur, redirect antar halaman |
| 5 | Membaca & memperbarui data, status logic, data table |
| 6 | State management keranjang, perhitungan harga, struktur order |
| 7 | Render data ke tampilan dokumen, window.print() |

---

## PENUTUP

Kerjakan secara berurutan, pastikan setiap tahap tuntas dan data antar halaman tetap konsisten (semua memakai LocalStorage). Jika suatu fitur terasa sulit, ingat prinsipnya: **baca data → ubah data → simpan data → tampilkan kembali**. Dokumentasi pendukung: `PRD.md` untuk spesifikasi, `WORKFLOW.md` untuk alur pengguna.