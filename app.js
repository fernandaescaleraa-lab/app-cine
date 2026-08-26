// app.js — completo con pósters SVG embebidos + HU1, HU2, HU3 + login simulado (localStorage)

// UTIL: convierte SVG string a data URI
function svgToDataUri(svgString) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
}

/* ---------------------------
   POSTERS SVG (embebidos)
   --------------------------- */
const svgMinion = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
  <defs><linearGradient id="min-bg" x1="0" x2="1"><stop offset="0" stop-color="#FFEA3D"/><stop offset="1" stop-color="#FFD23F"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#min-bg)"/>
  <rect x="48" y="140" width="504" height="540" rx="80" fill="#FFEB59" stroke="#E0C82B" stroke-width="6"/>
  <rect x="0" y="320" width="600" height="86" fill="#222" opacity="0.12"/>
  <circle cx="300" cy="380" r="96" fill="#d1d5db"/>
  <circle cx="300" cy="380" r="66" fill="#0f1724"/>
  <circle cx="300" cy="380" r="28" fill="#fff"/>
  <path d="M240 480 q60 42 120 0" stroke="#3b3b3b" stroke-width="8" fill="none" stroke-linecap="round"/>
  <rect x="28" y="28" width="544" height="78" rx="12" fill="rgba(0,0,0,0.12)"/>
  <text x="300" y="74" font-family="Inter, Arial, sans-serif" font-size="20" fill="#0b0b0d" font-weight="800" text-anchor="middle">MINIONS &amp; MONSTRUOS</text>
  <text x="300" y="820" font-family="Inter, Arial, sans-serif" font-size="13" fill="#0b0b0d" text-anchor="middle">Animación · 1h 35m</text>
</svg>`;

const svgSpiderman = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
  <defs><linearGradient id="sp-bg" x1="0" x2="1"><stop offset="0" stop-color="#c0262a"/><stop offset="1" stop-color="#07132a"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#sp-bg)"/>
  <rect x="0" y="0" width="600" height="420" fill="#c0262a"/>
  <rect x="0" y="420" width="600" height="480" fill="#0b3b6f"/>
  <ellipse cx="300" cy="300" rx="150" ry="210" fill="#071026" opacity="0.14"/>
  <g stroke="#fff" stroke-opacity="0.12" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M300 90 v420"/><path d="M160 150 q140 70 280 0"/><path d="M120 230 q180 120 360 0"/><path d="M80 310 q200 160 440 0"/>
  </g>
  <g transform="translate(300,520)"><ellipse rx="28" ry="18" fill="#fff" opacity="0.95"/><path d="M-22 -10 L-42 -36 M22 -10 L42 -36 M-30 6 L-48 46 M30 6 L48 46" stroke="#07112a" stroke-width="6" stroke-linecap="round"/></g>
  <text x="300" y="76" font-family="Inter, Arial, sans-serif" font-size="20" fill="#fff" font-weight="800" text-anchor="middle">SPIDER-MAN: UN NUEVO DÍA</text>
  <text x="300" y="820" font-family="Inter, Arial, sans-serif" font-size="13" fill="#e6eef8" text-anchor="middle">Acción · 2h 18m</text>
</svg>`;

const svgDemonio = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
  <defs><linearGradient id="dm-bg" x1="0" x2="1"><stop offset="0" stop-color="#050507"/><stop offset="1" stop-color="#141217"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#dm-bg)"/>
  <circle cx="460" cy="140" r="64" fill="#f3f4f6" opacity="0.06"/>
  <g transform="translate(70,260)" fill="#0b0b0d">
    <polygon points="40,140 220,40 400,140" fill="#070709"/>
    <rect x="40" y="140" width="360" height="200" rx="6"/>
    <rect x="180" y="200" width="60" height="140" fill="#060606"/>
    <rect x="260" y="220" width="40" height="120" fill="#060606"/>
  </g>
  <ellipse cx="300" cy="600" rx="260" ry="80" fill="#374151" opacity="0.06"/>
  <text x="300" y="78" font-family="Georgia, serif" font-size="16" fill="#fff" font-weight="700" text-anchor="middle">LA NOCHE DEL DEMONIO</text>
  <text x="300" y="820" font-family="Inter, Arial, sans-serif" font-size="13" fill="#9aa0a6" text-anchor="middle">Terror · 1h 50m</text>
</svg>`;

const svgNarciso = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
  <defs><linearGradient id="nr-bg" x1="0" x2="1"><stop offset="0" stop-color="#0f1214"/><stop offset="1" stop-color="#241212"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#nr-bg)"/>
  <g transform="translate(110,140)">
    <ellipse cx="190" cy="230" rx="180" ry="260" fill="#0b0b0d" opacity="0.12" />
    <ellipse cx="190" cy="230" rx="160" ry="240" fill="#111827" />
    <path d="M150 320 C160 210, 260 180, 270 320 C290 400, 220 420, 180 380 Z" fill="#e6e6e6" opacity="0.14"/>
    <circle cx="190" cy="150" r="38" fill="#e6e6e6" opacity="0.18"/>
  </g>
  <rect x="28" y="28" width="544" height="78" rx="12" fill="rgba(229,169,60,0.06)"/>
  <text x="300" y="76" font-family="Georgia, serif" font-size="22" fill="#fff" font-weight="800" text-anchor="middle">YO, NARCISO</text>
  <text x="300" y="820" font-family="Inter, Arial, sans-serif" font-size="13" fill="#c7cbd1" text-anchor="middle">Drama · 1h 58m</text>
</svg>`;

/* ---------------------------
   PELÍCULAS (POSTERS = data-uri SVG)
   --------------------------- */
const peliculas = [
  { id: 1, titulo: "MINIONS & MONSTRUOS", genero: "Animación / Comedia", duracion: "1h 35m", sinopsis: "Una divertida aventura...", poster: svgToDataUri(svgMinion), horarios: ["15:00", "17:15", "19:30"] },
  { id: 2, titulo: "SPIDER-MAN: UN NUEVO DÍA", genero: "Acción / Superhéroes", duracion: "2h 18m", sinopsis: "Peter Parker enfrenta...", poster: svgToDataUri(svgSpiderman), horarios: ["16:00", "18:45", "21:30"] },
  { id: 3, titulo: "LA NOCHE DEL DEMONIO: ESTÁN ENTRE NOSOTROS", genero: "Terror / Suspenso", duracion: "1h 50m", sinopsis: "Fenómenos paranormales...", poster: svgToDataUri(svgDemonio), horarios: ["20:00", "22:15", "23:45"] },
  { id: 4, titulo: "YO, NARCISO", genero: "Drama / Thriller", duracion: "1h 58m", sinopsis: "Un retrato crudo...", poster: svgToDataUri(svgNarciso), horarios: ["17:45", "20:30", "22:45"] }
];

/* ---------------------------
   ESTADO
   --------------------------- */
let selectedMovie = null;
let selectedHorario = null;
let selectedEntradas = 1;

/* ---------------------------
   Login simple: funciones globales
   - usan localStorage 'cine_user'
   --------------------------- */
window.abrirModalLogin = function() {
  const modal = document.getElementById('modal-login');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  const input = document.getElementById('input-usuario');
  if (input) { input.disabled = false; input.focus(); input.select && input.select(); }
};

window.cerrarModalLogin = function() {
  const modal = document.getElementById('modal-login');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  const input = document.getElementById('input-usuario');
  if (input) input.value = '';
};

window.iniciarSesion = function() {
  const nombreInput = document.getElementById('input-usuario');
  if (!nombreInput) return;
  const nombre = nombreInput.value.trim();
  if (!nombre) {
    nombreInput.focus();
    return;
  }
  localStorage.setItem('cine_user', nombre);
  actualizarHeaderUser();
  window.cerrarModalLogin();
};

window.cerrarSesion = function() {
  localStorage.removeItem('cine_user');
  actualizarHeaderUser();
};

function actualizarHeaderUser() {
  const user = localStorage.getItem('cine_user');
  const headerEl = document.getElementById('user-header');
  if (!headerEl) return;
  if (user) {
    headerEl.innerHTML = `<span style="margin-right:8px;">Hola, ${escapeHtml(user)} 👋</span><button type="button" onclick="cerrarSesion()" class="login-btn">Salir</button>`;
  } else {
    headerEl.innerHTML = `<button type="button" onclick="abrirModalLogin()" class="login-btn">Iniciar sesión</button>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));
}

/* ---------------------------
   RENDER CARTELERA (HU1)
   --------------------------- */
function renderCartelera(list) {
  const container = document.getElementById('cartelera');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(pelicula => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('data-id', pelicula.id);

    const img = document.createElement('img');
    img.className = 'poster';
    img.setAttribute('src', pelicula.poster);
    img.setAttribute('alt', pelicula.titulo);
    img.setAttribute('loading', 'lazy');

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h2');
    title.className = 'title';
    title.textContent = pelicula.titulo;

    const genre = document.createElement('p');
    genre.className = 'genre';
    genre.textContent = pelicula.genero;

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `${pelicula.horarios.length} horarios`;

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.type = 'button';
    btn.textContent = 'Ver horarios';
    btn.setAttribute('data-movie-id', pelicula.id);
    btn.setAttribute('aria-label', `Ver horarios de ${pelicula.titulo}`);

    actions.appendChild(meta);
    actions.appendChild(btn);

    body.appendChild(title);
    body.appendChild(genre);
    body.appendChild(actions);

    card.appendChild(img);
    card.appendChild(body);

    container.appendChild(card);
  });
}

/* ---------------------------
   EVENT DELEGATION - abrir horarios (HU2)
   --------------------------- */
function attachCarteleraDelegation() {
  const container = document.getElementById('cartelera');
  if (!container) return;
  container.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-movie-id]');
    if (!btn || !container.contains(btn)) return;
    const movieId = Number(btn.getAttribute('data-movie-id'));
    const movie = peliculas.find(m => m.id === movieId);
    if (!movie) return;
    selectedMovie = movie;
    selectedHorario = null;
    selectedEntradas = 1;
    renderScheduleView(movie);
    container.classList.add('hidden');
  });
}

/* ---------------------------
   Schedule view, chips and selection
   --------------------------- */
function renderScheduleView(movie) {
  const sched = document.getElementById('schedule-view');
  if (!sched) return;
  sched.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'schedule-header';

  const backBtn = document.createElement('button');
  backBtn.className = 'back-btn';
  backBtn.type = 'button';
  backBtn.innerHTML = '<span class="arrow">←</span> Volver a películas';
  backBtn.addEventListener('click', () => {
    selectedMovie = null; selectedHorario = null; selectedEntradas = 1;
    sched.classList.add('hidden'); sched.innerHTML = '';
    const cart = document.getElementById('cartelera'); if (cart) cart.classList.remove('hidden');
  });

  const titles = document.createElement('div');
  titles.style.flex = '1';
  const title = document.createElement('h2'); title.className = 'schedule-title'; title.textContent = movie.titulo;
  const sub = document.createElement('p'); sub.className = 'schedule-sub'; sub.textContent = movie.genero;
  titles.appendChild(title); titles.appendChild(sub);

  header.appendChild(backBtn); header.appendChild(titles);

  const chipsWrap = document.createElement('div'); chipsWrap.className = 'chips'; chipsWrap.setAttribute('role','list');

  movie.horarios.forEach(h => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.type = 'button';
    chip.textContent = h;
    chip.setAttribute('data-horario', h);
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => {
      const chips = chipsWrap.querySelectorAll('.chip');
      chips.forEach(c => { c.classList.remove('selected'); c.setAttribute('aria-pressed','false'); });
      chip.classList.add('selected'); chip.setAttribute('aria-pressed','true');
      selectedHorario = h; selectedEntradas = 1;
      renderTicketSelector();
    });
    chipsWrap.appendChild(chip);
  });

  const ticketArea = document.createElement('div'); ticketArea.id = 'ticket-area'; ticketArea.className = 'ticket-area';
  const note = document.createElement('p'); note.className = 'schedule-note'; note.textContent = 'Seleccioná un horario para continuar.';

  sched.appendChild(header); sched.appendChild(chipsWrap); sched.appendChild(ticketArea); sched.appendChild(note);
}

/* ---------------------------
   Entradas y confirmar (HU3)
   --------------------------- */
function renderTicketSelector() {
  const ticketArea = document.getElementById('ticket-area');
  if (!ticketArea) return;
  ticketArea.innerHTML = '';

  const label = document.createElement('div'); label.textContent = 'Entradas'; label.style.fontWeight = '700'; label.style.color = 'var(--muted)';

  const ticketsWrap = document.createElement('div'); ticketsWrap.className = 'tickets';
  const counter = document.createElement('div'); counter.className = 'counter';

  const btnMinus = document.createElement('button'); btnMinus.className = 'control-btn'; btnMinus.type = 'button'; btnMinus.textContent = '−';
  btnMinus.addEventListener('click', () => { if (selectedEntradas > 1) { selectedEntradas -= 1; updateCount(); } });

  const countDisplay = document.createElement('div'); countDisplay.className = 'count-display'; countDisplay.id = 'count-display'; countDisplay.textContent = String(selectedEntradas);

  const btnPlus = document.createElement('button'); btnPlus.className = 'control-btn'; btnPlus.type = 'button'; btnPlus.textContent = '+';
  btnPlus.addEventListener('click', () => { selectedEntradas += 1; updateCount(); });

  counter.appendChild(btnMinus); counter.appendChild(countDisplay); counter.appendChild(btnPlus);
  ticketsWrap.appendChild(counter);

  const confirmBtn = document.createElement('button'); confirmBtn.className = 'confirm-btn'; confirmBtn.type = 'button'; confirmBtn.textContent = 'Confirmar reserva';
  confirmBtn.addEventListener('click', () => {
    if (!selectedMovie || !selectedHorario) return;
    const sched = document.getElementById('schedule-view');
    if (sched) { sched.classList.add('hidden'); sched.setAttribute('aria-hidden','true'); }
    renderSuccessView();
  });

  ticketArea.appendChild(label); ticketArea.appendChild(ticketsWrap); ticketArea.appendChild(confirmBtn);

  function updateCount() {
    const disp = document.getElementById('count-display');
    if (disp) disp.textContent = String(selectedEntradas);
  }
}

/* ---------------------------
   Confirmación y pantalla de éxito
   --------------------------- */
function renderSuccessView() {
  const success = document.getElementById('success-view');
  if (!success) return;
  success.innerHTML = '';
  success.classList.remove('hidden'); success.setAttribute('aria-hidden','false');

  const card = document.createElement('div'); card.className = 'success-card';
  const title = document.createElement('h3'); title.className = 'success-title'; title.textContent = 'Reserva confirmada';
  const body = document.createElement('div'); body.className = 'success-body';

  const movieLine = document.createElement('div'); movieLine.textContent = `Película: ${selectedMovie.titulo}`;
  const horarioLine = document.createElement('div'); horarioLine.textContent = `Horario: ${selectedHorario}`;
  const entradasLine = document.createElement('div'); entradasLine.textContent = `Entradas: ${selectedEntradas}`;

  body.appendChild(movieLine); body.appendChild(horarioLine); body.appendChild(entradasLine);

  const user = localStorage.getItem('cine_user');
  if (user) {
    const userLine = document.createElement('div'); userLine.textContent = `Reservado por: ${user}`; userLine.style.fontWeight = '700';
    body.appendChild(userLine);
  }

  const actions = document.createElement('div'); actions.className = 'success-actions';
  const newBtn = document.createElement('button'); newBtn.className = 'btn'; newBtn.type = 'button'; newBtn.textContent = 'Hacer otra reserva';
  newBtn.addEventListener('click', () => {
    selectedMovie = null; selectedHorario = null; selectedEntradas = 1;
    success.classList.add('hidden'); success.setAttribute('aria-hidden','true'); success.innerHTML = '';
    renderCartelera(peliculas);
    const cart = document.getElementById('cartelera'); if (cart) cart.classList.remove('hidden');
  });

  actions.appendChild(newBtn);
  card.appendChild(title); card.appendChild(body); card.appendChild(actions);
  success.appendChild(card);
  success.scrollIntoView({behavior:'smooth', block:'start'});
}

/* ---------------------------
   Inicialización
   --------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCartelera(peliculas);
  attachCarteleraDelegation();
  // init header from localStorage
  actualizarHeaderUser();
});

/* helper to keep header updated (used internally) */
function actualizarHeaderUser() {
  const user = localStorage.getItem('cine_user');
  const headerEl = document.getElementById('user-header');
  if (!headerEl) return;
  if (user) {
    headerEl.innerHTML = `<span style="margin-right:8px;">Hola, ${escapeHtml(user)} 👋</span><button type="button" onclick="cerrarSesion()" class="login-btn">Salir</button>`;
  } else {
    headerEl.innerHTML = `<button type="button" onclick="abrirModalLogin()" class="login-btn">Iniciar sesión</button>`;
  }
}

/* expose cerrarSesion for header button */
window.cerrarSesion = function() {
  localStorage.removeItem('cine_user');
  actualizarHeaderUser();
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":"&#39;"}[c]));
}
