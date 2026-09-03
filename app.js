const PRECIO_ENTRADA = 5000;

const peliculas = [
  {
    id: 1,
    titulo: "Spider-Man: No Way Home",
    genero: "Acción / Superhéroes",
    duracion: "148 min",
    sinopsis: "Tras revelarse su identidad secreta, Peter Parker recurre al Doctor Strange para restaurar su anonimato, pero el hechizo fractura el multiverso liberando a peligrosos villanos.",
    imagen: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    trailerId: "JfVOs4VSpmA",
    horarios: ["15:00", "18:15", "21:30"]
  },
  {
    id: 2,
    titulo: "Deadpool & Wolverine",
    genero: "Acción / Comedia",
    duracion: "128 min",
    sinopsis: "Wade Wilson lleva una vida tranquila hasta que la Time Variance Authority lo recluta para una misión existencial que lo obligará a formar una dupla explosiva con Wolverine.",
    imagen: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    trailerId: "73_1biulkYk",
    horarios: ["16:30", "19:45", "22:45"]
  },
  {
    id: 3,
    titulo: "Intensa-Mente 2",
    genero: "Animación / Aventura",
    duracion: "96 min",
    sinopsis: "Riley entra en la adolescencia y el cuartel general experimenta una repentina demolición para dar lugar a nuevas emociones inesperadas, lideradas por Ansiedad.",
    imagen: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    trailerId: "LEjhY15eCx0",
    horarios: ["14:00", "16:15", "18:30"]
  },
  {
    id: 4,
    titulo: "Dune: Parte Dos",
    genero: "Ciencia Ficción",
    duracion: "166 min",
    sinopsis: "Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia, enfrentando una difícil elección para evitar un futuro trágico.",
    imagen: "https://image.tmdb.org/t/p/w500/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    trailerId: "Way9Dexny3w",
    horarios: ["17:00", "20:30"]
  },
  {
    id: 5,
    titulo: "Batman",
    genero: "Acción / Crimen",
    duracion: "176 min",
    sinopsis: "En su segundo año luchando contra el crimen, Batman persigue al asesino serial Riddler, desentrañando una oscura red de corrupción ligada al pasado de Gotham y de su propia familia.",
    imagen: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    trailerId: "I_aEsmZZ3b8",
    horarios: ["19:00", "22:15"]
  }
];

const $movies = document.getElementById('movies');

// Auth elements
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userLoggedBox = document.getElementById('user-logged-box');
const userGreeting = document.getElementById('user-greeting');

// Butacas elements
const modalButacas = document.getElementById('modal-butacas');
const salaGrid = document.getElementById('sala-grid');
const resPelicula = document.getElementById('res-pelicula');
const resFuncion = document.getElementById('res-funcion');
const resAsientosLista = document.getElementById('res-asientos-lista');
const resCantidad = document.getElementById('res-cantidad');
const resTotal = document.getElementById('res-total');

let reservaActual = null;

// --- AUTH & STORAGE ---
function getUser() {
  try { return JSON.parse(localStorage.getItem('cineUser')) || null; }
  catch (e) { return null; }
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

if (loginBtn) loginBtn.addEventListener('click', () => loginModal.style.display = 'block');
if (logoutBtn) logoutBtn.addEventListener('click', () => { clearUser(); alert('Sesión cerrada'); });

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const uname = document.getElementById('username').value.trim();
    if (!uname) return;
    setUser({ name: uname });
    loginModal.style.display = 'none';
    if (reservaActual) {
      modalButacas.style.display = 'flex';
    }
  });
}

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-action="close"]') || e.target.matches('[data-action="cancel"]')) {
    loginModal.style.display = 'none';
  }
});

// --- TRAILER MODAL ---
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

// --- LOGICA DE BUTACAS ---
const FILAS = ['A', 'B', 'C', 'D', 'E'];
const COLUMNAS = [1, 2, 3, 4, 5, 6, 7, 8];

function getOcupadas(movieId, time) {
  const key = `ocupadas_${movieId}_${time}`;
  let ocupadas = JSON.parse(localStorage.getItem(key));
  if (!ocupadas) {
    ocupadas = ['A2', 'A3', 'B1', 'B5', 'C3', 'C7', 'D4', 'E2'];
    localStorage.setItem(key, JSON.stringify(ocupadas));
  }
  return ocupadas;
}

window.abrirButacas = function(movieId, title, time) {
  const user = getUser();
  if (!user) {
    reservaActual = { movieId, title, time, butacas: [] };
    loginModal.style.display = 'block';
    return;
  }

  reservaActual = { movieId, title, time, butacas: [] };
  resPelicula.textContent = title;
  resFuncion.textContent = `${time} hs`;
  actualizarResumen();

  dibujarSala(movieId, time);
  modalButacas.style.display = 'flex';
};

window.cerrarButacas = function() {
  modalButacas.style.display = 'none';
  reservaActual = null;
};

function dibujarSala(movieId, time) {
  salaGrid.innerHTML = '';
  const ocupadas = getOcupadas(movieId, time);

  FILAS.forEach(fila => {
    const filaDiv = document.createElement('div');
    filaDiv.className = 'fila-asientos';

    const labelIzq = document.createElement('span');
    labelIzq.className = 'fila-label';
    labelIzq.textContent = fila;
    filaDiv.appendChild(labelIzq);

    COLUMNAS.forEach(col => {
      if (col === 5) {
        const pasillo = document.createElement('span');
        pasillo.className = 'pasillo';
        pasillo.textContent = 'PASILLO';
        filaDiv.appendChild(pasillo);
      }

      const asientoId = `${fila}${col}`;
      const btnAsiento = document.createElement('button');
      btnAsiento.type = 'button';
      btnAsiento.className = 'butaca';
      btnAsiento.dataset.id = asientoId;

      if (ocupadas.includes(asientoId)) {
        btnAsiento.classList.add('ocupada');
        btnAsiento.textContent = '✕';
        btnAsiento.disabled = true;
      } else {
        btnAsiento.textContent = asientoId;
        btnAsiento.onclick = () => toggleButaca(asientoId, btnAsiento);
      }

      filaDiv.appendChild(btnAsiento);
    });

    const labelDer = document.createElement('span');
    labelDer.className = 'fila-label';
    labelDer.textContent = fila;
    filaDiv.appendChild(labelDer);

    salaGrid.appendChild(filaDiv);
  });
}

function toggleButaca(id, elemento) {
  const index = reservaActual.butacas.indexOf(id);
  if (index > -1) {
    reservaActual.butacas.splice(index, 1);
    elemento.classList.remove('seleccionada');
  } else {
    reservaActual.butacas.push(id);
    elemento.classList.add('seleccionada');
  }
  actualizarResumen();
}

function actualizarResumen() {
  const cant = reservaActual.butacas.length;
  if (cant === 0) {
    resAsientosLista.textContent = 'Ninguna seleccionada';
    resCantidad.textContent = '0 butacas seleccionadas';
  } else {
    resAsientosLista.textContent = reservaActual.butacas.sort().join(', ');
    resCantidad.textContent = `${cant} butaca${cant > 1 ? 's' : ''} seleccionada${cant > 1 ? 's' : ''}`;
  }
  resTotal.textContent = `$${(cant * PRECIO_ENTRADA).toLocaleString('es-AR')}`;
}

window.confirmarCompra = function() {
  if (!reservaActual || reservaActual.butacas.length === 0) {
    alert('Por favor, seleccioná al menos una butaca.');
    return;
  }

  const user = getUser();
  const total = reservaActual.butacas.length * PRECIO_ENTRADA;
  const nuevaReserva = {
    usuario: user.name,
    pelicula: reservaActual.title,
    horario: reservaActual.time,
    butacas: [...reservaActual.butacas],
    total: total,
    fecha: new Date().toLocaleDateString('es-AR')
  };

  const reservas = JSON.parse(localStorage.getItem('cineReservations') || '[]');
  reservas.push(nuevaReserva);
  localStorage.setItem('cineReservations', JSON.stringify(reservas));

  const key = `ocupadas_${reservaActual.movieId}_${reservaActual.time}`;
  const ocupadas = getOcupadas(reservaActual.movieId, reservaActual.time);
  localStorage.setItem(key, JSON.stringify([...ocupadas, ...reservaActual.butacas]));

  alert(`¡Reserva confirmada con éxito!\n\nPelícula: ${nuevaReserva.pelicula}\nHorario: ${nuevaReserva.horario}\nButacas: ${nuevaReserva.butacas.join(', ')}\nTotal: $${total.toLocaleString('es-AR')}`);

  cerrarButacas();
};

// --- RENDERIZADO CARTELERA ---
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
    btn.onclick = () => abrirButacas(movie.id, movie.titulo, t);
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

window.addEventListener('DOMContentLoaded', () => {
  updateAuthView();
  renderMovies(peliculas);
});
