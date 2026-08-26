// app.js — Renderiza películas y horarios de forma responsiva
// Incluye: login modal (localStorage) y booking modal con selección de cantidad y confirmación

const sampleMovies = [
  {
    id: 1,
    title: 'La Aventura en Azul',
    poster: 'https://picsum.photos/id/1015/600/400',
    duration: '1h 45m',
    showtimes: ['10:00', '12:30', '15:00', '17:30', '20:00']
  },
  {
    id: 2,
    title: 'Noche de Estrellas',
    poster: 'https://picsum.photos/id/1003/600/400',
    duration: '2h 10m',
    showtimes: ['11:15', '13:45', '16:15', '19:00']
  },
  {
    id: 3,
    title: 'Comedia en la Ciudad',
    poster: 'https://picsum.photos/id/1011/600/400',
    duration: '1h 30m',
    showtimes: ['09:30', '11:50', '14:20', '16:50', '19:20', '21:40']
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

function handleModalClicks(e){
  const action = e.target.dataset.action;
  if(action === 'close' || action === 'cancel'){
    const modal = e.target.closest('.modal');
    closeModal(modal);
  }
}

// Delegar cierre en backdrop y botones con data-action
document.addEventListener('click', (e)=>{
  if(e.target.matches('[data-action="close"]') || e.target.matches('[data-action="cancel"]')){
    const modal = e.target.closest('.modal');
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

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const uname = document.getElementById('username').value.trim();
  if(!uname) return;
  setUser({name: uname});
  closeModal(loginModal);
});

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
    // si no está logueado, pedimos login primero
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
  // Guardar en localStorage
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
  img.src = movie.poster;
  img.alt = movie.title + ' — póster';
  img.loading = 'lazy';
  posterWrap.appendChild(img);

  const info = document.createElement('div');
  info.className = 'movie-info';

  const title = document.createElement('h2');
  title.className = 'movie-title';
  title.textContent = movie.title;

  const meta = document.createElement('div');
  meta.className = 'movie-meta';
  meta.textContent = movie.duration || '';

  const showtimesList = document.createElement('ul');
  showtimesList.className = 'showtimes';
  const times = Array.isArray(movie.showtimes) ? movie.showtimes : [];
  times.forEach(t =>{
    const li = document.createElement('li');
    // Crear botón para cada horario para permitir interacción
    const btn = document.createElement('button');
    btn.className = 'time-badge';
    btn.type = 'button';
    btn.textContent = t;
    btn.setAttribute('data-movie-id', movie.id);
    btn.setAttribute('data-movie-title', movie.title);
    btn.setAttribute('data-time', t);
    // Accesibilidad
    btn.setAttribute('aria-label', `Reservar ${movie.title} a las ${t}`);
    li.appendChild(btn);
    showtimesList.appendChild(li);
  });

  info.appendChild(title);
  info.appendChild(meta);
  info.appendChild(showtimesList);

  card.appendChild(posterWrap);
  card.appendChild(info);

  return card;
}

function renderMovies(movies){
  $movies.innerHTML = '';
  if(!movies || movies.length === 0){
    $movies.innerHTML = '<p>No hay películas disponibles.</p>';
    return;
  }
  const fragment = document.createDocumentFragment();
  movies.forEach(m => fragment.appendChild(createMovieCard(m)));
  $movies.appendChild(fragment);
}

// Delegación para clicks en botones de showtime
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.time-badge');
  if(!btn) return;
  const movieId = parseInt(btn.dataset.movieId,10);
  const title = btn.dataset.movieTitle;
  const time = btn.dataset.time;
  const user = getUser();
  if(!user){
    // abrir modal de login y, al cerrar, volver a abrir booking (flujo simplificado)
    openModal(loginModal);
    // Al iniciar sesión, abrimos automáticamente el booking para la función que se intentó
    // Para implementarlo, añadimos un listener temporal
    const onLogin = ()=>{
      // esperar un tick para permitir que el loginModal cierre
      setTimeout(()=> openBooking(movieId, title, time), 150);
      document.removeEventListener('cine:logged-in', onLogin);
    };
    document.addEventListener('cine:logged-in', onLogin);
    return;
  }
  openBooking(movieId, title, time);
});

// Emitir un evento custom cuando el usuario inicia sesión para flujos dependientes
const originalSetUser = setUser;
function setUserWrapper(user){
  originalSetUser(user);
  const ev = new Event('cine:logged-in');
  document.dispatchEvent(ev);
}
// Rebind setUser used by loginForm
// Replace with wrapper
window.setUser = setUserWrapper;

// But ensure updateAuthView uses the same storage
// We'll also override the login form handler to call wrapper
loginForm.removeEventListener && loginForm.removeEventListener('submit', ()=>{});
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const uname = document.getElementById('username').value.trim();
  if(!uname) return;
  setUserWrapper({name: uname});
  closeModal(loginModal);
});

async function loadMovies(){
  try{
    const resp = await fetch('/movies.json', {cache: 'no-store'});
    if(!resp.ok) throw new Error('No hay movies.json');
    const data = await resp.json();
    if(Array.isArray(data) && data.length) renderMovies(data);
    else renderMovies(sampleMovies);
  }catch(e){
    renderMovies(sampleMovies);
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  updateAuthView();
  loadMovies();
});
