// app.js — Renderiza películas y horarios de forma responsiva con trailers y posters
// Incluye: login modal (localStorage), booking modal y modal de trailer

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

// --- Modales y auth ---
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userGreeting = document.getElementById('user-greeting');

const bookingModal = document.getElementById('booking-modal');
const bookingTitle = document.getElementById('booking-title');
const bookingSubtitle = document.getElementById('booking-subtitle');
const qtyInput = document.getElementById('qty');
const confirmBookingBtn = document.getElementById('confirm-booking');

let currentBooking = null; // {movieId, title, time}

function openModal(modal){
  if(!modal) return;
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden','false');
}

function closeModal(modal){
  if(!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
}

// Delegar cierre en backdrop y botones con data-action
document.addEventListener('click', (e)=>{
  if(e.target.matches('[data-action="close"]') || e.target.matches('[data-action="cancel"]')){
    const modal = e.target.closest('.modal') || e.target.closest('.modal-overlay');
    if(modal) closeModal(modal);
  }
});

// Auth
function getUser(){
  try{
    return JSON.parse(localStorage.getItem('cineUser')) || null;
  }catch(e){return null}
}

function setUser(user){
  localStorage.setItem('cineUser', JSON.stringify(user));
  updateAuthView();
}

function clearUser(){
  localStorage.removeItem('cineUser');
  updateAuthView();
}

function updateAuthView(){
  const user = getUser();
  if(user){
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    userGreeting.style.display = 'inline-block';
    userGreeting.textContent = user.name;
  }else{
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    userGreeting.style.display = 'none';
    userGreeting.textContent = '';
  }
}

loginBtn.addEventListener('click', ()=> openModal(loginModal));
logoutBtn.addEventListener('click', ()=> { clearUser(); alert('Sesión cerrada'); });

function setUserWrapper(user){
  setUser(user);
  const ev = new Event('cine:logged-in');
  document.dispatchEvent(ev);
}

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const uname = document.getElementById('username').value.trim();
  if(!uname) return;
  setUserWrapper({name: uname});
  closeModal(loginModal);
});

// --- Manejo del Trailer ---
window.abrirTrailer = function(trailerId) {
  const modal = document.getElementById("modal-trailer");
  const iframe = document.getElementById("iframe-trailer");
  if(modal && iframe){
    iframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1`;
    modal.classList.remove("hidden");
    modal.style.display = 'flex';
  }
};

window.cerrarTrailer = function() {
  const modal = document.getElementById("modal-trailer");
  const iframe = document.getElementById("iframe-trailer");
  if(modal && iframe){
    iframe.src = "";
    modal.classList.add("hidden");
    modal.style.display = 'none';
  }
};

// --- Booking flow ---
function openBooking(movieId, title, time){
  currentBooking = {movieId, title, time};
  bookingTitle.textContent = `Reservar: ${title}`;
  bookingSubtitle.textContent = `Función: ${time}`;
  qtyInput.value = 1;
  openModal(bookingModal);
}

confirmBookingBtn.addEventListener('click', ()=>{
  const user = getUser();
  if(!user){
    closeModal(bookingModal);
    openModal(loginModal);
    return;
  }
  const qty = Math.max(1, Math.min(10, parseInt(qtyInput.value || '1',10)));
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
  alert(`Reserva confirmada para ${reservation.title} — ${reservation.time} (x${reservation.qty})`);
});

// --- Movies rendering ---
function createMovieCard(movie){
  const card = document.createElement('article');
  card.className = 'movie-card';
  card.setAttribute('data-id', movie.id);

  const posterWrap = document.createElement('div');
  posterWrap.className = 'poster-wrapper';
  const img = document.createElement('img');
  img.className = 'poster';
  img.src = movie.imagen;
  img.alt = movie.titulo + ' — póster';
  img.loading = 'lazy';
  posterWrap.appendChild(img);

  const info = document.createElement('div');
  info.className = 'movie-info';

  const title = document.createElement('h2');
  title.className = 'movie-title';
  title.textContent = movie.titulo;

  const meta = document.createElement('div');
  meta.className = 'movie-meta';
  meta.textContent = `${movie.genero} • ${movie.duracion}`;

  // Botón para ver el trailer
  const trailerBtn = document.createElement('button');
  trailerBtn.type = 'button';
  trailerBtn.className = 'btn-ver-trailer';
  trailerBtn.innerHTML = '▶ Ver Tráiler';
  trailerBtn.onclick = () => abrirTrailer(movie.trailerId);

  const showtimesList = document.createElement('ul');
  showtimesList.className = 'showtimes';
  const times = Array.isArray(movie.horarios) ? movie.horarios : [];
  times.forEach(t =>{
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'time-badge';
    btn.type = 'button';
    btn.textContent = t;
    btn.setAttribute('data-movie-id', movie.id);
    btn.setAttribute('data-movie-title', movie.titulo);
    btn.setAttribute('data-time', t);
    btn.setAttribute('aria-label', `Reservar ${movie.titulo} a las ${t}`);
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

function renderMovies(moviesList){
  if(!$movies) return;
  $movies.innerHTML = '';
  if(!moviesList || moviesList.length === 0){
    $movies.innerHTML = '<p>No hay películas disponibles.</p>';
    return;
  }
  const fragment = document.createDocumentFragment();
  moviesList.forEach(m => fragment.appendChild(createMovieCard(m)));
  $movies.appendChild(fragment);
}

// Delegación para clicks en horarios
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.time-badge');
  if(!btn) return;
  const movieId = parseInt(btn.dataset.movieId,10);
  const title = btn.dataset.movieTitle;
  const time = btn.dataset.time;
  const user = getUser();
  if(!user){
    openModal(loginModal);
    const onLogin = ()=>{
      setTimeout(()=> openBooking(movieId, title, time), 150);
      document.removeEventListener('cine:logged-in', onLogin);
    };
    document.addEventListener('cine:logged-in', onLogin);
    return;
  }
  openBooking(movieId, title, time);
});

window.addEventListener('DOMContentLoaded', ()=>{
  updateAuthView();
  renderMovies(peliculas);
});
