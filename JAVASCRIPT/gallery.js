/* ============================================================
   ZANSTDO - gallery.js
   Logika galeri klien (dipasang di tab "Galeri Klien" halaman
   portfolio): cover, masonry grid, watermark, favorit, komentar,
   PIN download, order print
   ============================================================ */

let currentGallery = null;
let showFavoritesOnly = false;
let commentPhotoId = null;

// Baca id galeri dari URL (?id=...)
function getGalleryFromUrl() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "wedding-andi-sari";

  const gallery = getGalleryById(id);
  if (!gallery) {
    const root = document.getElementById("galleryRoot");
    if (root) {
      root.innerHTML =
        '<div class="empty"><div class="empty-icon">🔍</div>Galeri tidak ditemukan.<br><br>' +
        '<a href="index.html" class="btn btn-gold">Kembali ke Home</a></div>';
    }
    return null;
  }
  return gallery;
}

// Foto milik galeri ini
function galleryPhotos(gallery) {
  return getPhotos().filter(function (photo) {
    return photo.galleryId === gallery.id;
  });
}

// Tampilkan cover galeri
function renderCover() {
  document.getElementById("coverTitle").textContent = currentGallery.title;
  document.getElementById("coverDate").textContent = formatDate(currentGallery.date);
  document.getElementById("coverCategory").textContent = currentGallery.category;
  document.getElementById("coverBg").style.background =
    "url(" + currentGallery.coverUrl + ") center/cover no-repeat";
}

// Satu kartu foto
function photoCard(photo) {
  const favClass = photo.isFavorite ? " active" : "";
  const favIcon = photo.isFavorite ? "❤️" : "🤍";
  const commentCount =
    photo.comments.length > 0 ? photo.comments.length + " komentar" : "";

  return (
    '<div class="photo-card" data-photo-id="' + photo.id + '">' +
    '<img src="' + photo.url + '" alt="' + photo.title + '" loading="lazy">' +
    '<div class="watermark"></div>' +
    '<div class="photo-actions">' +
    '<button class="icon-btn fav' + favClass + '" data-fav="' + photo.id + '" title="Favorit">' + favIcon + "</button>" +
    '<button class="icon-btn" data-comment="' + photo.id + '" title="Komentar">💬</button>' +
    '<button class="icon-btn" data-print="' + photo.id + '" title="Order Print">🖨️</button>' +
    "</div>" +
    '<div class="photo-info">' +
    '<span class="title">' + photo.title + "</span>" +
    '<span class="count">' + commentCount + "</span>" +
    "</div>" +
    "</div>"
  );
}

// Tampilkan grid foto (semua atau favorit saja)
function renderGalleryGrid() {
  const photos = galleryPhotos(currentGallery);
  const container = document.getElementById("galleryGrid");

  const visible = showFavoritesOnly
    ? photos.filter(function (photo) { return photo.isFavorite; })
    : photos;

  if (visible.length === 0) {
    container.innerHTML =
      '<div class="empty"><div class="empty-icon">' +
      (showFavoritesOnly ? "🤍" : "📷") +
      "</div>" +
      (showFavoritesOnly
        ? "Belum ada foto favorit. Klik ikon hati untuk memilih foto."
        : "Belum ada foto pada galeri ini.") +
      "</div>";
  } else {
    container.innerHTML = visible.map(photoCard).join("");
  }

  updateFavoriteSummary(photos);
}

// Badge jumlah favorit + tombol "Lihat Favorit"
function updateFavoriteSummary(photos) {
  const count = photos.filter(function (photo) {
    return photo.isFavorite;
  }).length;

  const badge = document.getElementById("favBadge");
  if (badge) {
    badge.textContent = count + " foto dipilih";
  }

  const toggleBtn = document.getElementById("favToggle");
  if (toggleBtn) {
    toggleBtn.classList.toggle("active", showFavoritesOnly);
  }
}

// Toggle favorit
function toggleFavorite(photoId) {
  const photos = getPhotos();
  const photo = photos.find(function (item) {
    return item.id === photoId;
  });

  if (!photo) return;

  photo.isFavorite = !photo.isFavorite;
  savePhotos(photos);

  renderGalleryGrid();
  showToast(
    photo.isFavorite ? "Foto ditandai sebagai favorit ❤️" : "Favorit dibatalkan",
    photo.isFavorite ? "success" : ""
  );
}

// ----- Komentar -----
function openCommentModal(photoId) {
  const photo = getPhotoById(photoId);
  if (!photo) return;

  commentPhotoId = photoId;

  document.getElementById("commentPhotoTitle").textContent = photo.title;

  const list = photo.comments.length
    ? photo.comments.map(function (comment) {
        return (
          '<div class="comment-item">' +
          "<strong>" + comment.name + "</strong>" +
          "<p>" + comment.text + "</p>" +
          "<span>" + comment.date + "</span>" +
          "</div>"
        );
      }).join("")
    : '<p class="comment-empty">Belum ada komentar. Jadilah yang pertama!</p>';

  document.getElementById("commentList").innerHTML = list;

  const form = document.getElementById("commentForm");
  if (form) form.reset();

  openModal("commentModal");
}

// ----- PIN download -----
function openPinModal() {
  const input = document.getElementById("pinInput");
  const message = document.getElementById("pinMessage");
  const downloadBtn = document.getElementById("downloadReady");

  if (input) input.value = "";
  if (message) message.textContent = "";
  if (downloadBtn) downloadBtn.style.display = "none";

  openModal("pinModal");
}

function checkPin() {
  const input = document.getElementById("pinInput");
  const message = document.getElementById("pinMessage");
  const downloadBtn = document.getElementById("downloadReady");

  const entered = (input.value || "").trim().toUpperCase();
  const correct = (currentGallery.downloadPin || "ANDI2026").toUpperCase();

  if (entered === correct) {
    message.textContent = "PIN benar. Silakan download foto.";
    message.style.color = "var(--success)";
    downloadBtn.style.display = "inline-flex";
  } else {
    message.textContent = "PIN salah. Silakan coba lagi.";
    message.style.color = "var(--danger)";
    downloadBtn.style.display = "none";
  }
}

// ----- Order print (masuk cart sebagai Cetak 4R) -----
function orderPrint(photoId) {
  const photo = getPhotoById(photoId);
  if (!photo) return;

  const added = addToCart("print-4r", 1, photoId);
  if (!added) {
    showToast("Produk tidak ditemukan.", "error");
    return;
  }

  updateCartBadge();
  showToast("Cetak 4R untuk \u201C" + photo.title + "\u201D masuk keranjang", "success");
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = getCartCount();
}

// ----- Event klik -----
document.addEventListener("click", function (event) {
  const favBtn = event.target.closest("[data-fav]");
  if (favBtn) {
    toggleFavorite(favBtn.getAttribute("data-fav"));
    return;
  }

  const commentBtn = event.target.closest("[data-comment]");
  if (commentBtn) {
    openCommentModal(commentBtn.getAttribute("data-comment"));
    return;
  }

  const printBtn = event.target.closest("[data-print]");
  if (printBtn) {
    orderPrint(printBtn.getAttribute("data-print"));
    return;
  }

  const favToggle = event.target.closest("#favToggle");
  if (favToggle) {
    showFavoritesOnly = !showFavoritesOnly;
    renderGalleryGrid();
    return;
  }

  const pinOpen = event.target.closest("[data-open-pin]");
  if (pinOpen) {
    openPinModal();
    return;
  }

  const pinCheck = event.target.closest("[data-check-pin]");
  if (pinCheck) {
    checkPin();
    return;
  }

  const download = event.target.closest("[data-download-sim]");
  if (download) {
    closeModal("pinModal");
    showToast("Download dimulai (simulasi untuk pembelajaran) 📥", "success");
  }
});

// ----- Form komentar -----
const commentForm = document.getElementById("commentForm");
if (commentForm) {
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();

    if (!name || !text) {
      showToast("Nama dan komentar wajib diisi.", "error");
      return;
    }

    const photos = getPhotos();
    const photo = photos.find(function (item) {
      return item.id === commentPhotoId;
    });

    if (!photo) return;

    photo.comments.push({
      id: "comment-" + Date.now(),
      name: name,
      text: text,
      date: new Date().toLocaleDateString("id-ID")
    });

    savePhotos(photos);
    openCommentModal(commentPhotoId);
    renderGalleryGrid();
    showToast("Komentar berhasil disimpan.", "success");
  });
}

// ----- Init -----
currentGallery = getGalleryFromUrl();
if (currentGallery) {
  renderCover();
  renderGalleryGrid();
}