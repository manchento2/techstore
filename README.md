# ⚡ TechStore – E-Commerce & Catálogo de Tecnología

> **Catálogo Interactivo y Carrito de Compras E-Commerce (SPA)** desarrollado con **HTML5 semántico**, **CSS3 moderno (Dark Theme & Neon Accents)** y **JavaScript vainilla** con persistencia en **LocalStorage** y checkout directo por **WhatsApp**.

---

## 🚀 Características Principales

### 1. 🛍️ Catálogo de Productos Tecnológicos
- **9 productos premium precargados** de alta tecnología con fotografías de Unsplash (*MacBook Pro M3, Sony WH-1000XM5, iPhone 15 Pro Max, Keychron Q1 Pro, Apple Watch Ultra 2, Logitech MX Master 3S, Samsung Galaxy S24 Ultra, AirPods Max, Asus ROG Zephyrus G14*).
- **Badges dinámicos:** Etiquetas visuales destacadas (*"Nuevo"*, *"Destacado"*, *"-15%"*, *"-20%"*, *"Gaming"*).
- **Puntuaciones y Reseñas:** Estrellas y valoraciones de clientes.
- **Vista Rápida (Quick View):** Modal interactivo con detalles técnicos completos de cada producto.

### 2. 🔍 Búsqueda y Filtros en Tiempo Real
- **Buscador instantáneo:** Búsqueda reactiva mientras escribes (por nombre, especificaciones o marca) con botón de limpieza rápida.
- **Filtro de Categorías:** Botones pill animados con brillo neón (*Todos, Laptops, Smartphones, Audio, Accesorios*).
- **Manejo de estado vacío:** Mensaje ilustrativo con botón para restablecer filtros cuando no se encuentran coincidencias.

### 3. 🛒 Carrito de Compras Desplegable (Slide-over Drawer)
- **Contador dinámico en la cabecera:** Badge con animación bounce que se actualiza en tiempo real al agregar o modificar productos.
- **Panel lateral deslizante:** Apertura fluida con fondo oscurecido (*backdrop-blur*).
- **Controles de cantidad:** Botones de incremento (`+`) y decremento (`-`) en cada producto.
- **Eliminación y vaciado:** Botón individual para remover productos y botón para vaciar el carrito completo.
- **Cálculo automático:** Subtotal y Total calculado al instante con formato de moneda.

### 4. 📲 Finalizar Compra por WhatsApp (Checkout Directo)
- Al hacer clic en **"Finalizar Compra por WhatsApp"**, genera dinámicamente un enlace `https://wa.me/...` con un mensaje estructurado y listo para enviar:
  ```text
  *¡Hola TechStore! Quiero finalizar mi compra:*

  🛒 *Detalle del Pedido:*
  • 1x MacBook Pro M3 14" — $1,799.00 c/u ($1,799.00)
  • 2x Sony WH-1000XM5 — $349.00 c/u ($698.00)

  ────────────────────
  💰 *TOTAL A PAGAR: $2,497.00*
  📦 *Envío: Gratis a coordinar*
  ────────────────────

  ¿Me podrían confirmar disponibilidad y medios de pago para coordinar la entrega? ¡Muchas gracias!
  ```

### 5. 💾 Persistencia en LocalStorage
- Todos los productos agregados al carrito se guardan automáticamente en el navegador y persisten aunque se recargue la página.

### 6. 🎨 Diseño Dark Tech Premium & Mobile-First
- Paleta moderna oscura (*Deep Navy `#070a13` / Slate `#111827`*) con acentos en azul eléctrico (`#3b82f6`), cian (`#06b6d4`) y violeta neón (`#8b5cf6`).
- Efectos de *Glassmorphism* con desenfoque de fondo.
- Totalmente responsive para teléfonos inteligentes, tablets y pantallas de escritorio.
- Sistema de notificaciones flotantes (*Toasts*) personalizadas.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica, accesibilidad y modales nativos.
- **CSS3:** Variables CSS (Design Tokens), Flexbox, CSS Grid, Glassmorphism, animaciones y diseño responsive.
- **JavaScript (ES6+):** Programación orientada a eventos, manipulación del DOM y API de `localStorage`.
- **Font Awesome 6 (CDN):** Iconografía moderna.
- **Google Fonts:** Tipografías *Outfit* (títulos tech) e *Inter* (lectura).

---

## 📂 Estructura del Proyecto

```text
techstore/
├── index.html        # Estructura principal del catálogo y modales
├── css/
│   └── styles.css    # Estilos Dark Theme, neon glows, grid y drawer
├── js/
│   └── app.js        # Lógica del carrito, filtros, WhatsApp y LocalStorage
└── README.md         # Documentación completa
```

---

## 💻 Cómo Ejecutar el Proyecto

1. Abrí la carpeta `techstore` en tu editor de código o haz doble clic directamente en `index.html` para abrirlo en cualquier navegador web.
2. No requiere Node.js, npm ni dependencias de backend.

---

## 🌐 Despliegue en GitHub Pages o Vercel

### Para GitHub Pages:
1. Sube el proyecto a tu repositorio de GitHub.
2. Ve a **Settings** > **Pages**.
3. Selecciona la rama `main` y la carpeta `/(root)`.
4. En pocos segundos tendrás la tienda activa en internet.
