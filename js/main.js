/* ================================================================
   D&R DISTRIBUIDORA — LÓGICA GLOBAL
   main.js · Carrito, WhatsApp, Nav, Header/Footer dinámico
   ================================================================ */

/* ================================================================
   CARRITO (estado global)
   ================================================================ */
let carrito = [];
let carritoVisible = true;

function agregarAlCarrito(prod, qty = 1) {
  const ex = carrito.find(i => i.id === prod.id);
  if (ex) { ex.cantidad += qty; }
  else { carrito.push({ ...prod, cantidad: qty }); }
  renderCarrito();
  bumpBadge();
  if (!carritoVisible) toggleCarrito();
}

function quitarDelCarrito(id) {
  carrito = carrito.filter(i => i.id !== id);
  renderCarrito();
}

function limpiarCarrito() {
  carrito = [];
  renderCarrito();
}

function toggleCarrito() {
  carritoVisible = !carritoVisible;
  const body = document.getElementById('carrito-body');
  const chev = document.getElementById('carrito-chevron');
  if (!body || !chev) return;
  body.classList.toggle('closed', !carritoVisible);
  chev.classList.toggle('closed', !carritoVisible);
}

function bumpBadge() {
  const badge = document.getElementById('carrito-badge');
  if (!badge) return;
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 200);
}

function renderCarrito() {
  const lista = document.getElementById('carrito-lista');
  const badge = document.getElementById('carrito-badge');
  if (!lista || !badge) return;

  const total = carrito.reduce((s, i) => s + i.cantidad, 0);
  badge.textContent = total;

  if (carrito.length === 0) {
    lista.innerHTML = `<p class="carrito-vacio">Aún no has agregado productos.</p>`;
    return;
  }

  lista.innerHTML = carrito.map(item => `
    <div class="carrito-item">
      <span class="item-emoji">${item.emoji}</span>
      <div class="item-info">
        <div class="item-nombre">${item.nombre}</div>
        <div class="item-qty">${item.cantidad} × ${item.unidad.split('/')[0].trim()}</div>
      </div>
      <button class="item-del" data-id="${item.id}" title="Quitar">✕</button>
    </div>
  `).join('');

  lista.querySelectorAll('.item-del').forEach(btn =>
    btn.addEventListener('click', () => quitarDelCarrito(btn.dataset.id))
  );
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) {
    alert('⚠️ Agrega al menos un producto antes de enviar tu pedido.');
    return;
  }
  let texto = 'Hola D&R, me gustaría hacer el siguiente pedido:\n\n';
  carrito.forEach(item => {
    texto += `• ${item.emoji} *${item.nombre}* — ${item.cantidad} ${item.unidad.split('/')[0].trim()}\n`;
  });
  texto += '\n¿Podría indicarme disponibilidad y precios? Gracias 🙏';
  window.open(DYR.buildWspUrl(texto), '_blank');
}

/* ================================================================
   RENDER HEADER (inyectado en cada página)
   ================================================================ */
function renderHeader(rubroActivo = null) {
  const header = document.getElementById('site-header');
  if (!header) return;

  const navLinks = DYR_CONFIG.rubros.map(r => `
    <a href="${r.pagina}" class="nav-item ${rubroActivo === r.id ? 'active' : ''}">
      <span class="nav-item-emoji">${r.emoji}</span>
      ${r.label}
    </a>
  `).join('');

  const wspUrl = DYR.buildWspUrl(DYR_CONFIG.empresa.msgDefault);

  header.innerHTML = `
    <div class="container header-inner">
      <a href="index.html" class="header-logo">
        <img src="img/logo.jpg" alt="D&R Logo" onerror="this.style.display='none'">
        <span class="logo-text">D<span>&</span>R</span>
      </a>

      <nav class="header-nav" id="main-nav">
        <a href="index.html" class="nav-item ${!rubroActivo ? 'active' : ''}">Inicio</a>
        ${navLinks}
      </nav>

      <div class="header-actions">
        <a href="${wspUrl}" target="_blank" class="btn-wsp-header">
          <img src="img/miniaturas/whatsapp.png" alt="WhatsApp" class="wsp-icon2" style="height: 20px; height: 20px;" onerror="this.style.display='none'">
          <span>WhatsApp</span>
        </a>
        <button class="hamburger" id="hamburger" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;

  /* Hamburger toggle */
  document.getElementById('hamburger')?.addEventListener('click', () => {
    const nav = document.getElementById('main-nav');
    nav?.classList.toggle('open');
  });
}

/* ================================================================
   RENDER FOOTER
   ================================================================ */
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const rubroLinks = DYR_CONFIG.rubros.map(r =>
    `<a href="${r.pagina}">${r.emoji} ${r.label}</a>`
  ).join('');

  const wspUrl = DYR.buildWspUrl(DYR_CONFIG.empresa.msgDefault);

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo-text">D<span>&</span>R</div>
          <p>${DYR_CONFIG.empresa.tagline}<br>${DYR_CONFIG.empresa.ubicacion}</p>
        </div>
        <div class="footer-col">
          <h4>Rubros</h4>
          ${rubroLinks}
        </div>
        <div class="footer-col">
          <h4>Empresa</h4>
          <a href="index.html#empresa">Nosotros</a>
          <a href="index.html#logistica">Logística</a>
          <a href="index.html#ubicacion">Ubicación</a>
        </div>
        <div class="footer-col">
          <h4>Contacto</h4>
          <a href="${wspUrl}" target="_blank"> WhatsApp</a>
          <a href="index.html#contacto">Formulario</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${DYR_CONFIG.empresa.ano} ${DYR_CONFIG.empresa.nombre} — ${DYR_CONFIG.empresa.tagline}</span>
        <span>${DYR_CONFIG.empresa.ubicacion}</span>
      </div>
    </div>
  `;
}

/* ================================================================
   RENDER BOTÓN FLOTANTE WSP
   ================================================================ */
function renderFloatWsp() {
  const btn = document.getElementById('float-wsp');
  if (!btn) return;
  btn.href = DYR.buildWspUrl(DYR_CONFIG.empresa.msgDefault);
  btn.target = '_blank';
}

/* ================================================================
   INICIALIZACIÓN GLOBAL
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderFloatWsp();

  /* Carrito UI */
  document.getElementById('carrito-toggle')?.addEventListener('click', toggleCarrito);
  document.getElementById('btn-limpiar')?.addEventListener('click', limpiarCarrito);
  document.getElementById('btn-enviar')?.addEventListener('click', enviarPedidoWhatsApp);

  renderCarrito();
});
