/* ============================================================
   ZANSTDO - admin.js
   Logika panel admin (tanpa login):
   dashboard, status board booking, kelola galeri,
   pesanan toko, invoice, kontrak
   ============================================================ */

/* =================== DASHBOARD (admin.html) =================== */
function initDashboard() {
  const bookings = getBookings();
  const photos = getPhotos();
  const orders = getOrders();
  const requests = getCustomRequests();

  const favCount = photos.filter(function (p) { return p.isFavorite; }).length;

  setText("statBookings", bookings.length);
  setText("statFavorites", favCount);
  setText("statOrders", orders.length);
  setText("statCustom", requests.length);

  // Booking terbaru (5 terakhir)
  const latestEl = document.getElementById("latestBookings");
  if (latestEl) {
    const latest = bookings.slice(-5).reverse();
    latestEl.innerHTML = latest.length
      ? latest.map(function (b) {
          return (
            '<div class="board-card">' +
            '<div class="who">' + b.name + " · " + b.package + "</div>" +
            '<div class="meta">' + formatDate(b.date) + " · " + formatRupiah(b.packagePrice || 0) + "</div>" +
            '<div class="board-actions">' + statusBadge(b.status) +
            '<a class="btn-mini" href="admin-bookings.html">Kelola</a>' +
            "</div></div>"
          );
        }).join("")
      : '<div class="empty small">Belum ada booking masuk.</div>';
  }

  // Request custom terbaru
  const customEl = document.getElementById("recentCustomRequests");
  if (customEl) {
    const latest = requests.slice(-4).reverse();
    customEl.innerHTML = latest.length
      ? latest.map(function (r) {
          return (
            '<div class="board-card">' +
            "<div class=\"who\">" + r.name + " · " + r.eventType + "</div>" +
            '<div class="meta">Budget: ' + r.budget + " · " + r.duration + "</div>" +
            '<div class="board-actions">' + statusBadge(r.status) + "</div>" +
            "</div>"
          );
        }).join("")
      : '<div class="empty small">Belum ada request custom.</div>';
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* =================== BOOKINGS BOARD (admin-bookings.html) =================== */
function renderBookingsBoard() {
  const bookings = getBookings();
  const columns = ["Pending", "Confirmed", "Completed"];

  columns.forEach(function (status) {
    const col = document.getElementById("col-" + status.toLowerCase());
    if (!col) return;

    const items = bookings.filter(function (b) { return b.status === status; });
    const body = col.querySelector(".board-body");

    if (body) {
      body.innerHTML = items.length
        ? items.map(function (b) {
          const nextBtn =
            status === "Pending"
              ? '<button class="btn-mini" data-status-next="' + b.id + '" data-next="Confirmed">→ Confirmed</button>'
              : status === "Confirmed"
                ? '<button class="btn-mini" data-status-next="' + b.id + '" data-next="Completed">→ Completed</button>'
                : "";

          return (
            '<div class="board-card">' +
            '<div class="who">' + b.name + "</div>" +
            '<div class="meta">' + formatDate(b.date) + " · " + b.package +
            (b.notes ? " · " + b.notes : "") + "</div>" +
            '<div class="board-actions">' +
            nextBtn +
            '<a class="btn-mini" href="invoice-preview.html?bookingId=' + b.id + '">Invoice</a>' +
            '<a class="btn-mini" href="contract-preview.html?bookingId=' + b.id + '">Kontrak</a>' +
            '<button class="btn-mini danger" data-status-cancel="' + b.id + '">Batal</button>' +
            "</div>" +
            "</div>"
          );
        }).join("")
      : '<div class="empty small">Belum ada booking ' + status + ".</div>";

    // Jumlah di header kolom
    const countEl = col.querySelector(".col-count");
    if (countEl) countEl.textContent = items.length;
    }
  });
}

function changeStatus(bookingId, nextStatus) {
  const bookings = getBookings();
  const booking = bookings.find(function (b) { return b.id === bookingId; });
  if (!booking) return;

  booking.status = nextStatus;
  saveBookings(bookings);
  renderBookingsBoard();
  showToast("Status booking diubah menjadi " + nextStatus, "success");
}

document.addEventListener("click", function (event) {
  const nextBtn = event.target.closest("[data-status-next]");
  if (nextBtn) {
    changeStatus(nextBtn.getAttribute("data-status-next"), nextBtn.getAttribute("data-next"));
    return;
  }

  const cancelBtn = event.target.closest("[data-status-cancel]");
  if (cancelBtn) {
    changeStatus(cancelBtn.getAttribute("data-status-cancel"), "Cancelled");
    return;
  }
});

/* =================== KELOLA GALERI (admin-gallery.html) =================== */
function renderAdminGallery() {
  const photos = getPhotos();
  const tbody = document.getElementById("photoTableBody");
  if (!tbody) return;

  tbody.innerHTML = photos
    .map(function (photo) {
      const favIcon = photo.isFavorite ? "❤️" : "🤍";
      return (
        "<tr>" +
        '<td><img class="thumb" src="' + photo.url + '" alt=""></td>' +
        "<td><strong>" + photo.title + "</strong></td>" +
        "<td>" + (getGalleryById(photo.galleryId) ? getGalleryById(photo.galleryId).title : "-") + "</td>" +
        "<td>" + photo.category + "</td>" +
        "<td style=\"text-align:center\">" + favIcon + "</td>" +
        '<td style="text-align:center">' + photo.comments.length + "</td>" +
        '<td><button class="btn-mini danger" data-delete-photo="' + photo.id + '">Hapus</button></td>' +
        "</tr>"
      );
    })
    .join("");

  // Foto favorit klien
  const favEl = document.getElementById("favoritesView");
  if (favEl) {
    const favorites = photos.filter(function (p) { return p.isFavorite; });
    favEl.innerHTML = favorites.length
      ? '<div class="fav-list">' +
        favorites.map(function (photo) {
          return (
            '<div class="fav-item">' +
            '<img src="' + photo.url + '" alt="">' +
            '<div class="fav-cap">' + photo.title + " · " + photo.comments.length + " komentar</div>" +
            "</div>"
          );
        }).join("") +
        "</div>"
      : '<div class="empty small">Belum ada foto favorit dari klien.</div>';
  }

  // Komentar klien per foto
  const commentEl = document.getElementById("commentsView");
  if (commentEl) {
    const withComments = photos.filter(function (p) { return p.comments.length > 0; });
    commentEl.innerHTML = withComments.length
      ? withComments.map(function (photo) {
          return (
            '<div class="board-card">' +
            '<div class="who">' + photo.title + "</div>" +
            photo.comments.map(function (c) {
              return '<div class="comment-item"><strong>' + c.name + "</strong><p>" + c.text + "</p><span>" + c.date + "</span></div>";
            }).join("") +
            "</div>"
          );
        }).join("")
      : '<div class="empty small">Belum ada komentar dari klien.</div>';
  }
}

// Form tambah foto
const addPhotoForm = document.getElementById("addPhotoForm");
if (addPhotoForm) {
  addPhotoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const url = document.getElementById("newPhotoUrl").value.trim();
    const title = document.getElementById("newPhotoTitle").value.trim();
    const category = document.getElementById("newPhotoCategory").value;
    const galleryId = document.getElementById("newPhotoGallery").value;

    let valid = true;
    valid = setFieldError("newPhotoUrl", url ? "" : "URL foto wajib diisi.") && valid;
    valid = setFieldError("newPhotoTitle", title ? "" : "Judul foto wajib diisi.") && valid;
    valid = setFieldError("newPhotoCategory", category ? "" : "Pilih kategori.") && valid;

    if (!valid) {
      showToast("Periksa kembali data foto.", "error");
      return;
    }

    const photos = getPhotos();
    photos.push({
      id: "photo-" + Date.now(),
      url: url,
      title: title,
      category: category,
      galleryId: galleryId || "wedding-andi-sari",
      isFavorite: false,
      hasWatermark: true,
      comments: []
    });
    savePhotos(photos);

    addPhotoForm.reset();
    renderAdminGallery();
    showToast("Foto berhasil ditambahkan.", "success");
  });
}

document.addEventListener("click", function (event) {
  const deleteBtn = event.target.closest("[data-delete-photo]");
  if (!deleteBtn) return;

  const photoId = deleteBtn.getAttribute("data-delete-photo");
  const photos = getPhotos().filter(function (p) { return p.id !== photoId; });
  savePhotos(photos);
  renderAdminGallery();
  showToast("Foto dihapus.");
});

/* =================== PESANAN TOKO (admin-orders.html) =================== */
function renderAdminOrders() {
  const tbody = document.getElementById("ordersBody");
  if (!tbody) return;

  const orders = getOrders();

  tbody.innerHTML = orders.length
    ? orders.slice().reverse().map(function (order) {
        const statuses = ["Menunggu Pembayaran", "Diproses", "Selesai", "Dibatalkan"];
        const options = statuses
          .map(function (s) {
            return '<option value="' + s + '"' + (s === order.status ? " selected" : "") + ">" + s + "</option>";
          })
          .join("");

        return (
          "<tr>" +
          "<td><strong>" + order.id + "</strong></td>" +
          "<td><strong>" + order.customerName + "</strong><div class=\"muted-text small\">" + order.phone + "</div></td>" +
          '<td class="small">' + order.items.length + " item</td>" +
          "<td><strong>" + formatRupiah(order.total) + "</strong></td>" +
          "<td class=\"small\">" + order.paymentMethod + "</td>" +
          '<td><select class="select-mini" data-order-status="' + order.id + '">' + options + "</select></td>" +
          "</tr>"
        );
      }).join("")
    : '<tr><td colspan="6"><div class="empty small">Belum ada pesanan masuk.</div></td></tr>';
}

document.addEventListener("change", function (event) {
  const select = event.target.closest("[data-order-status]");
  if (!select) return;

  const orderId = select.getAttribute("data-order-status");
  const orders = getOrders();
  const order = orders.find(function (o) { return o.id === orderId; });

  if (order) {
    order.status = select.value;
    saveOrders(orders);
    showToast("Status pesanan diubah menjadi " + select.value, "success");
  }
});

/* =================== INVOICE (invoice-preview.html) =================== */
function renderInvoice() {
  const panel = document.getElementById("invoicePanel");
  if (!panel) return;

  const params = new URLSearchParams(location.search);
  const booking = getBookingById(params.get("bookingId"));

  if (!booking) {
    panel.innerHTML =
      '<div class="empty"><div class="empty-icon">❌</div>Invoice tidak ditemukan.<br><br>' +
      '<a href="admin-bookings.html" class="btn btn-gold">Kembali ke Booking</a></div>';
    return;
  }

  const invoiceDate = formatDate(booking.createdAt.split("T")[0]);

  panel.innerHTML =
    '<div class="invoice-head">' +
    '<div class="brand-print">ZANSTDO<small>Studio Lensa Belajar</small></div>' +
    '<div class="invoice-meta"><strong>Invoice</strong><br>' +
    'No: <span id="invoiceNo">' + booking.id + "</span><br>" +
    'Tanggal: <span id="invoiceDate">' + formatDate(booking.createdAt.split("T")[0]) + "</span></div>" +
    "</div>" +
    "<h2>Bill To</h2>" +
    "<p>" + booking.name + "<br>" + booking.email + "<br>" + booking.phone + "</p>" +
    "<table>" +
    "<thead><tr><th>Deskripsi</th><th>Tanggal Acara</th><th>Qty</th><th>Harga</th><th>Subtotal</th></tr></thead>" +
    "<tbody>" +
    "<tr><td>Paket " + booking.package + "</td><td>" + formatDate(booking.date) + "</td><td>1</td><td>" + formatRupiah(booking.packagePrice || 0) + "</td><td>" + formatRupiah(booking.packagePrice || 0) + "</td></tr>" +
    '<tr class="total-row"><td colspan="4" style="text-align:right">Total</td><td>' + formatRupiah(booking.packagePrice || 0) + "</td></tr>" +
    "</tbody>" +
    "</table>" +
    '<div class="board-actions">' + statusBadge(booking.status) + "</div>" +
    '<div class="invoice-foot">Terima kasih telah memesan jasa fotografi ZANSTDO.<br>' +
    "Pembayaran: Transfer ke rekening ZANSTDO (simulasi).</div>";
}

/* =================== KONTAK (contract-preview.html) =================== */
function renderContract() {
  const panel = document.getElementById("contractPanel");
  if (!panel) return;

  const params = new URLSearchParams(location.search);
  const booking = getBookingById(params.get("bookingId"));

  if (!booking) {
    panel.innerHTML =
      '<div class="empty"><div class="empty-icon">❌</div>Kontrak tidak ditemukan.<br><br>' +
      '<a href="admin-bookings.html" class="btn btn-gold">Kembali ke Booking</a></div>';
    return;
  }

  document.getElementById("contractClient").textContent = booking.name;
  document.getElementById("contractDate").textContent = formatDate(booking.date);
  document.getElementById("contractPackage").textContent = booking.package;
  document.getElementById("signatureName").value = booking.name;
  document.getElementById("signaturePreview").textContent = booking.name;
}

// Tampilkan tanda tangan saat nama diisi
const signatureInput = document.getElementById("signatureName");
if (signatureInput) {
  signatureInput.addEventListener("input", function () {
    const preview = document.getElementById("signaturePreview");
    preview.textContent = signatureInput.value.trim() || "—";
  });
}

// Tombol print (invoice & kontrak)
document.addEventListener("click", function (event) {
  const printBtn = event.target.closest("[data-window-print]");
  if (printBtn) {
    window.print();
  }
});

/* =================== INIT =================== */
initDashboard();
renderBookingsBoard();
renderAdminGallery();
renderAdminOrders();
renderInvoice();
renderContract();