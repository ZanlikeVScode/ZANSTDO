/* ============================================================
   ZANSTDO - portfolio.js
   Logika halaman portfolio: tab (Karya Studio / Galeri Klien),
   grid foto + filter kategori
   ============================================================ */

let currentCategory = "all";
let activeTab = "studio";

/* ---------- Karya Studio ---------- */

function renderPortfolio() {
  const photos = getPhotos();
  const grid = document.getElementById("portfolioGrid");

  const filtered =
    currentCategory === "all"
      ? photos
      : photos.filter(function (photo) {
          return photo.category === currentCategory;
        });

  if (filtered.length === 0) {
    grid.innerHTML =
      '<div class="empty"><div class="empty-icon">📷</div>Belum ada foto untuk kategori ini.</div>';
    return;
  }

  grid.innerHTML = filtered.map(function (photo) {
    return (
      '<div class="card" data-category="' + photo.category + '">' +
      '<div class="card-img"><img src="' + photo.url + '" alt="' + photo.title + '" loading="lazy"></div>' +
      '<div class="card-body">' +
      '<div class="card-title">' + photo.title + "</div>" +
      '<div class="card-meta">' + photo.category + "</div>" +
      "</div>" +
      "</div>"
    );
  }).join("");
}

function renderFilters() {
  const photos = getPhotos();
  const categories = ["all"].concat(
    photos
      .map(function (photo) {
        return photo.category;
      })
      .filter(function (cat, index, self) {
        return self.indexOf(cat) === index;
      })
  );

  const bar = document.getElementById("filterBar");
  bar.innerHTML = categories
    .map(function (cat) {
      const label = cat === "all" ? "Semua" : cat;
      const activeClass = cat === currentCategory ? " active" : "";
      return (
        '<button class="filter-btn' + activeClass + '" data-category="' + cat + '">' +
        label +
        "</button>"
      );
    })
    .join("");
}

/* ---------- Tab ---------- */

function getTabFromUrl() {
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");
  return tab === "klien" ? "klien" : "studio";
}

function setActiveTab(tab) {
  activeTab = tab;

  document.querySelectorAll(".tab-btn").forEach(function (btn) {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tab);
  });

  document.querySelectorAll(".tab-panel").forEach(function (panel) {
    panel.classList.toggle("active", panel.id === "panel-" + tab);
  });

  // Buka ke Galeri Klien: pindah ke konten tab
  if (tab === "klien") {
    document.getElementById("panel-klien").scrollIntoView({ block: "start" });
  }
}

/* ---------- Inisialisasi ---------- */

function applyCategoryFromUrl() {
  const params = new URLSearchParams(location.search);
  const cat = params.get("cat");
  if (cat) {
    currentCategory = cat;
  }
}

document.addEventListener("click", function (event) {
  const tabBtn = event.target.closest(".tab-btn");
  if (tabBtn) {
    setActiveTab(tabBtn.getAttribute("data-tab"));
    return;
  }

  const btn = event.target.closest(".filter-btn");
  if (!btn) return;

  currentCategory = btn.getAttribute("data-category");
  renderFilters();
  renderPortfolio();
});

applyCategoryFromUrl();
setActiveTab(getTabFromUrl());
renderFilters();
renderPortfolio();
