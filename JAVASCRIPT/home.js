/* ============================================================
   ZANSTDO - home.js
   Logika halaman utama (index.html):
   kategori unggulan, highlight portfolio, paket populer
   ============================================================ */

function renderHome() {
  const photos = getPhotos();

  // Highlight portfolio (6 foto pertama)
  const highlightEl = document.getElementById("homeHighlights");
  if (highlightEl) {
    highlightEl.innerHTML = photos.slice(0, 6).map(function (photo) {
      return (
        '<a href="portfolio.html" class="card">' +
        '<div class="card-img"><img src="' + photo.url + '" alt="' + photo.title + '"></div>' +
        '<div class="card-body">' +
        '<div class="card-title">' + photo.title + "</div>" +
        '<div class="card-meta">' + photo.category + " · Galeri klien</div>" +
        "</div>" +
        "</a>"
      );
    }).join("");
  }

  // Kategori unggulan (5 kategori)
  const catEl = document.getElementById("homeCategories");
  if (catEl) {
    const categories = ["Wedding", "Prewedding", "Event", "Portrait", "Nature"];
    catEl.innerHTML = categories.map(function (cat) {
      const photo = photos.find(function (p) {
        return p.category === cat;
      });
      const img = photo ? photo.url : ph(cat, 600, 400);
      return (
        '<a href="portfolio.html?cat=' + encodeURIComponent(cat) + '" class="cat-tile">' +
        '<img src="' + img + '" alt="' + cat + '">' +
        "<span>" + cat + "</span>" +
        "</a>"
      );
    }).join("");
  }

  // Paket populer (Basic, Standard, Premium)
  const packEl = document.getElementById("homePackages");
  if (packEl) {
    packEl.innerHTML = SEED_PACKAGES
      .filter(function (pkg) {
        return pkg.id !== "custom";
      })
      .map(function (pkg) {
        return renderPackageCard(pkg);
      })
      .join("");
  }
}

renderHome();