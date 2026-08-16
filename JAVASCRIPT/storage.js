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