/**
 * ═══════════════════════════════════════════════════════════
 * TECHSTORE – MODERN DARK TECH E-COMMERCE & CATALOGUE
 * app.js – Vanilla JavaScript con Carrito & WhatsApp Checkout
 * ═══════════════════════════════════════════════════════════
 */

'use strict';

// ── 1. CONFIGURACIÓN Y CONSTANTES ──
const CART_STORAGE_KEY = 'techstore_cart_v1';
const WHATSAPP_PHONE   = '5492664657929'; // Número de WhatsApp para pedidos (2664657929)

// Catálogo de Productos Tecnológicos Premium
const PRODUCTS = [
  {
    id: 1,
    title: 'MacBook Pro M3 14"',
    category: 'Laptops',
    price: 1799.00,
    oldPrice: 1999.00,
    badge: 'Destacado',
    badgeType: 'hot',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80',
    desc: 'Chip Apple M3 con CPU de 8 núcleos, GPU de 10 núcleos, 16GB memoria unificada y pantalla Liquid Retina XDR de 14.2 pulgadas.'
  },
  {
    id: 2,
    title: 'Sony WH-1000XM5 Noise Cancelling',
    category: 'Audio',
    price: 349.00,
    oldPrice: 399.00,
    badge: '-15%',
    badgeType: 'discount',
    rating: 4.8,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
    desc: 'Líder en cancelación de ruido activa con 8 micrófonos, audio Hi-Res inalámbrico y batería de hasta 30 horas con carga rápida.'
  },
  {
    id: 3,
    title: 'iPhone 15 Pro Max 256GB',
    category: 'Smartphones',
    price: 1199.00,
    oldPrice: null,
    badge: 'Nuevo',
    badgeType: 'new',
    rating: 5.0,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80',
    desc: 'Diseño en titanio de grado aeroespacial, chip A17 Pro ultra potente, botón de Acción y sistema de cámaras pro con teleobjetivo 5x.'
  },
  {
    id: 4,
    title: 'Teclado Keychron Q1 Pro Wireless',
    category: 'Accesorios',
    price: 189.00,
    oldPrice: 219.00,
    badge: 'Hot',
    badgeType: 'hot',
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80',
    desc: 'Teclado mecánico custom inalámbrico 75% en aluminio CNC con switches pre-lubricados y compatibilidad total Mac y Windows.'
  },
  {
    id: 5,
    title: 'Apple Watch Ultra 2 GPS + Cellular',
    category: 'Accesorios',
    price: 799.00,
    oldPrice: 849.00,
    badge: 'Flagship',
    badgeType: 'new',
    rating: 4.9,
    reviews: 74,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80',
    desc: 'Caja de titanio de 49mm, pantalla de 3.000 nits de brillo, GPS de doble frecuencia y hasta 72 horas de batería en modo ahorro.'
  },
  {
    id: 6,
    title: 'Mouse Logitech MX Master 3S',
    category: 'Accesorios',
    price: 99.00,
    oldPrice: 119.00,
    badge: '-20%',
    badgeType: 'discount',
    rating: 4.9,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=700&q=80',
    desc: 'Sensor óptico de 8.000 DPI que funciona sobre cristal, clics silenciosos al 90% y rueda electromagnética MagSpeed.'
  },
  {
    id: 7,
    title: 'Samsung Galaxy S24 Ultra 512GB',
    category: 'Smartphones',
    price: 1249.00,
    oldPrice: 1399.00,
    badge: 'Galaxy AI',
    badgeType: 'hot',
    rating: 4.8,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=700&q=80',
    desc: 'Chasis de titanio, pantalla Dynamic AMOLED 2X plana de 6.8", procesador Snapdragon 8 Gen 3 e inteligencia artificial integrada.'
  },
  {
    id: 8,
    title: 'AirPods Max Space Gray',
    category: 'Audio',
    price: 549.00,
    oldPrice: null,
    badge: 'Premium',
    badgeType: 'new',
    rating: 4.7,
    reviews: 165,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80',
    desc: 'Transductor dinámico diseñado por Apple, audio espacial con seguimiento dinámico de la cabeza y ecualización adaptativa.'
  },
  {
    id: 9,
    title: 'Asus ROG Zephyrus G14 Gaming',
    category: 'Laptops',
    price: 1599.00,
    oldPrice: 1749.00,
    badge: 'Gaming',
    badgeType: 'hot',
    rating: 4.9,
    reviews: 97,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80',
    desc: 'Pantalla OLED 3K 120Hz, procesador AMD Ryzen 9, gráfica NVIDIA GeForce RTX 4070 en un chasis ultraligero de 1.5 kg.'
  }
];

// ── 2. ESTADO DE LA APLICACIÓN ──
let state = {
  cart: [],
  selectedCategory: 'Todos',
  searchQuery: ''
};

// ── 3. REFERENCIAS DEL DOM ──
const elements = {
  // Búsqueda y Filtros
  searchInput:           document.getElementById('search-input'),
  searchClear:           document.getElementById('search-clear'),
  categoryPills:         document.querySelectorAll('.cat-pill'),
  catalogCount:          document.getElementById('catalog-count'),
  productsGrid:          document.getElementById('products-grid'),
  emptyResults:          document.getElementById('empty-results'),
  emptyTerm:             document.getElementById('empty-term'),
  btnResetFilters:       document.getElementById('btn-reset-filters'),

  // Carrito Drawer
  cartToggleBtn:         document.getElementById('cart-toggle-btn'),
  cartCloseBtn:          document.getElementById('cart-close-btn'),
  cartDrawer:            document.getElementById('cart-drawer'),
  cartOverlay:           document.getElementById('cart-overlay'),
  cartBadge:             document.getElementById('cart-badge'),
  cartDrawerCount:       document.getElementById('cart-drawer-count'),
  cartItemsContainer:    document.getElementById('cart-items-container'),
  cartFooter:            document.getElementById('cart-footer'),
  cartSubtotal:          document.getElementById('cart-subtotal'),
  cartTotal:             document.getElementById('cart-total'),
  btnCheckoutWhatsapp:   document.getElementById('btn-checkout-whatsapp'),
  btnClearCart:          document.getElementById('btn-clear-cart'),

  // Modal Vista Rápida
  quickModalBackdrop:    document.getElementById('quick-modal-backdrop'),
  quickModalClose:       document.getElementById('quick-modal-close'),
  quickModalBody:        document.getElementById('quick-modal-body'),

  // Toast Container
  toastContainer:        document.getElementById('toast-container')
};

// ── 4. INICIALIZACIÓN ──
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  bindEvents();
  renderProducts();
});

// Cargar carrito desde LocalStorage
function initCart() {
  try {
    const rawCart = localStorage.getItem(CART_STORAGE_KEY);
    if (rawCart) {
      state.cart = JSON.parse(rawCart);
      if (!Array.isArray(state.cart)) state.cart = [];
    }
  } catch (err) {
    console.error('Error cargando carrito de LocalStorage:', err);
    state.cart = [];
  }
  updateCartUI();
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
  } catch (err) {
    console.error('Error guardando en LocalStorage:', err);
  }
  updateCartUI();
}

// ── 5. FORMATEO MONETARIO ──
function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// ── 6. RENDERIZADO DEL CATÁLOGO DE PRODUCTOS ──
function getFilteredProducts() {
  return PRODUCTS.filter(prod => {
    // Filtro por categoría
    const matchesCat = state.selectedCategory === 'Todos' || prod.category === state.selectedCategory;

    // Filtro por búsqueda
    const q = state.searchQuery.trim().toLowerCase();
    const matchesSearch = !q ||
      prod.title.toLowerCase().includes(q) ||
      prod.category.toLowerCase().includes(q) ||
      prod.desc.toLowerCase().includes(q);

    return matchesCat && matchesSearch;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();

  // Contador de catálogo
  if (elements.catalogCount) {
    elements.catalogCount.textContent = `Mostrando ${filtered.length} de ${PRODUCTS.length} productos`;
  }

  // Estado vacío
  if (filtered.length === 0) {
    elements.productsGrid.innerHTML = '';
    elements.emptyResults.style.display = 'block';
    if (elements.emptyTerm) elements.emptyTerm.textContent = state.searchQuery || state.selectedCategory;
    return;
  }

  elements.emptyResults.style.display = 'none';

  // Renderizar tarjetas
  elements.productsGrid.innerHTML = filtered.map(prod => {
    const badgeHtml = prod.badge
      ? `<span class="product-card__badge product-card__badge--${prod.badgeType || 'new'}">${escapeHtml(prod.badge)}</span>`
      : '';

    const oldPriceHtml = prod.oldPrice
      ? `<span class="product-card__old-price">${formatMoney(prod.oldPrice)}</span>`
      : '';

    return `
      <article class="product-card" data-id="${prod.id}">
        <!-- Media / Imagen -->
        <div class="product-card__media">
          ${badgeHtml}
          <img 
            src="${escapeHtml(prod.image)}" 
            alt="${escapeHtml(prod.title)}" 
            class="product-card__img" 
            loading="lazy"
          />
          <button 
            type="button" 
            class="product-card__quick-btn" 
            onclick="openQuickView(${prod.id})" 
            title="Vista Rápida"
            aria-label="Vista rápida de ${escapeHtml(prod.title)}"
          >
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <!-- Contenido -->
        <div class="product-card__body">
          <div class="product-card__meta">
            <span class="product-card__category">${escapeHtml(prod.category)}</span>
            <div class="product-card__rating">
              <i class="fa-solid fa-star"></i>
              <span>${prod.rating} (${prod.reviews})</span>
            </div>
          </div>

          <h3 class="product-card__title">${escapeHtml(prod.title)}</h3>
          <p class="product-card__desc">${escapeHtml(prod.desc)}</p>

          <div class="product-card__footer">
            <div class="product-card__price">
              ${oldPriceHtml}
              <span class="product-card__current-price">${formatMoney(prod.price)}</span>
            </div>
            <button 
              type="button" 
              class="product-card__add-btn" 
              onclick="addToCart(${prod.id})"
              title="Agregar al Carrito"
            >
              <i class="fa-solid fa-cart-plus"></i>
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ── 7. LÓGICA DEL CARRITO DE COMPRAS ──
function addToCart(productId, qtyToAdd = 1) {
  const product = PRODUCTS.find(p => p.id === Number(productId));
  if (!product) return;

  const existingIndex = state.cart.findIndex(item => item.id === product.id);

  if (existingIndex !== -1) {
    state.cart[existingIndex].quantity += qtyToAdd;
  } else {
    state.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: qtyToAdd
    });
  }

  saveCart();
  animateBadge();
  showToast('success', '¡Agregado!', `"${product.title}" se agregó al carrito.`);
}

function updateCartQty(productId, delta) {
  const index = state.cart.findIndex(item => item.id === Number(productId));
  if (index === -1) return;

  state.cart[index].quantity += delta;

  if (state.cart[index].quantity <= 0) {
    const removedName = state.cart[index].title;
    state.cart.splice(index, 1);
    showToast('info', 'Producto eliminado', `"${removedName}" fue removido.`);
  }

  saveCart();
}

function removeFromCart(productId) {
  const index = state.cart.findIndex(item => item.id === Number(productId));
  if (index === -1) return;

  const removedName = state.cart[index].title;
  state.cart.splice(index, 1);
  saveCart();
  showToast('info', 'Producto eliminado', `"${removedName}" fue quitado del carrito.`);
}

function clearCart() {
  if (state.cart.length === 0) return;

  if (confirm('¿Estás seguro de que deseas vaciar tu carrito de compras?')) {
    state.cart = [];
    saveCart();
    showToast('info', 'Carrito vaciado', 'Todos los productos fueron removidos.');
  }
}

// Actualizar la interfaz del carrito (Drawer, Badge, Totales)
function updateCartUI() {
  const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Badge en Header
  if (elements.cartBadge) {
    elements.cartBadge.textContent = totalItems;
  }

  // Header del Drawer
  if (elements.cartDrawerCount) {
    elements.cartDrawerCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
  }

  // Precios
  if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatMoney(subtotal);
  if (elements.cartTotal) elements.cartTotal.textContent = formatMoney(subtotal);

  // Generar link de WhatsApp
  updateWhatsAppCheckoutLink(subtotal);

  // Renderizar Items dentro del Drawer
  if (!elements.cartItemsContainer) return;

  if (state.cart.length === 0) {
    elements.cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <h3>Tu carrito está vacío</h3>
        <p>Aún no has agregado productos. Explorá nuestro catálogo tecnológico.</p>
        <button class="btn btn--primary btn--sm" onclick="closeCart(); location.href='#catalogo';">
          <i class="fa-solid fa-compass"></i> Explorar Catálogo
        </button>
      </div>
    `;
    if (elements.cartFooter) elements.cartFooter.style.display = 'none';
    return;
  }

  if (elements.cartFooter) elements.cartFooter.style.display = 'flex';

  elements.cartItemsContainer.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" class="cart-item__img" />
      <div class="cart-item__info">
        <h4 class="cart-item__title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h4>
        <div class="cart-item__price">${formatMoney(item.price)}</div>
        <div class="cart-item__controls">
          <div class="qty-stepper">
            <button type="button" class="qty-btn" onclick="updateCartQty(${item.id}, -1)" title="Restar 1" aria-label="Disminuir">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="qty-val">${item.quantity}</span>
            <button type="button" class="qty-btn" onclick="updateCartQty(${item.id}, 1)" title="Sumar 1" aria-label="Aumentar">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <button type="button" class="cart-item__remove-btn" onclick="removeFromCart(${item.id})" title="Eliminar producto" aria-label="Eliminar">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Animación bounce en badge
function animateBadge() {
  if (!elements.cartBadge) return;
  elements.cartBadge.classList.remove('badge-bounce');
  void elements.cartBadge.offsetWidth;
  elements.cartBadge.classList.add('badge-bounce');
}

// ── 8. WHATSAPP CHECKOUT ──
function updateWhatsAppCheckoutLink(subtotal) {
  if (!elements.btnCheckoutWhatsapp) return;

  if (state.cart.length === 0) {
    elements.btnCheckoutWhatsapp.href = '#';
    elements.btnCheckoutWhatsapp.classList.add('disabled');
    return;
  }

  elements.btnCheckoutWhatsapp.classList.remove('disabled');

  // Construir mensaje detallado y pulido
  let msg = `*¡Hola TechStore! Quiero finalizar mi compra:*\n\n`;
  msg += `🛒 *Detalle del Pedido:*\n`;

  state.cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    msg += `• *${item.quantity}x* ${item.title} — ${formatMoney(item.price)} c/u (${formatMoney(itemTotal)})\n`;
  });

  msg += `\n────────────────────\n`;
  msg += `💰 *TOTAL A PAGAR: ${formatMoney(subtotal)}*\n`;
  msg += `📦 *Envío: Gratis a coordinar*\n`;
  msg += `────────────────────\n\n`;
  msg += `¿Me podrían confirmar disponibilidad y medios de pago para coordinar la entrega? ¡Muchas gracias!`;

  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
  elements.btnCheckoutWhatsapp.href = waUrl;
}

// ── 9. ABRIR / CERRAR DRAWER DEL CARRITO ──
function openCart() {
  if (elements.cartDrawer) elements.cartDrawer.classList.add('active');
  if (elements.cartOverlay) {
    elements.cartOverlay.classList.add('active');
    elements.cartOverlay.setAttribute('aria-hidden', 'false');
  }
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  if (elements.cartDrawer) elements.cartDrawer.classList.remove('active');
  if (elements.cartOverlay) {
    elements.cartOverlay.classList.remove('active');
    elements.cartOverlay.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = '';
}

// ── 10. MODAL DE VISTA RÁPIDA (QUICK VIEW) ──
function openQuickView(productId) {
  const prod = PRODUCTS.find(p => p.id === Number(productId));
  if (!prod) return;

  elements.quickModalBody.innerHTML = `
    <div class="quick-view-grid">
      <img src="${escapeHtml(prod.image)}" alt="${escapeHtml(prod.title)}" class="quick-view-img" />
      <div class="quick-view-details">
        <span class="product-card__category">${escapeHtml(prod.category)}</span>
        <h3 class="product-card__title" style="font-size: 1.5rem; margin: 0.5rem 0;">${escapeHtml(prod.title)}</h3>
        <div class="product-card__rating" style="margin-bottom: 1rem;">
          <i class="fa-solid fa-star"></i>
          <span>${prod.rating} (${prod.reviews} opiniones verificadas)</span>
        </div>
        <p class="product-card__desc" style="-webkit-line-clamp: unset; margin-bottom: 1.5rem;">${escapeHtml(prod.desc)}</p>
        
        <div style="display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1.5rem;">
          <span class="product-card__current-price" style="font-size: 1.75rem;">${formatMoney(prod.price)}</span>
          ${prod.oldPrice ? `<span class="product-card__old-price" style="font-size: 1rem;">${formatMoney(prod.oldPrice)}</span>` : ''}
        </div>

        <button 
          class="btn btn--primary" 
          onclick="addToCart(${prod.id}); closeQuickView();"
          style="width: 100%;"
        >
          <i class="fa-solid fa-cart-plus"></i> Agregar al Carrito
        </button>
      </div>
    </div>
  `;

  elements.quickModalBackdrop.classList.add('active');
  elements.quickModalBackdrop.setAttribute('aria-hidden', 'false');
}

function closeQuickView() {
  elements.quickModalBackdrop.classList.remove('active');
  elements.quickModalBackdrop.setAttribute('aria-hidden', 'true');
}

// ── 11. TOAST NOTIFICATIONS ──
function showToast(type, title, msg) {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <div class="toast__icon">
      <i class="fa-solid ${type === 'success' ? 'fa-cart-check' : 'fa-circle-info'}"></i>
    </div>
    <div class="toast__body">
      <div class="toast__title">${escapeHtml(title)}</div>
      <div class="toast__msg">${escapeHtml(msg)}</div>
    </div>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 3000);
}

// ── 12. EVENT LISTENERS ──
function bindEvents() {
  // Drawer del Carrito
  if (elements.cartToggleBtn) elements.cartToggleBtn.addEventListener('click', openCart);
  if (elements.cartCloseBtn)  elements.cartCloseBtn.addEventListener('click', closeCart);
  if (elements.cartOverlay)   elements.cartOverlay.addEventListener('click', closeCart);
  if (elements.btnClearCart)  elements.btnClearCart.addEventListener('click', clearCart);

  // Búsqueda en tiempo real
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (elements.searchClear) {
        elements.searchClear.style.display = e.target.value ? 'grid' : 'none';
      }
      renderProducts();
    });
  }

  if (elements.searchClear) {
    elements.searchClear.addEventListener('click', () => {
      elements.searchInput.value = '';
      elements.searchClear.style.display = 'none';
      state.searchQuery = '';
      renderProducts();
      elements.searchInput.focus();
    });
  }

  // Filtros de categoría por pills
  elements.categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      elements.categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.selectedCategory = pill.dataset.category;
      renderProducts();
    });
  });

  // Botón restablecer filtros en estado vacío
  if (elements.btnResetFilters) {
    elements.btnResetFilters.addEventListener('click', () => {
      state.selectedCategory = 'Todos';
      state.searchQuery = '';
      if (elements.searchInput) elements.searchInput.value = '';
      if (elements.searchClear) elements.searchClear.style.display = 'none';
      elements.categoryPills.forEach(p => {
        p.classList.toggle('active', p.dataset.category === 'Todos');
      });
      renderProducts();
    });
  }

  // Modal Vista Rápida
  if (elements.quickModalClose) elements.quickModalClose.addEventListener('click', closeQuickView);
  if (elements.quickModalBackdrop) {
    elements.quickModalBackdrop.addEventListener('click', (e) => {
      if (e.target === elements.quickModalBackdrop) closeQuickView();
    });
  }

  // Tecla Escape para cerrar modales y drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeQuickView();
    }
  });
}

// Filtro disparado desde links del footer
function filterFromFooter(catName) {
  state.selectedCategory = catName;
  elements.categoryPills.forEach(p => {
    p.classList.toggle('active', p.dataset.category === catName);
  });
  renderProducts();
}

// Sanitización de strings
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Exponer funciones globales para atributos onclick
window.addToCart = addToCart;
window.addToCartDirect = (id) => { addToCart(id); openCart(); };
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.closeCart = closeCart;
window.filterFromFooter = filterFromFooter;
