/* ============================================================
   ZANSTDO - app.js
   Fungsi bersama untuk semua halaman:
   navbar, toast, modal, format rupiah, badge cart
   ============================================================ */

// Format angka menjadi Rupiah, contoh: 5000 -> "Rp5.000"
function formatRupiah(number) {
  return "Rp" + number.toLocaleString("id-ID");
}

// Format tanggal menjadi "17 Agustus 2026"
function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Toast / notifikasi kecil di pojok kanan bawah
let toastTimer = null;

function showToast(message, type) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = "toast show " + (type || "");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2600);
}

// Buka / tutup modal
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("open");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("open");
}

// Tutup modal: klik backdrop atau tombol close
document.addEventListener("click", function (event) {
  const backdrop = event.target.closest(".modal");
  if (backdrop && !event.target.closest(".modal-card")) {
    closeModal(backdrop.id);
  }

  const closeBtn = event.target.closest("[data-close-modal]");
  if (closeBtn) {
    closeModal(closeBtn.getAttribute("data-close-modal"));
  }
});

// Kartu paket layanan (dipakai di Home & Services)
function renderPackageCard(pkg) {
  const tag = pkg.tag ? '<span class="badge status-offer tag">' + pkg.tag + "</span>" : "";
  const priceText = pkg.price ? formatRupiah(pkg.price) + '<small> /sesi</small>' : '<small>Negosiasi</small>';
  const button =
    pkg.id === "custom"
      ? '<a href="booking.html?package=custom" class="btn btn-outline">Request Custom</a>'
      : '<button class="btn btn-gold" data-pick-package="' + pkg.id + '">Pilih Paket</button>';

  const popularClass = pkg.id === "standard" ? " popular" : "";

  return (
    '<div class="card package-card' + popularClass + '">' +
    tag +
    '<div class="package-name">' + pkg.name + "</div>" +
    '<div class="package-price">' + priceText + "</div>" +
    '<div class="package-sub">' + pkg.duration + " · " + pkg.edited + "</div>" +
    "<ul class=\"package-list\">" +
    pkg.benefits.map(function (benefit) {
      return "<li>" + benefit + "</li>";
    }).join("") +
    "</ul>" +
    button +
    "</div>"
  );
}

// Badge status dengan warna (booking / order / custom)
function statusBadge(status) {
  const map = {
    "Pending": "status-pending",
    "Confirmed": "status-confirmed",
    "Completed": "status-completed",
    "Cancelled": "status-cancelled",
    "Menunggu Pembayaran": "status-waiting",
    "Diproses": "status-info",
    "Selesai": "status-completed",
    "Dibatalkan": "status-cancelled",
    "Menunggu Penawaran": "status-offer",
    "Ditawarkan": "status-confirmed",
    "Ditolak": "status-cancelled"
  };

  const cssClass = map[status] || "status-offer";
  return '<span class="status ' + cssClass + '">' + status + "</span>";
}

// Inisialisasi UI bersama: badge cart, menu mobile, menu aktif
function initSharedUI() {
  // Badge jumlah item di cart
  const badge = document.getElementById("cartBadge");
  if (badge) {
    badge.textContent = getCartCount();
  }

  // Menu hamburger di HP
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("open");
    });
  }

  // Menandai menu yang sedang aktif berdasarkan nama file halaman
  const path = location.pathname;
  let matched = null;

  const pageKeys = [
    ["portfolio.html", "portfolio"],
    ["services.html", "services"],
    ["booking.html", "booking"],
    ["booking-success.html", "booking"],
    ["shop.html", "shop"],
    ["cart.html", "shop"],
    ["checkout.html", "shop"]
  ];

  pageKeys.forEach(function (pair) {
    if (path.includes(pair[0])) matched = pair[1];
  });

  document.querySelectorAll("[data-nav]").forEach(function (link) {
    const key = link.getAttribute("data-nav");
    if (key === matched || (matched === null && key === "home")) {
      link.classList.add("active");
    }
  });
}

// Jalankan saat halaman selesai dimuat
initSharedUI();