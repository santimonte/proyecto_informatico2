/* =====================================================
   Página: Menú principal (menu.html)
   Usa php/usuario.php, php/descargar.php y php/salir.php
   ===================================================== */

var mensaje = document.getElementById("mensaje");


/* ---------- Mensajes en pantalla ---------- */

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}


/* ---------- Ver menú principal (RF003) ---------- */

function mostrarDescargas(descargas) {
  var lista = document.getElementById("listaDescargas");
  lista.innerHTML = "";

  if (descargas.length === 0) {
    var vacio = document.createElement("li");
    vacio.textContent = "Todavía no descargaste el juego.";
    lista.appendChild(vacio);
    return;
  }

  for (var i = 0; i < descargas.length; i++) {
    var item = document.createElement("li");
    item.textContent = "Descarga N° " + descargas[i].id_descarga + " - " + descargas[i].fecha_descarga;
    lista.appendChild(item);
  }
}

function cargarMenu() {
  fetch("php/usuario.php")
    .then(function (respuesta) { return respuesta.json(); })
    .then(function (datos) {
      if (!datos.ok) {
        window.location.href = "index.html";
        return;
      }
      document.getElementById("bienvenida").textContent = "Bienvenido/a, " + datos.nombreUsuario;
      mostrarDescargas(datos.descargas);
    })
    .catch(function () {
      mostrarMensaje("No se pudo conectar con el servidor.", "error");
    });
}


/* ---------- Descargar archivo (RF004) ---------- */

function iniciarDescarga() {
  var enlace = document.createElement("a");
  enlace.href = "juego/DeudaPendiente.zip";
  enlace.download = "DeudaPendiente.zip";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}

function descargarJuego() {
  fetch("php/descargar.php", { method: "POST" })
    .then(function (respuesta) { return respuesta.json(); })
    .then(function (datos) {
      if (datos.ok) {
        iniciarDescarga();
        mostrarMensaje("Descarga registrada.", "ok");
        cargarMenu();
      } else {
        mostrarMensaje(datos.mensaje, "error");
      }
    })
    .catch(function () {
      mostrarMensaje("No se pudo conectar con el servidor.", "error");
    });
}


/* ---------- Cerrar sesión ---------- */

function cerrarSesion() {
  fetch("php/salir.php").then(function () {
    window.location.href = "index.html";
  });
}


/* ---------- Inicio ---------- */

document.getElementById("botonDescarga").onclick = descargarJuego;
document.getElementById("botonSalir").onclick = cerrarSesion;
cargarMenu();
