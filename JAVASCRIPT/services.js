/* ============================================================
   ZANSTDO - services.js
   Logika halaman services: daftar paket + tombol "Pilih Paket"
   ============================================================ */

function renderServices() {
  const grid = document.getElementById("packageGrid");
  if (!grid) return;

  grid.innerHTML = SEED_PACKAGES.map(function (pkg) {
    return renderPackageCard(pkg);
  }).join("");
}

document.addEventListener("click", function (event) {
  const btn = event.target.closest("[data-pick-package]");
  if (!btn) return;

  const pkg = SEED_PACKAGES.find(function (item) {
    return item.id === btn.getAttribute("data-pick-package");
  });

  // Simpan paket yang dipilih, lalu arahkan ke halaman booking
  localStorage.setItem("zanstdo_selectedPackage", JSON.stringify(pkg));
  showToast("Paket " + pkg.name + " dipilih. Silakan isi form booking.", "success");

  setTimeout(function () {
    location.href = "booking.html";
  }, 700);
});

renderServices();