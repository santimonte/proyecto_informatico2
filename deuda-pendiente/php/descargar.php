<?php
/* RF004 - Registrar la descarga del juego */
require "conexion.php";

$usuario = usuarioActual($conexion);

if ($usuario === null) {
    responder(false, "Tenés que ingresar para descargar el juego.");
}

$insertar = $conexion->prepare(
    "INSERT INTO descargas (usuario_id, fecha_descarga) VALUES (?, ?)"
);
$insertar->execute(array($usuario["id"], date("Y-m-d H:i:s")));

responder(true, "Descarga registrada.");
