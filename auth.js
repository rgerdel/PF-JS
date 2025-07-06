// Esperar a que cargue la página por completo
document.addEventListener('DOMContentLoaded', () =>
{

  // Manejar submit registro
  document.getElementById('formulario_registro').addEventListener('submit', function(e) {
    e.preventDefault();
// evitar que el formulario recargue la página
    registrar_usuario();
  });

  // Manejar submit inicio sesion
  document.getElementById('formulario_inicio').addEventListener('submit', function(e) {
    e.preventDefault();
// evitar recarga
    iniciarSesion();
  });
}); 
 
 
 
 function registrar_usuario() {
  //Paso los valores del formulario de registro
  let usuario = document.getElementById("usuario").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log("prueba")   
  console.log(usuario)
  console.log(email)
  console.log(password)
  //let confirmPassword = document.getElementById("confirmPassword").value;
  let usuarioRegex = /^[a-zA-Z0-9_-]{3,}$/;
  let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/;
  //let usuarios = localStorage.getItem("usuarios") || [];
  let error = true;

  //  console.log("prueba")   
  //  console.log(usuario)
  //  console.log(email)
  //  console.log(password)
  //  console.log(error)
   //Valido que el campo usuario no este el blanco
   if (usuario === "") {
      alert("El usuario no puede estar vacío.");
      error = false;
     } else if (!usuarioRegex.test(usuario)) {    //Valido que el campo usuario sea mayor a 3 caracteres
       alert("El usuario debe tener al menos 3 caracteres y solo puede contener letras, números, guiones bajos y guiones.");
       error = false;
    } else  {
       error = true;
    }

   if (email === "") {
      alert("El email no puede estar vacío.");
      error = false;
    } else if  (!emailRegex.test(email)) {
       alert("El email no es válido.");
      error = false;
    } else {
       error = true;
   }

   if (password === "") {
      alert("La contraseña no puede estar vacía.");
      error = false;
    } //else if (!passwordRegex.test(password)) {
   //    alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.");
   //    error = false;
   // } else {
   //    error = true;
   // }
   

if (error) {
   console.log("error")
   let registroObjeto = {
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        usuario: usuario.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password: password.trim(),
   };
   //Guardo los datos del registro en un array en el localstorage
   //let registroRickMorty = [];

    //registroRickMorty.push(registroObjeto)
    //Almacena los datos (key como llave unica, los datos tomados de registroObjeto)
     localStorage.setItem(`RRM-${registroObjeto.email}`, JSON.stringify(registroObjeto));
    alert("Usuario registrado con éxito")
    document.getElementById('formulario_registro').reset();
}
}

function iniciarSesion() {
  const email = document.getElementById("emailIS").value.trim().toLowerCase();
  const password= document.getElementById("passwordIS").value.trim();

  const usuarioStr = localStorage.getItem(`RRM-${email}`);
  if (!usuarioStr) {
    alert("Email o contraseña incorrectos");
    return;
  }

  const usuarioObj = JSON.parse(usuarioStr);

  if (usuarioObj.password === password &&
usuarioObj.email === email) {
    sessionStorage.setItem("usuarioLogueado", email);
    window.location.href = `menu.html?email=${encodeURIComponent(email)}`;
  } else {
    alert("Email o contraseña incorrectos");
  }
  document.getElementById('formulario_inicio').reset();
}


function salir_logout() {
  // Obtener email que está guardado como valor bajo la clave fija "usuarioLogueado"
  const emailSesion = sessionStorage.getItem("usuarioLogueado");

  if (!emailSesion) {
    alert("No hay un usuario conectado. Por favor, ingrese nuevamente");
    window.location.href = "index.html";
    return;
  }

  // Limpiar la sesión
  sessionStorage.removeItem("usuarioLogueado");
  alert("Saliendo de Rick and Morty... ¡Adiós!");
  window.location.href = "index.html";
}


function personajes(){
  let email = document.getElementById("usuarioLogueado").textContent;
  window.location.href = `characters.html?email=${email}`;
}

function favoritos(){
  let email = document.getElementById("usuarioLogueado").textContent;
  window.location.href = `favorites.html?email=${email}`;
}

function menu(){
  let email = document.getElementById("usuarioLogueado").textContent;
  window.location.href = `menu.html?email=${email}`;
}

function perfil(){
  let email = document.getElementById("usuarioLogueado").textContent;
  window.location.href = `profile.html?email=${email}`;
}

function verificarSesion (){
    const emailSesion = sessionStorage.getItem("usuarioLogueado");

  if (!emailSesion) {
    alert("No hay un usuario conectado. Por favor, ingrese nuevamente");
    window.location.href = "index.html";
    return;
  }
}