const peliculas = [
  {
    id: 1,
    titulo: "Spider-Man: No Way Home",
    genero: "Acción / Superhéroes",
    duracion: "2h 28m",
    sinopsis: "Peter Parker enfrenta las consecuencias de la exposición de su identidad y debe lidiar con amenazas multidimensionales mientras protege a sus seres queridos.",
    imagen: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
        <rect width="100%" height="100%" fill="#0b1220"/>
        <g transform="translate(40,110)">
          <rect width="520" height="680" rx="36" fill="#071540" stroke="#06243f" stroke-width="6"/>
          <text x="260" y="120" font-family="Inter, Arial, sans-serif" font-size="22" fill="#ffffff" font-weight="800" text-anchor="middle">SPIDER-MAN</text>
          <text x="260" y="150" font-family="Inter, Arial, sans-serif" font-size="14" fill="#9fbbe6" text-anchor="middle">NO WAY HOME</text>
          <circle cx="300" cy="360" r="110" fill="#ff3b3b" opacity="0.9" />
          <text x="300" y="365" font-family="Georgia, serif" font-size="20" fill="#08101a" font-weight="800" text-anchor="middle">🕷️</text>
          <text x="260" y="760" font-family="Inter, Arial, sans-serif" font-size="12" fill="#cfe7ff" text-anchor="middle">Acción • 2h 28m</text>
        </g>
      </svg>
    `),
    trailerId: "JfVOs4VSpmA",
    horarios: ["13:00", "16:20", "19:40"]
  },
  {
    id: 2,
    titulo: "Deadpool & Wolverine",
    genero: "Acción / Comedia",
    duracion: "2h 03m",
    sinopsis: "Deadpool y Wolverine se encuentran en una aventura violenta y explosiva llena de humor irreverente, caos y dinámicas inesperadas entre antihéroes.",
    imagen: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
        <rect width="100%" height="100%" fill="#0b0b0d"/>
        <g transform="translate(40,110)">
          <rect width="520" height="680" rx="36" fill="#200009" stroke="#3b0b12" stroke-width="6"/>
          <text x="260" y="120" font-family="Inter, Arial, sans-serif" font-size="20" fill="#ffdede" font-weight="800" text-anchor="middle">DEADPOOL &amp;</text>
          <text x="260" y="150" font-family="Inter, Arial, sans-serif" font-size="18" fill="#ffdede" text-anchor="middle">WOLVERINE</text>
          <g transform="translate(190,300)">
            <rect x="0" y="0" width="240" height="240" rx="20" fill="#ff5050" />
            <text x="120" y="140" font-size="48" font-family="Georgia, serif" fill="#2b0707" font-weight="900" text-anchor="middle">✖</text>
          </g>
          <text x="260" y="760" font-family="Inter, Arial, sans-serif" font-size="12" fill="#f6cfcf" text-anchor="middle">Acción • 2h 03m</text>
        </g>
      </svg>
    `),
    trailerId: "dQw4w9WgXcQ",
    horarios: ["14:30", "17:50", "21:10"]
  },
  {
    id: 3,
    titulo: "Intensa-Mente 2",
    genero: "Animación / Familia",
    duracion: "1h 48m",
    sinopsis: "Una nueva aventura dentro de la mente que explora emociones más complejas y el crecimiento personal a través de recuerdos y sentimientos coloridos.",
    imagen: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
        <rect width="100%" height="100%" fill="#071226"/>
        <g transform="translate(40,110)">
          <rect width="520" height="680" rx="36" fill="#0a2540" stroke="#092a4a" stroke-width="6"/>
          <text x="260" y="120" font-family="Inter, Arial, sans-serif" font-size="20" fill="#fff8d6" font-weight="800" text-anchor="middle">INTENSA-MENTE</text>
          <text x="260" y="150" font-family="Inter, Arial, sans-serif" font-size="14" fill="#ffd77a" text-anchor="middle">2</text>
          <circle cx="300" cy="380" r="90" fill="#ffcc4d" />
          <circle cx="230" cy="420" r="40" fill="#66d3ff" />
          <circle cx="370" cy="420" r="40" fill="#ff7ab6" />
          <text x="260" y="760" font-family="Inter, Arial, sans-serif" font-size="12" fill="#cfe7ff" text-anchor="middle">Animación • 1h 48m</text>
        </g>
      </svg>
    `),
    trailerId: "5PSNL1qE6VY",
    horarios: ["11:00", "13:30", "16:00"]
  },
  {
    id: 4,
    titulo: "Dune: Parte Dos",
    genero: "Ciencia ficción / Aventura",
    duracion: "2h 45m",
    sinopsis: "La épica continuación en Arrakis: alianzas, batallas y el destino del universo convergen en una historia visualmente imponente.",
    imagen: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
        <rect width="100%" height="100%" fill="#07100b"/>
        <g transform="translate(40,110)">
          <rect width="520" height="680" rx="36" fill="#1a1a12" stroke="#332b1a" stroke-width="6"/>
          <text x="260" y="120" font-family="Inter, Arial, sans-serif" font-size="18" fill="#f0e6cf" font-weight="800" text-anchor="middle">DUNE</text>
          <text x="260" y="150" font-family="Inter, Arial, sans-serif" font-size="14" fill="#d6c59f" text-anchor="middle">PARTE DOS</text>
          <rect x="150" y="300" width="300" height="160" rx="12" fill="#cc9a4d" opacity="0.9"/>
          <text x="300" y="380" font-family="Georgia, serif" font-size="40" fill="#241b0d" font-weight="900" text-anchor="middle">☼</text>
          <text x="260" y="760" font-family="Inter, Arial, sans-serif" font-size="12" fill="#e8d9b3" text-anchor="middle">Ciencia ficción • 2h 45m</text>
        </g>
      </svg>
    `),
    trailerId: "8g18jFHCLXk",
    horarios: ["12:15", "18:00", "21:45"]
  },
  {
    id: 5,
    titulo: "Batman",
    genero: "Acción / Thriller",
    duracion: "2h 56m",
    sinopsis: "Una oscura revisión del mito del caballero de la noche: misterio, corrupción en la ciudad y una investigación que desvela secretos peligrosos.",
    imagen: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
        <rect width="100%" height="100%" fill="#03040a"/>
        <g transform="translate(40,110)">
          <rect width="520" height="680" rx="36" fill="#05060b" stroke="#0b0b0b" stroke-width="6"/>
          <text x="260" y="120" font-family="Inter, Arial, sans-serif" font-size="22" fill="#f6eec9" font-weight="900" text-anchor="middle">BATMAN</text>
          <ellipse cx="300" cy="380" rx="110" ry="70" fill="#ffd54f" opacity="0.95"/>
          <text x="300" y="395" font-family="Georgia, serif" font-size="36" fill="#0b0b0b" font-weight="900" text-anchor="middle">🦇</text>
          <text x="260" y="760" font-family="Inter, Arial, sans-serif" font-size="12" fill="#dcd6ad" text-anchor="middle">Acción • 2h 56m</text>
        </g>
      </svg>
    `),
    trailerId: "z_7OV2y1Eak",
    horarios: ["15:45", "20:10", "23:30"]
  }
];


const $movies = document.getElementById('movies');

// Elementos Auth
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userLoggedBox = document.getElementById('user-logged-box');
const userGreeting = document.getElementById('user-greeting');

// Elementos Booking
const bookingModal = document.getElementById('booking-modal');
const bookingTitle = document.getElementById('booking-title');
const bookingSubtitle = document.getElementById('booking-subtitle');
const qtyInput = document.getElementById('qty');
const confirmBookingBtn = document.getElementById('confirm-booking');

let currentBooking = null;

// Funciones de Modales
function openModal(modal) {
  if (!modal) return;
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-action="close"]') || e.target.matches('[data-action="cancel"]')) {
    const modal = e.target.closest('.modal');
    if (modal) closeModal(modal);
  }
});

// Manejo de Sesión
function getUser() {
  try {
    return JSON.parse(localStorage.getItem('cineUser')) || null;
  } catch (e) { return null; }
}

function setUser(user) {
  localStorage.setItem('cineUser', JSON.stringify(user));
  updateAuthView();
}

function clearUser() {
  localStorage.removeItem('cineUser');
  updateAuthView();
}

function updateAuthView() {
  const user = getUser();
  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userLoggedBox) userLoggedBox.style.display = 'flex';
    if (userGreeting) userGreeting.textContent = user.name;
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (userLoggedBox) userLoggedBox.style.display = 'none';
    if (userGreeting) userGreeting.textContent = '';
  }
}

if (loginBtn) loginBtn.addEventListener('click', () => openModal(loginModal));
if (logoutBtn) logoutBtn.addEventListener('click', () => { clearUser(); alert('Sesión cerrada'); });

function setUserWrapper(user) {
  setUser(user);
  const ev = new Event('cine:logged-in');
  document.dispatchEvent(ev);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const uname = document.getElementById('username').value.trim();
    if (!uname) return;
    setUserWrapper({ name: uname });
    closeModal(loginModal);
  });
}

// Manejo del Trailer Modal
window.abrirTrailer = function(trailerId) {
  const modal = document.getElementById("modal-trailer");
  const iframe = document.getElementById("iframe-trailer");
  if (modal && iframe) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&rel=0`;
    modal.style.display = 'flex';
  }
};

window.cerrarTrailer = function() {
  const modal = document.getElementById("modal-trailer");
  const iframe = document.getElementById("iframe-trailer");
  if (modal && iframe) {
    iframe.src = "";
    modal.style.display = 'none';
  }
};

// Reserva
window.openBooking = function(movieId, title, time) {
  currentBooking = { movieId, title, time };
  bookingTitle.textContent = `Reservar: ${title}`;
  bookingSubtitle.textContent = `Función seleccionada: ${time} hs`;
  qtyInput.value = 1;
  openModal(bookingModal);
};

if (confirmBookingBtn) {
  confirmBookingBtn.addEventListener('click', () => {
    const user = getUser();
    if (!user) {
      closeModal(bookingModal);
      openModal(loginModal);
      return;
    }
    const qty = Math.max(1, Math.min(10, parseInt(qtyInput.value || '1', 10)));
    const reservation = {
      movieId: currentBooking.movieId,
      title: currentBooking.title,
      time: currentBooking.time,
      qty,
      user: user.name,
      createdAt: new Date().toISOString()
    };

    const prev = JSON.parse(localStorage.getItem('cineReservations') || '[]');
    prev.push(reservation);
    localStorage.setItem('cineReservations', JSON.stringify(prev));
    closeModal(bookingModal);
    alert(`¡Reserva confirmada!\nPelícula: ${reservation.title}\nHorario: ${reservation.time}\nEntradas: ${reservation.qty}`);
  });
}

// Renderizado de Tarjetas con Sinopsis
function createMovieCard(movie) {
  const card = document.createElement('article');
  card.className = 'movie-card';

  const posterWrap = document.createElement('div');
  posterWrap.className = 'poster-wrapper';
  const img = document.createElement('img');
  img.className = 'poster';
  img.src = movie.imagen;
  img.alt = movie.titulo;
  img.loading = 'lazy';
  posterWrap.appendChild(img);

  const info = document.createElement('div');
  info.className = 'movie-info';

  const title = document.createElement('h3');
  title.className = 'movie-title';
  title.textContent = movie.titulo;

  const meta = document.createElement('div');
  meta.className = 'movie-meta';
  meta.textContent = `${movie.genero} • ${movie.duracion}`;

  // Párrafo de sinopsis
  const sinopsis = document.createElement('p');
  sinopsis.className = 'movie-sinopsis';
  sinopsis.textContent = movie.sinopsis;

  const trailerBtn = document.createElement('button');
  trailerBtn.type = 'button';
  trailerBtn.className = 'btn-ver-trailer';
  trailerBtn.innerHTML = '▶ Ver Tráiler';
  trailerBtn.onclick = () => abrirTrailer(movie.trailerId);

  const showtimesList = document.createElement('ul');
  showtimesList.className = 'showtimes';
  const times = Array.isArray(movie.horarios) ? movie.horarios : [];
  times.forEach(t => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'time-badge';
    btn.type = 'button';
    btn.textContent = t;
    btn.setAttribute('data-movie-id', movie.id);
    btn.setAttribute('data-movie-title', movie.titulo);
    btn.setAttribute('data-time', t);
    li.appendChild(btn);
    showtimesList.appendChild(li);
  });

  info.appendChild(title);
  info.appendChild(meta);
  info.appendChild(sinopsis);
  info.appendChild(trailerBtn);
  info.appendChild(showtimesList);

  card.appendChild(posterWrap);
  card.appendChild(info);

  return card;
}

function renderMovies(moviesList) {
  if (!$movies) return;
  $movies.innerHTML = '';
  const fragment = document.createDocumentFragment();
  moviesList.forEach(m => fragment.appendChild(createMovieCard(m)));
  $movies.appendChild(fragment);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.time-badge');
  if (!btn) return;
  const movieId = parseInt(btn.dataset.movieId, 10);
  const title = btn.dataset.movieTitle;
  const time = btn.dataset.time;
  const user = getUser();
  if (!user) {
    openModal(loginModal);
    const onLogin = () => {
      setTimeout(() => openBooking(movieId, title, time), 150);
      document.removeEventListener('cine:logged-in', onLogin);
    };
    document.addEventListener('cine:logged-in', onLogin);
    return;
  }
  openBooking(movieId, title, time);
});

window.addEventListener('DOMContentLoaded', () => {
  updateAuthView();
  renderMovies(peliculas);
});

