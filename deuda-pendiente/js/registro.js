/* =====================================================
   Página: Registro (registro.html)
   Envía los datos a php/registrar.php
   ===================================================== */

var formulario = document.getElementById("formRegistro");
var mensaje = document.getElementById("mensaje");


/* ---------- Mensajes en pantalla ---------- */

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}


/* ---------- Validaciones ---------- */

function emailValido(email) {
  return email.indexOf("@") > 0 && email.indexOf(".") > email.indexOf("@");
}


/* ---------- Registrar usuario (RF002) ---------- */

function registrar(evento) {
  evento.preventDefault();

  var nombre = document.getElementById("nombre").value.trim();
  var apellido = document.getElementById("apellido").value.trim();
  var nombreUsuario = document.getElementById("nombreUsuario").value.trim();
  var email = document.getElementById("email").value.trim();
  var contrasena = document.getElementById("contrasena").value;
  var contrasena2 = document.getElementById("contrasena2").value;

  if (nombre === "" || apellido === "" || nombreUsuario === "" || email === "" || contrasena === "") {
    mostrarMensaje("Completá todos los campos.", "error");
    return;
  }

  if (!emailValido(email)) {
    mostrarMensaje("El email ingresado no es válido.", "error");
    return;
  }

  if (contrasena !== contrasena2) {
    mostrarMensaje("Las contraseñas no coinciden.", "error");
    return;
  }

  fetch("php/registrar.php", { method: "POST", body: new FormData(formulario) })
    .then(function (respuesta) { return respuesta.json(); })
    .then(function (datos) {
      if (datos.ok) {
        window.location.href = "menu.html";
      } else {
        mostrarMensaje(datos.mensaje, "error");
      }
    })
    .catch(function () {
      mostrarMensaje("No se pudo conectar con el servidor.", "error");
    });
}


/* ---------- Inicio ---------- */

formulario.onsubmit = registrar;
