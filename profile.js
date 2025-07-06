//verificarSesion()

function actualizarPerfil() {
  let usuario = document.getElementById("usuario").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let email2 = document.getElementById("usuarioLogueado").textContent;

  //console.log(email);
  //console.log(email2);

  let registroObjeto = {
    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString(),
    usuario: usuario.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: password.trim(),
  };

  // Guardamos el nuevo perfil usando el email actual como key
  localStorage.setItem(`RRM-${registroObjeto.email}`, JSON.stringify(registroObjeto));

  // Si se cambió el email, eliminamos el perfil anterior
  if (email.toLowerCase().trim() !== email2.toLowerCase().trim()) {
    localStorage.removeItem(`RRM-${email2.toLowerCase().trim()}`);
  }

  alert("Usuario actualizado con éxito");
  window.location.href = `menu.html?email=${email}`;
}




function traerDatos(){

    let email = document.getElementById("usuarioLogueado").textContent;
    
    const perfil = localStorage.getItem(`RRM-${email.toLocaleLowerCase().trim()}`) || {};
    const usuario= JSON.parse(perfil);

   

    if (!usuario || usuario.length === 0) {
    alert("No hay usuarios registrados.");
    return;
  }
    const usuarioPerfil = usuario
    document.getElementById("usuario").value = usuarioPerfil.usuario || "No encontrado";
    document.getElementById("email").value = usuarioPerfil.email || "No encontrado";
    document.getElementById("password").value = usuarioPerfil.password || "No encontrado";
  
}

traerDatos();

