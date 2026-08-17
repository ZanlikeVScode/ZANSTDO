/* ============================================================
   ZANSTDO - store.js
   Logika Store, Cart, dan Checkout
   ============================================================ */

// ----- Halaman shop (shop.html) -----
function renderStore() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const photoId = params.get("photo");
  const photo = photoId ? getPhotoById(photoId) : null;

  // Banner jika datang dari "Order Print" galeri klien
  const banner = document.getElementById("printBanner");
  if (banner) {
    if (photo) {
      banner.innerHTML =
        '<img src="' + photo.url + '" alt="">' +
        '<div class="text"><strong>Order print untuk foto:</strong> ' + photo.title +
        "<br>Pilih produk cetak di bawah, pilihan kamu akan otomatis menaut ke foto ini.</div>";
      banner.classList.add("show");
    } else {
      banner.classList.remove("show");
    }
  }

  // Kelompokkan produk berdasarkan jenis
  const products = getProducts();
  const groups = {};
  products.forEach(function (product) {
    (groups[product.type] = groups[product.type] || []).push(product);
  });

  grid.innerHTML = Object.keys(groups)
    .map(function (type) {
      return (
        '<h3 class="group-title">' + type + "</h3>" +
        '<div class="grid grid-4">' +
        groups[type].map(function (product) {
          return productCard(product, photoId);
        }).join("") +
        "</div>"
      );
    })
    .join("");
}

function productCard(product, photoId) {
  return (
    '<div class="card product-card">' +
    '<div class="emoji">' + product.emoji + "</div>" +
    '<div class="product-type">' + product.type + "</div>" +
    '<div class="card-title">' + product.name + "</div>" +
    '<div class="product-price">' + formatRupiah(product.price) + "<small> /" + product.unit + "</small></div>" +
    '<button class="btn btn-gold btn-sm" data-add-product="' + product.id + '" data-photo="' + (photoId || "") + '">Tambah ke Keranjang</button>' +
    "</div>"
  );
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = getCartCount();
}

document.addEventListener("click", function (event) {
  const addBtn = event.target.closest("[data-add-product]");
  if (!addBtn) return;

  const productId = addBtn.getAttribute("data-add-product");
  const photoId = addBtn.getAttribute("data-photo") || "";

  const product = getProductById(productId);
  const photo = photoId ? getPhotoById(photoId) : null;

  if (addToCart(productId, 1, photoId)) {
    updateCartBadge();
    showToast(
      photo
        ? "\u201C" + product.name + "\u201D untuk " + photo.title + " masuk keranjang"
        : "\u201C" + product.name + "\u201D masuk keranjang",
      "success"
    );
  }
});

// ----- Halaman cart (cart.html) -----
function renderCart() {
  const tbody = document.getElementById("cartBody");
  const summary = document.getElementById("cartSummary");
  const emptyBox = document.getElementById("cartEmpty");
  if (!tbody) return;

  const cart = getCart();

  if (cart.length === 0) {
    tbody.innerHTML = "";
    if (summary) summary.style.display = "none";
    if (emptyBox) {
      emptyBox.style.display = "block";
      emptyBox.innerHTML =
        '<div class="empty"><div class="empty-icon">🛒</div>Keranjang masih kosong.<br><br>' +
        '<a href="shop.html" class="btn btn-gold">Lihat Produk</a></div>';
    }
    return;
  }

  if (emptyBox) emptyBox.style.display = "none";
  if (summary) summary.style.display = "block";

  tbody.innerHTML = cart
    .map(function (item) {
      const photo = item.photoId ? getPhotoById(item.photoId) : null;
      const photoCaption = photo
        ? '<div class="muted-text small">untuk foto: ' + photo.title + "</div>"
        : "";
      const dataKey = 'data-key="' + encodeURIComponent(item.productId + "|" + item.photoId) + '"';

      return (
        "<tr>" +
        "<td><strong>" + item.productName + "</strong>" + photoCaption + "</td>" +
        "<td>" + formatRupiah(item.price) + "</td>" +
        "<td><div class=\"qty\">" +
        '<button data-qty-minus ' + dataKey + ">&minus;</button>" +
        "<span>" + item.quantity + "</span>" +
        '<button data-qty-plus ' + dataKey + ">+</button>" +
        "</div></td>" +
        "<td><strong>" + formatRupiah(item.price * item.quantity) + "</strong></td>" +
        "<td><button class=\"icon-btn delete\" data-remove " + dataKey + ' title="Hapus">🗑️</button></td>' +
        "</tr>"
      );
    })
    .join("");

  const totalText = formatRupiah(getCartTotal());
  document.getElementById("cartTotal").textContent = totalText;
  const total2 = document.getElementById("cartTotal2");
  if (total2) total2.textContent = totalText;
}

// Ubah jumlah / hapus item cart
function handleCartAction(event) {
  const minus = event.target.closest("[data-qty-minus]");
  const plus = event.target.closest("[data-qty-plus]");
  const remove = event.target.closest("[data-remove]");

  const keyEl = minus || plus || remove;
  if (!keyEl) return;

  const key = decodeURIComponent(keyEl.getAttribute("data-key"));
  const parts = key.split("|");
  const productId = parts[0];
  const photoId = parts[1] || "";

  const current = getCart().find(function (item) {
    return item.productId === productId && item.photoId === photoId;
  });

  if (!current) return;

  if (remove) {
    removeFromCart(productId, photoId);
  } else if (minus) {
    updateCartQuantity(productId, photoId, current.quantity - 1);
  } else if (plus) {
    updateCartQuantity(productId, photoId, current.quantity + 1);
  }

  renderCart();
  updateCartBadge();
}

document.addEventListener("click", handleCartAction);

// ----- Halaman checkout (checkout.html) -----
let selectedPayment = "";

function renderCheckoutSummary() {
  const itemsEl = document.getElementById("checkoutItems");
  if (!itemsEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    const emptyBox = document.getElementById("checkoutEmpty");
    if (emptyBox) {
      emptyBox.style.display = "block";
      emptyBox.innerHTML =
        '<div class="empty"><div class="empty-icon">🛒</div>Keranjang kosong, isi dulu di Store.<br><br>' +
        '<a href="shop.html" class="btn btn-gold">Ke Shop</a></div>';
    }
    return;
  }

  itemsEl.innerHTML = cart
    .map(function (item) {
      const photo = item.photoId ? getPhotoById(item.photoId) : null;
      const photoCaption = photo
        ? '<div class="muted-text small">untuk foto: ' + photo.title + "</div>"
        : "";
      return (
        '<div class="summary-row">' +
        "<span>" + item.productName + " × " + item.quantity + photoCaption + "</span>" +
        "<span>" + formatRupiah(item.price * item.quantity) + "</span>" +
        "</div>"
      );
    })
    .join("");

  document.getElementById("checkoutSubtotal").textContent = formatRupiah(getCartTotal());
  document.getElementById("checkoutTotal").textContent = formatRupiah(getCartTotal());
}

// Pilihan metode pembayaran
document.addEventListener("click", function (event) {
  const payCard = event.target.closest("[data-payment]");
  if (!payCard) return;

  selectedPayment = payCard.getAttribute("data-payment");

  document.querySelectorAll("[data-payment]").forEach(function (card) {
    card.classList.toggle("selected", card === payCard);
  });
});

// Submit checkout
const checkoutForm = document.getElementById("checkoutForm");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      showToast("Keranjang masih kosong.", "error");
      return;
    }

    const name = document.getElementById("checkoutName").value.trim();
    const email = document.getElementById("checkoutEmail").value.trim();
    const phone = document.getElementById("checkoutPhone").value.trim();

    let valid = true;
    valid = setFieldError("checkoutName", name ? "" : "Nama wajib diisi.") && valid;
    valid =
      setFieldError(
        "checkoutEmail",
        email ? (emailPattern.test(email) ? "" : "Format email tidak valid.") : "Email wajib diisi."
      ) && valid;
    valid = setFieldError("checkoutPhone", phone ? "" : "Nomor telepon wajib diisi.") && valid;

    // Validasi metode pembayaran (group khusus tanpa input)
    const paymentGroup = document.getElementById("checkoutPaymentGroup");
    if (!selectedPayment) {
      if (paymentGroup) paymentGroup.classList.add("invalid");
      valid = false;
    } else if (paymentGroup) {
      paymentGroup.classList.remove("invalid");
    }

    if (!valid) {
      showToast("Periksa kembali data yang diisi.", "error");
      return;
    }

    // Simpan order
    const order = {
      id: "order-" + Date.now(),
      customerName: name,
      email: email,
      phone: phone,
      items: JSON.parse(JSON.stringify(cart)),
      total: getCartTotal(),
      paymentMethod: selectedPayment,
      status: "Menunggu Pembayaran",
      createdAt: new Date().toISOString()
    };

    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);

    clearCart();
    updateCartBadge();

    // Tampilkan panel sukses
    const formView = document.getElementById("checkoutFormView");
    const successView = document.getElementById("checkoutSuccessView");
    if (formView) formView.style.display = "none";
    if (successView) {
      successView.style.display = "block";
      document.getElementById("successOrderId").textContent = order.id;
      document.getElementById("successOrderTotal").textContent = formatRupiah(order.total);
      document.getElementById("successOrderMethod").textContent = order.paymentMethod;
      document.getElementById("successOrderStatus").innerHTML = statusBadge(order.status);
      document.getElementById("successOrderItems").textContent =
        order.items.reduce(function (sum, item) { return sum + item.quantity; }, 0) + " item";
    }
  });
}

// ----- Init sesuai halaman -----
renderStore();
renderCart();
renderCheckoutSummary();