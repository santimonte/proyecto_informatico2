/* =====================================================
   Página: Ingresar (index.html)
   Envía los datos a php/ingresar.php
   ===================================================== */

var formulario = document.getElementById("formIngreso");
var mensaje = document.getElementById("mensaje");


/* ---------- Mensajes en pantalla ---------- */

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}


/* ---------- Ingresar al sistema (RF001) ---------- */

function ingresar(evento) {
  evento.preventDefault();

  var datoIngreso = document.getElementById("usuarioEmail").value.trim();
  var contrasena = document.getElementById("contrasena").value;

  if (datoIngreso === "" || contrasena === "") {
    mostrarMensaje("Completá todos los campos.", "error");
    return;
  }

  fetch("php/ingresar.php", { method: "POST", body: new FormData(formulario) })
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

formulario.onsubmit = ingresar;
