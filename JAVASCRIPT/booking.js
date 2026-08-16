/* ============================================================
   ZANSTDO - booking.js
   Logika halaman booking, booking-success, dan custom-package
   ============================================================ */

// ----- Halaman booking (/booking/index.html) -----
function initBookingPage() {
  const select = document.getElementById("bookingPackage");
  if (!select) return;

  // Isi pilihan paket dari data
  SEED_PACKAGES.filter(function (pkg) {
    return pkg.id !== "custom";
  }).forEach(function (pkg) {
    const option = document.createElement("option");
    option.value = pkg.id;
    option.textContent =
      pkg.name + " — " + (pkg.price ? formatRupiah(pkg.price) : "Negosiasi") + " /sesi";
    select.appendChild(option);
  });

  // Paket yang dipilih di halaman Services otomatis terisi
  const saved = localStorage.getItem("zanstdo_selectedPackage");
  if (saved) {
    try {
      const pkg = JSON.parse(saved);
      select.value = pkg.id;

      const notice = document.getElementById("packageNotice");
      if (notice) {
        notice.textContent = "Paket terpilih dari halaman Services: " + pkg.name;
        notice.classList.add("show");
      }
    } catch (error) {
      console.warn("Gagal membaca paket terpilih:", error);
    }
  }
}

// Validasi satu field: tampilkan/sembunyikan pesan error
function setFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  const group = input ? input.closest(".form-group") : null;

  if (group) {
    group.classList.toggle("invalid", Boolean(message));
  }

  const errorEl = group ? group.querySelector(".field-error") : null;
  if (errorEl) {
    errorEl.textContent = message || "";
  }

  return !message;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Submit form booking
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("bookingName").value.trim();
    const email = document.getElementById("bookingEmail").value.trim();
    const phone = document.getElementById("bookingPhone").value.trim();
    const date = document.getElementById("bookingDate").value;
    const packageId = document.getElementById("bookingPackage").value;
    const notes = document.getElementById("bookingNotes").value.trim();

    // Validasi
    let valid = true;
    valid = setFieldError("bookingName", name ? "" : "Nama lengkap wajib diisi.") && valid;
    valid =
      setFieldError(
        "bookingEmail",
        email ? (emailPattern.test(email) ? "" : "Format email tidak valid.") : "Email wajib diisi."
      ) && valid;
    valid = setFieldError("bookingPhone", phone ? "" : "Nomor WhatsApp wajib diisi.") && valid;
    valid = setFieldError("bookingDate", date ? "" : "Tanggal acara wajib diisi.") && valid;
    valid = setFieldError("bookingPackage", packageId ? "" : "Pilih salah satu paket.") && valid;

    if (!valid) {
      showToast("Periksa kembali data yang diisi.", "error");
      return;
    }

    const pkg = SEED_PACKAGES.find(function (item) {
      return item.id === packageId;
    });

    // Simpan booking ke LocalStorage
    const booking = {
      id: "booking-" + Date.now(),
      name: name,
      email: email,
      phone: phone,
      date: date,
      package: pkg ? pkg.name : packageId,
      packagePrice: pkg ? pkg.price : 0,
      notes: notes,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);

    localStorage.removeItem("zanstdo_selectedPackage");
    showToast("Booking berhasil dikirim!", "success");

    setTimeout(function () {
      location.href = "booking-success/index.html?id=" + booking.id;
    }, 700);
  });
}

// ----- Halaman booking-success (/booking-success/index.html) -----
function initBookingSuccessPage() {
  const panel = document.getElementById("successPanel");
  if (!panel) return;

  const params = new URLSearchParams(location.search);
  const booking = getBookingById(params.get("id"));

  if (!booking) {
    panel.innerHTML =
      '<div class="empty"><div class="empty-icon">❌</div>Data booking tidak ditemukan.<br><br>' +
      '<a href="../booking/" class="btn btn-gold">Buat Booking Baru</a></div>';
    return;
  }

  panel.innerHTML =
    '<div class="icon">✓</div>' +
    '<h2>Booking Berhasil Dikirim!</h2>' +
    '<p>Terima kasih, ' + booking.name + '. Booking kamu sedang menunggu konfirmasi fotografer.</p>' +
    '<div class="detail-list">' +
    "<div class=\"detail-row\"><span class=\"detail-label\">Kode Booking</span><span class=\"detail-value\">" + booking.id + "</span></div>" +
    "<div class=\"detail-row\"><span class=\"detail-label\">Paket</span><span class=\"detail-value\">" + booking.package + "</span></div>" +
    "<div class=\"detail-row\"><span class=\"detail-label\">Tanggal Acara</span><span class=\"detail-value\">" + formatDate(booking.date) + "</span></div>" +
    "<div class=\"detail-row\"><span class=\"detail-label\">Nomor WhatsApp</span><span class=\"detail-value\">" + booking.phone + "</span></div>" +
    (booking.notes
      ? '<div class="detail-row"><span class="detail-label">Catatan</span><span class="detail-value">' + booking.notes + "</span></div>"
      : "") +
    '<div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">' + statusBadge(booking.status) + "</span></div>" +
    "</div>" +
    '<a href="../index.html" class="btn btn-gold">Kembali ke Home</a> ' +
    '<a href="../services/" class="btn btn-outline">Lihat Paket Lain</a>';
}

// ----- Halaman custom-package (/custom-package/index.html) -----
function initCustomPackagePage() {
  const form = document.getElementById("customForm");
  const successPanel = document.getElementById("customSuccess");
  const statusSection = document.getElementById("customStatus");

  // Tampilkan status request custom terakhir pengguna
  if (statusSection) {
    const lastId = localStorage.getItem("zanstdo_lastCustomRequest");
    const requests = getCustomRequests();
    const last = lastId ? requests.find(function (r) { return r.id === lastId; }) : null;

    if (last) {
      document.getElementById("customStatusBody").innerHTML =
        '<div class="detail-list">' +
        "<div class=\"detail-row\"><span class=\"detail-label\">Kode Request</span><span class=\"detail-value\">" + last.id + "</span></div>" +
        "<div class=\"detail-row\"><span class=\"detail-label\">Jenis Acara</span><span class=\"detail-value\">" + last.eventType + "</span></div>" +
        "<div class=\"detail-row\"><span class=\"detail-label\">Budget</span><span class=\"detail-value\">" + last.budget + "</span></div>" +
        '<div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">' + statusBadge(last.status) + "</span></div>" +
        "</div>";
      statusSection.style.display = "block";
    }
  }

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customName").value.trim();
    const eventType = document.getElementById("customEventType").value;
    const duration = document.getElementById("customDuration").value.trim();
    const budget = document.getElementById("customBudget").value.trim();
    const notes = document.getElementById("customNotes").value.trim();

    let valid = true;
    valid = setFieldError("customName", name ? "" : "Nama wajib diisi.") && valid;
    valid = setFieldError("customEventType", eventType ? "" : "Pilih jenis acara.") && valid;
    valid = setFieldError("customBudget", budget ? "" : "Budget wajib diisi.") && valid;

    if (!valid) {
      showToast("Periksa kembali data yang diisi.", "error");
      return;
    }

    const request = {
      id: "custom-" + Date.now(),
      name: name,
      eventType: eventType,
      duration: duration || "Belum ditentukan",
      budget: budget,
      notes: notes,
      status: "Menunggu Penawaran",
      createdAt: new Date().toISOString()
    };

    const requests = getCustomRequests();
    requests.push(request);
    saveCustomRequests(requests);

    localStorage.setItem("zanstdo_lastCustomRequest", request.id);

    form.reset();
    if (successPanel) successPanel.classList.add("show");
    showToast("Request custom terkirim. Admin akan menghubungi Anda.", "success");
  });
}

// Jalankan init sesuai halaman yang sedang dibuka
initBookingPage();
initBookingSuccessPage();
initCustomPackagePage();