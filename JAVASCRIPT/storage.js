/* ============================================================
   ZANSTDO - storage.js
   Helper LocalStorage: baca, tulis, dan cari data
   ============================================================ */

const STORAGE_KEYS = {
  photos: "zanstdo_photos",
  galleries: "zanstdo_galleries",
  bookings: "zanstdo_bookings",
  customRequests: "zanstdo_customRequests",
  products: "zanstdo_products",
  cart: "zanstdo_cart",
  orders: "zanstdo_orders"
};

// ----- Baca & tulis data umum -----
function readData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Gagal membaca data:", key, error);
    return null;
  }
}

function writeData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ----- Placeholder gambar (siluet ala Bootstrap) -----
// Pengganti foto AI/random: kotak abu-abu + siluet kamera + label,
// dikirim sebagai data URI SVG sehingga tidak butuh internet.
function ph(label, w, h, dark) {
  const bg = dark ? "#161C19" : "#E9ECEF";
  const fg = dark ? "#9AA5A3" : "#6C757D";
  const wpx = w || 600;
  const hpx = h || 400;

  const bw = Math.round(wpx * 0.5);
  const bh = Math.round(hpx * 0.34);
  const bx = Math.round((wpx - bw) / 2);
  const by = Math.round((hpx - bh) / 2);
  const lens = Math.round(bh * 0.42);
  const cx = Math.round(wpx / 2);
  const cy = Math.round(hpx / 2);
  const pad = Math.round(bh * 0.18);

  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + wpx + '" height="' + hpx + '" viewBox="0 0 ' + wpx + " " + hpx + '">' +
    '<rect width="100%" height="100%" fill="' + bg + '"/>' +
    '<g opacity="0.55">' +
    '<rect x="' + bx + '" y="' + (by + pad) + '" width="' + bw + '" height="' + bh + '" rx="' + Math.round(bh * 0.14) + '"/>' +
    '<rect x="' + Math.round(bx + bw * 0.36) + '" y="' + Math.round(by + pad - bh * 0.16) + '" width="' + Math.round(bw * 0.28) + '" height="' + Math.round(bh * 0.18) + '" rx="4"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + lens + '" fill="' + bg + '" stroke="' + fg + '" stroke-width="' + Math.max(6, Math.round(bh * 0.08)) + '"/>' +
    "</g>" +
    '<text x="50%" y="' + Math.round(hpx * 0.9) + '" fill="' + fg + '" font-family="Inter, system-ui, sans-serif" font-size="' + Math.max(14, Math.round(wpx * 0.028)) + '" font-weight="600" text-anchor="middle">' + (label || "ZANSTDO") + "</text>" +
    "</svg>";

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// ----- Photos -----
function getPhotos() {
  return readData(STORAGE_KEYS.photos) || [];
}

function savePhotos(photos) {
  writeData(STORAGE_KEYS.photos, photos);
}

// ----- Galleries -----
function getGalleries() {
  return readData(STORAGE_KEYS.galleries) || [];
}

function saveGalleries(galleries) {
  writeData(STORAGE_KEYS.galleries, galleries);
}

// ----- Bookings -----
function getBookings() {
  return readData(STORAGE_KEYS.bookings) || [];
}

function saveBookings(bookings) {
  writeData(STORAGE_KEYS.bookings, bookings);
}

// ----- Custom requests -----
function getCustomRequests() {
  return readData(STORAGE_KEYS.customRequests) || [];
}

function saveCustomRequests(requests) {
  writeData(STORAGE_KEYS.customRequests, requests);
}

// ----- Products -----
function getProducts() {
  return readData(STORAGE_KEYS.products) || [];
}

function saveProducts(products) {
  writeData(STORAGE_KEYS.products, products);
}

// ----- Cart -----
function getCart() {
  return readData(STORAGE_KEYS.cart) || [];
}

function saveCart(cart) {
  writeData(STORAGE_KEYS.cart, cart);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.quantity * item.price, 0);
}

// ----- Orders -----
function getOrders() {
  return readData(STORAGE_KEYS.orders) || [];
}

function saveOrders(orders) {
  writeData(STORAGE_KEYS.orders, orders);
}

// ----- Pencarian data -----
function getPhotoById(id) {
  return getPhotos().find(photo => photo.id === id);
}

function getGalleryById(id) {
  return getGalleries().find(gallery => gallery.id === id);
}

function getBookingById(id) {
  return getBookings().find(booking => booking.id === id);
}

function getProductById(id) {
  return getProducts().find(product => product.id === id);
}

// ----- Cart helpers -----
function addToCart(productId, quantity, photoId) {
  const cart = getCart();
  const photoKey = photoId || "";

  const existing = cart.find(
    item => item.productId === productId && item.photoId === photoKey
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    const product = getProductById(productId);
    if (!product) return false;

    cart.push({
      productId: productId,
      productName: product.name,
      photoId: photoKey,
      quantity: quantity,
      price: product.price
    });
  }

  saveCart(cart);
  return true;
}

function removeFromCart(productId, photoId) {
  const photoKey = photoId || "";
  const cart = getCart().filter(
    item => !(item.productId === productId && item.photoId === photoKey)
  );
  saveCart(cart);
}

function updateCartQuantity(productId, photoId, newQuantity) {
  const photoKey = photoId || "";
  const cart = getCart();

  if (newQuantity <= 0) {
    removeFromCart(productId, photoKey);
    return;
  }

  const item = cart.find(
    item => item.productId === productId && item.photoId === photoKey
  );

  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}