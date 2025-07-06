//verificarSesion()

const track = document.getElementById("carousel-track");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

let index = 0;
const slideWidth = 300;
let total = 0;
let favoritos = JSON.parse(localStorage.getItem("favoritoRickMorty")) || [];

async function cargarPersonajes() {
  let personajes = [];
  let url = "https://rickandmortyapi.com/api/character";

  // Cargar todos los personajes de todas las páginas
  while (url) {
    const res = await fetch(url);
    const data = await res.json();
    personajes = personajes.concat(data.results);
    url = data.info.next;
  }

  personajes.forEach(p => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");
    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;

    const info = document.createElement("div");
    info.classList.add("character-info");

    const favBtn = document.createElement("button");
    favBtn.innerHTML = favoritos.includes(p.id) ? "★" : "☆";
    favBtn.classList.add("favorite-btn");
    if (favoritos.includes(p.id)) favBtn.classList.add("favoritoRickMorty");

    favBtn.addEventListener("click", () => toggleFavorito(p.id, favBtn));

    info.innerHTML = `
      <strong>${p.name}</strong><br>
      Estado: ${p.status}<br>
      Especie: ${p.species}<br>
      Género: ${p.gender}<br>
      Ubicación: ${p.location.name}
    `;
    info.prepend(favBtn);
    slide.appendChild(img);
    slide.appendChild(info);
    track.appendChild(slide);
  });

  total = personajes.length;
  
}

function toggleFavorito(id, btn) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(f => f !== id);
    btn.innerHTML = "☆";
    btn.classList.remove("favoritoRickMorty");
  } else {
    favoritos.push(id);
    btn.innerHTML = "★";
    btn.classList.add("favoritoRickMorty");
  }
  localStorage.setItem("favoritoRickMorty", JSON.stringify(favoritos));
}

function moverCarrusel() {
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

btnPrev.addEventListener("click", () => {
  if (index > 0) {
    index--;
    moverCarrusel();
  }
});

btnNext.addEventListener("click", () => {
  if (index < total - 1) {
    index++;
    moverCarrusel();
  }
});

cargarPersonajes();

function menu(){
  let email = document.getElementById("usuarioLogueado").textContent;
  window.location.href = `menu.html?email=${email}`;
}

