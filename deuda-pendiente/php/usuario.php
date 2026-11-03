<?php
/* RF003 - Datos del usuario y sus descargas para el menú */
require "conexion.php";

$usuario = usuarioActual($conexion);

if ($usuario === null) {
    responder(false, "No hay sesión iniciada.");
}

$consulta = $conexion->prepare(
    "SELECT id_descarga, fecha_descarga FROM descargas
     WHERE usuario_id = ? ORDER BY id_descarga DESC"
);
$consulta->execute(array($usuario["id"]));

responder(true, "", array(
    "nombreUsuario" => $usuario["nombre_usuario"],
    "descargas"     => $consulta->fetchAll(PDO::FETCH_ASSOC)
));
