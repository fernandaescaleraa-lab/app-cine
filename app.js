const peliculas = [
  {
    id: 1,
    titulo: "Spider-Man: No Way Home",
    genero: "Acción / Superhéroes",
    duracion: "148 min",
    imagen: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    trailerId: "JfVOs4VSpmA",
    horarios: ["15:00", "18:15", "21:30"]
  },
  {
    id: 2,
    titulo: "Deadpool & Wolverine",
    genero: "Acción / Comedia",
    duracion: "128 min",
    imagen: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    trailerId: "73_1biulkYk",
    horarios: ["16:30", "19:45", "22:45"]
  },
  {
    id: 3,
    titulo: "Intensa-Mente 2",
    genero: "Animación / Aventura",
    duracion: "96 min",
    imagen: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    trailerId: "LEjhY15eCx0",
    horarios: ["14:00", "16:15", "18:30"]
  },
  {
    id: 4,
    titulo: "Dune: Parte Dos",
    genero: "Ciencia Ficción",
    duracion: "166 min",
    imagen: "https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    trailerId: "Way9Dexny3w",
    horarios: ["17:00", "20:30"]
  },
  {
    id: 5,
    titulo: "Batman",
    genero: "Acción / Crimen",
    duracion: "176 min",
    imagen: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    trailerId: "I_aEsmZZ3b8",
    horarios: ["19:00", "22:15"]
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

// Renderizado de Tarjetas
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
