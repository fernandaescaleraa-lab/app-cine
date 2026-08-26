// app.js — Renderiza películas y horarios de forma responsiva

// Intentamos cargar datos desde /movies.json si existe; si no, usamos datos de ejemplo.
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
  // Aseguramos que showtimes sea un array de strings
  const times = Array.isArray(movie.showtimes) ? movie.showtimes : [];
  times.forEach(t =>{
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'time-badge';
    span.textContent = t;
    li.appendChild(span);
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

async function loadMovies(){
  try{
    const resp = await fetch('/movies.json', {cache: 'no-store'});
    if(!resp.ok) throw new Error('No hay movies.json');
    const data = await resp.json();
    if(Array.isArray(data) && data.length) renderMovies(data);
    else renderMovies(sampleMovies);
  }catch(e){
    // fallback a datos de ejemplo si no hay endpoint o hay error
    renderMovies(sampleMovies);
  }
}

window.addEventListener('DOMContentLoaded', loadMovies);
