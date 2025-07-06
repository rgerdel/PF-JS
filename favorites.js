//verificarSesion()

const container = document.getElementById("favoritos-container");
const favoritos = JSON.parse(localStorage.getItem("favoritoRickMorty")) || [];

    async function cargarFavoritos() {
      if (favoritos.length === 0) {
        container.innerHTML = "<p>&nbsp;&nbsp;NO HAY PERSONAJES A MOSTRAR.</p>";
        return;
      }

      const requests = favoritos.map(id =>
        fetch(`https://rickandmortyapi.com/api/character/${id}`).then(res => res.json())
      );

      const personajes = await Promise.all(requests);

      personajes.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("character");
        div.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <strong>${p.name}</strong><br>
            Estado: ${p.status}<br>
            Especie: ${p.species}<br>
            Género: ${p.gender}<br>
            Ubicación: ${p.location.name}
        `;
        container.appendChild(div);
 ;
      });
    }

    cargarFavoritos();

function menu(){
  let email = document.getElementById("usuarioLogueado").textContent;
  window.location.href = `menu.html?email=${email}`;
}
