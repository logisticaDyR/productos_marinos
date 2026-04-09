/* ================================================================
   D&R DISTRIBUIDORA — MOTOR DE CATÁLOGO
   catalogo.js · Filtros, paginación, vistas, búsqueda
   ================================================================ */

const ITEMS_PER_PAGE = 9; // productos por página

/* Estado del catálogo */
const state = {
  rubroId:    null,
  categoria:  'todos',
  venta:      'todos',
  busqueda:   '',
  orden:      'default',
  pagina:     1,
  vista:      'grid', // 'grid' | 'list'
  productos:  [],
  filtrados:  [],
};

/* ================================================================
   INICIALIZAR CATÁLOGO
   ================================================================ */
function initCatalogo(rubroId) {
  state.rubroId   = rubroId;
  state.productos = DYR.getProductos(rubroId);
  aplicarFiltros();
  renderSidebar();
  renderToolbar();
  renderProductos();
  renderPaginacion();
}

/* ================================================================
   FILTROS Y BÚSQUEDA
   ================================================================ */
function aplicarFiltros() {
  let lista = [...state.productos];

  /* Categoría */
  if (state.categoria !== 'todos') {
    lista = lista.filter(p => p.categoria === state.categoria);
  }
  /* Tipo de venta */
  if (state.venta !== 'todos') {
    lista = lista.filter(p => p.venta === state.venta || p.venta === 'ambos');
  }
  /* Búsqueda */
  if (state.busqueda.trim()) {
    const q = state.busqueda.toLowerCase();
    lista = lista.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
  }
  /* Orden */
  if (state.orden === 'az') lista.sort((a,b) => a.nombre.localeCompare(b.nombre));
  if (state.orden === 'za') lista.sort((a,b) => b.nombre.localeCompare(a.nombre));
  if (state.orden === 'destacados') lista.sort((a,b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));

  state.filtrados = lista;
  state.pagina = 1;
}

/* ================================================================
   RENDER SIDEBAR
   ================================================================ */
function renderSidebar() {
  const sb = document.getElementById('sidebar');
  if (!sb) return;

  const cats = DYR.getCategorias(state.rubroId);

  /* Conteos */
  const totalTodos = state.productos.length;
  const countCat = cat => state.productos.filter(p => p.categoria === cat).length;

  const catButtons = cats.map(cat => `
    <button class="filter-btn ${state.categoria === cat ? 'active' : ''}" data-cat="${cat}">
      <span style="text-transform:capitalize">${cat}</span>
      <span class="filt-count">${countCat(cat)}</span>
    </button>
  `).join('');

  sb.innerHTML = `
    <div class="sidebar-title">Buscar</div>
    <div class="sidebar-search">
      <span>🔍</span>
      <input type="text" id="search-input" placeholder="Buscar producto..." value="${state.busqueda}" />
    </div>

    <div class="filter-group">
      <div class="filter-group-label">Categorías</div>
      <button class="filter-btn ${state.categoria === 'todos' ? 'active' : ''}" data-cat="todos">
        <span>Todos</span>
        <span class="filt-count">${totalTodos}</span>
      </button>
      ${catButtons}
    </div>

    <div class="filter-group">
      <div class="filter-group-label">Tipo de venta</div>
      <div class="venta-filters">
        ${['todos','mayorista','minorista','ambos'].map(v => `
          <button class="filter-btn ${state.venta === v ? 'active' : ''}" data-venta="${v}">
            ${v === 'todos' ? 'Todos' : v === 'ambos' ? 'Mayor y menor' : v.charAt(0).toUpperCase()+v.slice(1)}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  /* Eventos categoría */
  sb.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.categoria = btn.dataset.cat;
      aplicarFiltros();
      renderAll();
    });
  });

  /* Eventos venta */
  sb.querySelectorAll('[data-venta]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.venta = btn.dataset.venta;
      aplicarFiltros();
      renderAll();
    });
  });

  /* Búsqueda */
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.busqueda = e.target.value;
        aplicarFiltros();
        renderAll();
      }, 280);
    });
  }
}

/* ================================================================
   RENDER TOOLBAR
   ================================================================ */
function renderToolbar() {
  const tb = document.getElementById('catalogo-toolbar');
  if (!tb) return;

  const inicio = (state.pagina - 1) * ITEMS_PER_PAGE + 1;
  const fin    = Math.min(state.pagina * ITEMS_PER_PAGE, state.filtrados.length);
  const total  = state.filtrados.length;

  tb.innerHTML = `
    <div class="toolbar-count">
      ${total === 0
        ? 'Sin resultados'
        : `Mostrando <strong>${inicio}–${fin}</strong> de <strong>${total}</strong> productos`
      }
    </div>
    <div class="toolbar-right">
      <select class="sort-select" id="sort-select">
        <option value="default"   ${state.orden==='default'  ?'selected':''}>Orden predeterminado</option>
        <option value="destacados"${state.orden==='destacados'?'selected':''}>Destacados primero</option>
        <option value="az"        ${state.orden==='az'       ?'selected':''}>A → Z</option>
        <option value="za"        ${state.orden==='za'       ?'selected':''}>Z → A</option>
      </select>
      <div class="view-toggle">
        <button class="view-btn ${state.vista==='grid'?'active':''}" data-view="grid" title="Cuadrícula">⊞</button>
        <button class="view-btn ${state.vista==='list'?'active':''}" data-view="list" title="Lista">☰</button>
      </div>
      <button class="btn btn-dark" id="btn-filtros-mobile" style="display:none">⚙ Filtros</button>
    </div>
  `;

  document.getElementById('sort-select')?.addEventListener('change', e => {
    state.orden = e.target.value;
    aplicarFiltros();
    renderAll();
  });

  tb.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.vista = btn.dataset.view;
      renderProductos();
      renderToolbar();
    });
  });

  /* Mostrar botón filtros en mobile */
  if (window.innerWidth <= 768) {
    const btnFil = document.getElementById('btn-filtros-mobile');
    if (btnFil) {
      btnFil.style.display = 'flex';
      btnFil.addEventListener('click', () => {
        document.getElementById('sidebar')?.classList.toggle('open');
      });
    }
  }
}

/* ================================================================
   RENDER PRODUCTOS
   ================================================================ */
function renderProductos() {
  const grid = document.getElementById('producto-grid');
  if (!grid) return;

  grid.className = `producto-grid ${state.vista === 'list' ? 'list-view' : ''}`;

  const inicio = (state.pagina - 1) * ITEMS_PER_PAGE;
  const pagina = state.filtrados.slice(inicio, inicio + ITEMS_PER_PAGE);

  if (pagina.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Sin resultados</h3>
        <p>Prueba con otra búsqueda o categoría.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = pagina.map((prod, i) => buildCard(prod, i)).join('');

  /* Bind botones qty y agregar */
  grid.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(`qty-${btn.dataset.id}`);
      if (!input) return;
      const val = parseInt(input.value) || 1;
      if (btn.classList.contains('btn-menos') && val > 1) input.value = val - 1;
      if (btn.classList.contains('btn-mas')) input.value = val + 1;
    });
  });

  grid.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = state.productos.find(p => p.id === btn.dataset.id);
      const qty  = parseInt(document.getElementById(`qty-${btn.dataset.id}`)?.value) || 1;
      if (!prod) return;
      agregarAlCarrito(prod, qty);
      btn.textContent = '✔ Agregado';
      btn.classList.add('agregado');
      setTimeout(() => {
        btn.textContent = '+ Agregar';
        btn.classList.remove('agregado');
      }, 1800);
    });
  });
}

function buildCard(prod, i) {
  const badgeLabel = { mayorista:'Solo mayorista', minorista:'Minorista', ambos:'Mayor y menor' };
  const badgeClass = { mayorista:'badge-mayorista', minorista:'badge-minorista', ambos:'badge-ambos' };

  return `
    <div class="producto-card" style="animation-delay:${i*0.045}s">
      <div class="card-img">
        <img src="${prod.img}" alt="${prod.nombre}" loading="lazy"
             onerror="this.src='img/placeholder.jpg'">
        
        <div class="card-quick">
          <button class="quick-btn" title="Vista rápida">👁</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-text" style="flex:1;display:flex;flex-direction:column">
          <div class="card-categoria">${prod.categoria}</div>
          <div class="card-nombre">${prod.emoji} ${prod.nombre}</div>
          <div class="card-desc">${prod.desc}</div>
          <div class="card-meta">
            <span class="card-unidad"> ${prod.unidad}</span>
            <span class="card-precio">${prod.precio}</span>
          </div>
        </div>
        <div class="card-actions">
          <div class="qty-control">
            <button class="qty-btn btn-menos" data-id="${prod.id}">−</button>
            <input class="qty-input" type="number" min="1" value="1" id="qty-${prod.id}">
            <button class="qty-btn btn-mas" data-id="${prod.id}">+</button>
          </div>
          <button class="btn-agregar" data-id="${prod.id}">+ Agregar</button>
        </div>
      </div>
    </div>
  `;
}

/* ================================================================
   RENDER PAGINACIÓN
   ================================================================ */
function renderPaginacion() {
  const pag = document.getElementById('paginacion');
  if (!pag) return;

  const totalPages = Math.ceil(state.filtrados.length / ITEMS_PER_PAGE);

  if (totalPages <= 1) { pag.innerHTML = ''; return; }

  let btns = '';

  /* Prev */
  btns += `<button class="pag-btn" data-page="${state.pagina - 1}"
    ${state.pagina === 1 ? 'disabled' : ''}>‹ Ant</button>`;

  /* Páginas */
  const pages = buildPageRange(state.pagina, totalPages);
  pages.forEach(p => {
    if (p === '…') {
      btns += `<span class="pag-dots">…</span>`;
    } else {
      btns += `<button class="pag-btn ${p === state.pagina ? 'active' : ''}"
        data-page="${p}">${p}</button>`;
    }
  });

  /* Next */
  btns += `<button class="pag-btn" data-page="${state.pagina + 1}"
    ${state.pagina === totalPages ? 'disabled' : ''}>Sig ›</button>`;

  pag.innerHTML = btns;

  pag.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      state.pagina = parseInt(btn.dataset.page);
      renderProductos();
      renderToolbar();
      renderPaginacion();
      document.getElementById('catalogo-main')?.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });
}

function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total];
  if (current >= total - 3) return [1, '…', total-4, total-3, total-2, total-1, total];
  return [1, '…', current-1, current, current+1, '…', total];
}

/* ================================================================
   RENDER ALL (helper)
   ================================================================ */
function renderAll() {
  renderSidebar();
  renderToolbar();
  renderProductos();
  renderPaginacion();
}

/* ================================================================
   HERO DINÁMICO DEL RUBRO
   ================================================================ */
function renderRubroHero(rubroId) {
  const hero = document.getElementById('rubro-hero');
  if (!hero) return;

  const r = DYR.getRubro(rubroId);
  if (!r) return;

  const total = DYR.getProductos(rubroId).length;
  const cats  = DYR.getCategorias(rubroId).length;

  /* Colores custom */
  document.documentElement.style.setProperty('--rubro-color',  r.color);
  document.documentElement.style.setProperty('--rubro-accent', r.colorAccent);

  hero.style.setProperty('--rg', hexToRgb(r.color));

  hero.innerHTML = `
    <div class="container rubro-hero-inner">
      <div class="rubro-hero-text">
        <div class="rubro-hero-badge">
          <span>${r.emoji}</span>
          <span>D&R · ${r.label}</span>
        </div>
        <h1>Catálogo de<br><span>${r.label}</span></h1>
        <p>${r.descripcion}</p>
        <div class="rubro-hero-stats">
          <div class="stat-item">
            <div class="stat-num">${total}+</div>
            <div class="stat-label">Productos</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">${cats}</div>
            <div class="stat-label">Categorías</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">24h</div>
            <div class="stat-label">Entrega</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? `${parseInt(m[1],16)},${parseInt(m[2],16)},${parseInt(m[3],16)}` : '11,110,138';
}
