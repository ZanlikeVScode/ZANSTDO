/* ============================================================
   ZANSTDO - booking.js
   Logika halaman booking dan booking-success.
   Paket custom kini inline di form booking (bukan halaman terpisah).
   ============================================================ */

// ----- Halaman booking (booking.html) -----
function initBookingPage() {
  const select = document.getElementById("bookingPackage");
  if (!select) return;

  // Isi pilihan paket dari data (tanpa paket custom)
  SEED_PACKAGES.filter(function (pkg) {
    return pkg.id !== "custom";
  }).forEach(function (pkg) {
    const option = document.createElement("option");
    option.value = pkg.id;
    option.textContent =
      pkg.name + " — " + (pkg.price ? formatRupiah(pkg.price) : "Negosiasi") + " /sesi";
    select.appendChild(option);
  });

  // Opsi custom langsung di dropdown
  const customOption = document.createElement("option");
  customOption.value = "custom";
  customOption.textContent = "Custom — request harga";
  select.appendChild(customOption);

  select.addEventListener("change", function () {
    toggleCustomFields(select.value === "custom");
  });

  // Kasus 1: datang dengan ?package=custom (link "Request Custom")
  const params = new URLSearchParams(location.search);
  if (params.get("package") === "custom") {
    select.value = "custom";
    toggleCustomFields(true);
    showNotice("Mode paket custom aktif. Isi detail kebutuhan di bawah.");
    return;
  }

  // Kasus 2: paket yang dipilih di halaman Services otomatis terisi
  const saved = localStorage.getItem("zanstdo_selectedPackage");
  if (saved) {
    try {
      const pkg = JSON.parse(saved);
      select.value = pkg.id;
      if (pkg.id === "custom") {
        toggleCustomFields(true);
        showNotice("Paket terpilih dari halaman Services: " + pkg.name);
      } else {
        showNotice("Paket terpilih dari halaman Services: " + pkg.name);
      }
    } catch (error) {
      console.warn("Gagal membaca paket terpilih:", error);
    }
  }
}

function showNotice(message) {
  const notice = document.getElementById("packageNotice");
  if (notice) {
    notice.textContent = message;
    notice.classList.add("show");
  }
}

function toggleCustomFields(show) {
  const panel = document.getElementById("customFields");
  if (panel) {
    panel.style.display = show ? "block" : "none";
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

    const isCustom = packageId === "custom";
    const customEventType = isCustom
      ? document.getElementById("customEventType").value
      : "";
    const customDuration = isCustom
      ? document.getElementById("customDuration").value.trim()
      : "";
    const customBudget = isCustom
      ? document.getElementById("customBudget").value.trim()
      : "";
    const customNotes = isCustom
      ? document.getElementById("customNotes").value.trim()
      : "";

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

    if (isCustom) {
      valid = setFieldError("customEventType", customEventType ? "" : "Pilih jenis acara.") && valid;
      valid = setFieldError("customBudget", customBudget ? "" : "Estimasi budget wajib diisi.") && valid;
    }

    if (!valid) {
      showToast("Periksa kembali data yang diisi.", "error");
      return;
    }

    const pkg = SEED_PACKAGES.find(function (item) {
      return item.id === packageId;
    });

    const booking = {
      id: "booking-" + Date.now(),
      name: name,
      email: email,
      phone: phone,
      date: date,
      package: isCustom ? "Custom — request harga" : (pkg ? pkg.name : packageId),
      packagePrice: isCustom ? 0 : (pkg ? pkg.price : 0),
      notes: notes,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    if (isCustom) {
      booking.custom = {
        eventType: customEventType,
        duration: customDuration || "Belum ditentukan",
        budget: customBudget,
        notes: customNotes
      };

      // Catat juga sebagai request custom agar tetap muncul di board admin
      // (satu pengiriman = satu id yang sama).
      const requests = getCustomRequests();
      requests.push({
        id: booking.id,
        name: name,
        eventType: customEventType,
        duration: booking.custom.duration,
        budget: customBudget,
        notes: customNotes,
        status: "Menunggu Penawaran",
        createdAt: booking.createdAt
      });
      saveCustomRequests(requests);
    }

    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);

    localStorage.removeItem("zanstdo_selectedPackage");
    showToast("Booking berhasil dikirim!", "success");

    setTimeout(function () {
      location.href = "booking-success.html?id=" + booking.id;
    }, 700);
  });
}

// ----- Halaman booking-success (booking-success.html) -----
function initBookingSuccessPage() {
  const panel = document.getElementById("successPanel");
  if (!panel) return;

  const params = new URLSearchParams(location.search);
  const booking = getBookingById(params.get("id"));

  if (!booking) {
    panel.innerHTML =
      '<div class="empty"><div class="empty-icon">❌</div>Data booking tidak ditemukan.<br><br>' +
      '<a href="booking.html" class="btn btn-gold">Buat Booking Baru</a></div>';
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
    (booking.custom
      ? '<div class="detail-row"><span class="detail-label">Jenis Acara</span><span class="detail-value">' + booking.custom.eventType + "</span></div>" +
        '<div class="detail-row"><span class="detail-label">Durasi Sesi</span><span class="detail-value">' + booking.custom.duration + "</span></div>" +
        '<div class="detail-row"><span class="detail-label">Estimasi Budget</span><span class="detail-value">' + booking.custom.budget + "</span></div>"
      : "") +
    (booking.notes
      ? '<div class="detail-row"><span class="detail-label">Catatan</span><span class="detail-value">' + booking.notes + "</span></div>"
      : "") +
    '<div class="detail-row"><span class="detail-label">Status</span><span class="detail-value">' + statusBadge(booking.status) + "</span></div>" +
    "</div>" +
    '<a href="index.html" class="btn btn-gold">Kembali ke Home</a> ' +
    '<a href="services.html" class="btn btn-outline">Lihat Paket Lain</a>';
}

// Jalankan init sesuai halaman yang sedang dibuka
initBookingPage();
initBookingSuccessPage();
