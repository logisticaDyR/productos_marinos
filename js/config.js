/* ================================================================
   D&R DISTRIBUIDORA — CONFIGURACIÓN GLOBAL
   config.js · Única fuente de verdad del sitio
   ================================================================ */

const DYR_CONFIG = {

  /* ── Empresa ── */
  empresa: {
    nombre: "D & R",
    tagline: "Distribución Mayorista",
    whatsapp: "51976318016",
    msgDefault: "Hola D&R, me gustaría consultar sobre sus productos.",
    ubicacion: "Terminal Pesquero VMT, Lima",
    ano: 2026,
  },

  /* ── Rubros (cada uno tendrá su página) ── */
  
  rubros: [
    {
      id: "marino",
      label: "Productos Marinos",
      emoji: "",
      icon: "wave",
      color: "#0b6e8a",
      colorAccent: "#4ecdc4",
      pagina: "templates/marino.html",
      descripcion: "Pescados frescos, mariscos, algas y congelados directos del Terminal Pesquero VMT.",
      img: "img/hero_marino.jpg",
    },
    /* ── 
    {
      id: "agricola",
      label: "Agrícola",
      emoji: "",
      icon: "leaf",
      color: "#2d6a1f",
      colorAccent: "#8bc34a",
      pagina: "templates/agricola.html",
      descripcion: "Frutas, verduras y tubérculos frescos de primera calidad, directo del campo.",
      img: "img/hero_agricola.jpg",
    },
    {
      id: "ferreteria",
      label: "Ferretería",
      emoji: "",
      icon: "wrench",
      color: "#7a3500",
      colorAccent: "#e8820c",
      pagina: "templates/ferreteria.html",
      descripcion: "Herramientas, materiales de construcción y artículos para el hogar.",
      img: "img/hero_ferreteria.jpg",
    },
    {
      id: "abarrotes",
      label: "Abarrotes",
      emoji: "",
      icon: "basket",
      color: "#5c2d91",
      colorAccent: "#ab47bc",
      pagina: "templates/abarrotes.html",
      descripcion: "Productos de primera necesidad, conservas, aceites, azúcar y más.",
      img: "img/hero_abarrotes.jpg",
    },
    ── */
  ],

  /* ================================================================
     BASE DE DATOS DE PRODUCTOS
     Agrega aquí nuevos productos — se renderizan en su página automáticamente.
     Campos:
       id        → único, sin espacios
       rubro     → id del rubro (marino | agricola | ferreteria | abarrotes)
       categoria → subcategoría dentro del rubro
       nombre    → nombre visible
       emoji     → ícono
       img       → ruta relativa a img/
       desc      → descripción corta
       unidad    → texto de unidad de venta
       precio    → texto de precio (o "")
       venta     → "mayorista" | "minorista" | "ambos"
       destacado → true | false (aparece en home)
     ================================================================ */
  productos: [

    /* ── MARINO · PESCADOS ── */
    { id:"corvina",    rubro:"marino", categoria:"pescados",   nombre:"Corvina Fresca",        emoji:"", img:"img/pescados/corvina.webp",  desc:"Corvina entera o fileteada, captura del día. Ideal para ceviche y sudados.",         unidad:"Por kilo ",  precio:"", venta:"ambos",     destacado:false  },
    { id:"jurel",      rubro:"marino", categoria:"pescados",   nombre:"Jurel Fresco",           emoji:"", img:"img/pescados/jurel.webp",  desc:"Jurel de alta calidad, fresco y sin escamas. Perfecto para frituras y guisos.",      unidad:"Por kilo ",          precio:"", venta:"ambos",     destacado:false },
    { id:"bonito",     rubro:"marino", categoria:"pescados",   nombre:"Bonito Fresco",          emoji:"", img:"img/pescados/bonito.webp",  desc:"Bonito entero o en trozos. Muy apreciado para anticuchos y escabeche.",             unidad:"Por kilo ",          precio:"", venta:"ambos",     destacado:false },
    { id:"caballa",    rubro:"marino", categoria:"pescados",   nombre:"Caballa Fresca",         emoji:"", img:"img/pescados/caballa.jpg",  desc:"Caballa de temporada, ideal para conservas caseras, parrilla y sopas.",             unidad:"Por kilo",                     precio:"", venta:"minorista", destacado:false },
    { id:"merluza",    rubro:"marino", categoria:"pescados",   nombre:"Merluza Fresca",         emoji:"", img:"img/pescados/merluza.jpg",  desc:"Merluza entera. Carne blanca y suave, muy versátil en la cocina.",                 unidad:"Por kilo ",          precio:"", venta:"ambos",     destacado:false },
    { id:"pejerrey",   rubro:"marino", categoria:"pescados",   nombre:"Pejerrey Fresco",        emoji:"", img:"img/pescados/pejerrey.jpg",  desc:"Pejerrey de calidad, pequeño y sabroso. Ideal para freír.",                         unidad:"Por kilo",                     precio:"", venta:"minorista", destacado:false },

    /* ── MARINO · MARISCOS ── */
    { id:"langostinos",rubro:"marino", categoria:"mariscos",   nombre:"Langostinos Frescos",    emoji:"", img:"img/mariscos/langostino.jpg", desc:"Langostinos grandes y medianos, frescos y limpios. Por kilo o balde.",              unidad:"Por kilo ",        precio:"", venta:"ambos",     destacado:false  },
    { id:"conchas",    rubro:"marino", categoria:"mariscos",   nombre:"Conchas de Abanico",     emoji:"", img:"img/mariscos/conchas_abanico.jpg", desc:"Conchas frescas directas del terminal. Ideales para ceviches y tiraditos.",         unidad:"Por docena",        precio:"", venta:"ambos",     destacado:false },
    { id:"pota",       rubro:"marino", categoria:"mariscos",   nombre:"Pota / Calamar Gigante", emoji:"", img:"img/mariscos/pota.jpg", desc:"Pota entera o en trozos. Muy usada en guisos, sudados y a la plancha.",             unidad:"Por kilo ", precio:"", venta:"mayorista", destacado:false },
    { id:"pulpo",      rubro:"marino", categoria:"mariscos",   nombre:"Pulpo Fresco",           emoji:"", img:"img/mariscos/pulpo.webp", desc:"Pulpo fresco de roca, limpio y listo para cocinar.",                               unidad:"Por kilo",                     precio:"", venta:"ambos",     destacado:false },
    { id:"cangrejo",   rubro:"marino", categoria:"mariscos",   nombre:"Cangrejo / Jaiba",       emoji:"", img:"img/mariscos/cangrejo.webp", desc:"Cangrejo fresco, ideal para parihuela y sopas marinas.",                           unidad:"Por unidad ",        precio:"", venta:"ambos",     destacado:false },
                       

    /* ── MARINO · ALGAS 
    { id:"cochayuyo",  rubro:"marino", categoria:"algas",      nombre:"Cochayuyo (Alga Seca)",  emoji:"", img:"img/pescados.jpg", desc:"Alga marina seca de alta calidad. Rica en minerales y fibra.",                    unidad:"Por 100g / Por kg",            precio:"", venta:"ambos",     destacado:false },
    ── */
    { id:"yuyo",       rubro:"marino", categoria:"algas",      nombre:"Yuyo Fresco",            emoji:"", img:"img/algas/yuyo.webp", desc:"Yuyo fresco, alga marina consumida en ensaladas y ceviches.",                     unidad:"Por manojo / Por kilo",        precio:"", venta:"minorista", destacado:false },

    /* ── MARINO · PROCESADOS ── */
    { id:"filete_corv",rubro:"marino", categoria:"procesados", nombre:"Filete de Corvina",      emoji:"", img:"img/procesados/filete_corvina.webp",   desc:"Filete limpio de corvina sin espinas, listo para cocinar. Corte profesional.",   unidad:"Por kilo",                     precio:"", venta:"ambos",     destacado:false  },
    { id:"trozos_pota",rubro:"marino", categoria:"procesados", nombre:"Trozos de Pota Limpia",  emoji:"", img:"img/procesados/trozos_pota.jpg",   desc:"Pota cortada en cubos o aros, limpia y lista para usar en la cocina.",           unidad:"Por kilo / Por bandeja",       precio:"", venta:"ambos",     destacado:false },
    { id:"corte_esp",  rubro:"marino", categoria:"procesados", nombre:"Cortes Especiales",      emoji:"", img:"img/procesados/cortes.jpg",   desc:"Servicio de corte personalizado para restaurantes y distribuidores.",             unidad:"Por kilo (mín. 5 kg)",         precio:"", venta:"mayorista", destacado:false },

    /* ── MARINO · CONGELADOS ── */
    { id:"lang_cong",  rubro:"marino", categoria:"congelados", nombre:"Langostinos Congelados", emoji:"", img:"img/congelados/conge_langostinos.jpeg", desc:"Langostinos IQF, congelados individualmente. Cadena de frío garantizada.",       unidad:"Por kilo",       precio:"", venta:"ambos",     destacado:false },
    { id:"filet_cong", rubro:"marino", categoria:"congelados", nombre:"Filete Merluza Congelado",emoji:"",img:"img/congelados/conge_filete_merluza.jpg", desc:"Filetes de merluza congelados sin espinas, empacados al vacío.",                 unidad:"Por kilo",                   precio:"", venta:"mayorista", destacado:false },
    { id:"mix_marino", rubro:"marino", categoria:"congelados", nombre:"Mix de Mariscos",        emoji:"", img:"img/congelados/mix_mariscos.jpg", desc:"Mezcla de langostinos, calamares y conchas. Ideal para arroces y pastas.",       unidad:"Por kilo",       precio:"", venta:"ambos",     destacado:false },

    /* ── AGRÍCOLA 
    { id:"papa_blanca",rubro:"agricola",categoria:"tubérculos", nombre:"Papa Blanca",           emoji:"", img:"img/pescados.jpg", desc:"Papa blanca seleccionada, ideal para sopas, guisos y frituras.",                 unidad:"Por saco (50 kg) / Por kilo",  precio:"", venta:"ambos",     destacado:true  },
    { id:"cebolla",    rubro:"agricola",categoria:"verduras",   nombre:"Cebolla Roja",          emoji:"", img:"img/pescados.jpg", desc:"Cebolla roja fresca de primera calidad, indispensable en la cocina peruana.",    unidad:"Por malla (25 kg) / Por kilo", precio:"", venta:"ambos",     destacado:false },
    { id:"tomate",     rubro:"agricola",categoria:"verduras",   nombre:"Tomate Perita",         emoji:"", img:"img/pescados.jpg", desc:"Tomate perita maduro, perfecto para salsas, ensaladas y jugos.",                 unidad:"Por caja / Por kilo",          precio:"", venta:"ambos",     destacado:false },
    { id:"limon",      rubro:"agricola",categoria:"frutas",     nombre:"Limón Sutil",           emoji:"", img:"img/pescados.jpg", desc:"Limón sutil fresco, ideal para ceviches, bebidas y aderezos.",                   unidad:"Por caja / Por kilo",          precio:"", venta:"ambos",     destacado:false },

    /* ── FERRETERÍA 
    { id:"cemento",    rubro:"ferreteria",categoria:"construccion",nombre:"Cemento Portland",   emoji:"", img:"img/pescados.jpg", desc:"Cemento Portland tipo I, bolsa 42.5 kg. Ideal para obras y reparaciones.",      unidad:"Por bolsa / Por pallet",       precio:"", venta:"mayorista", destacado:true  },
    { id:"taladro",    rubro:"ferreteria",categoria:"herramientas",nombre:"Taladro Percutor",   emoji:"", img:"img/pescados.jpg", desc:"Taladro percutor 750W con maletin y set de brocas incluido.",                    unidad:"Por unidad",                   precio:"", venta:"ambos",     destacado:false },
    { id:"pintura",    rubro:"ferreteria",categoria:"acabados",   nombre:"Pintura Látex",       emoji:"", img:"img/pescados.jpg", desc:"Pintura látex lavable colores varios, rendimiento 35 m² por galón.",             unidad:"Por galón / Por balde 5 gl",   precio:"", venta:"ambos",     destacado:false },

    /* ── ABARROTES 
    { id:"aceite",     rubro:"abarrotes",categoria:"cocina",     nombre:"Aceite Vegetal",       emoji:"", img:"img/pescados.jpg", desc:"Aceite vegetal botella 1 litro, ideal para frituras y aderezos.",               unidad:"Por botella / Caja x 12",      precio:"", venta:"ambos",     destacado:true  },
    { id:"azucar",     rubro:"abarrotes",categoria:"básicos",    nombre:"Azúcar Rubia",         emoji:"", img:"img/pescados.jpg", desc:"Azúcar rubia granulada en bolsa de 1 kg o saco de 50 kg.",                      unidad:"Por kg / Por saco (50 kg)",    precio:"", venta:"ambos",     destacado:false },
    { id:"arroz",      rubro:"abarrotes",categoria:"básicos",    nombre:"Arroz Extra",          emoji:"", img:"img/pescados.jpg", desc:"Arroz extra grano largo, bolsa 1 kg o saco 50 kg para distribución.",            unidad:"Por kg / Por saco (50 kg)",    precio:"", venta:"ambos",     destacado:false },
    ── */
  ],

};

/* ── helpers ── */
const DYR = {
  getRubro:    id => DYR_CONFIG.rubros.find(r => r.id === id),
  getProductos: rubroId => DYR_CONFIG.productos.filter(p => p.rubro === rubroId),
  getCategorias: rubroId => [...new Set(DYR_CONFIG.productos.filter(p=>p.rubro===rubroId).map(p=>p.categoria))],
  buildWspUrl: (texto) => {
    const num = DYR_CONFIG.empresa.whatsapp;
    const mob = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const enc = encodeURIComponent(texto);
    return mob ? `https://wa.me/${num}?text=${enc}` : `https://web.whatsapp.com/send?phone=${num}&text=${enc}`;
  },
};
