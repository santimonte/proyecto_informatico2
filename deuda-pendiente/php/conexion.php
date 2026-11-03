<?php
/* =====================================================
   Conexión a la base de datos "deuda_pendiente"
   (XAMPP: usuario root sin contraseña por defecto).
   Todos los archivos PHP incluyen este archivo.
   ===================================================== */

$servidor  = "localhost";
$baseDatos = "deuda_pendiente";
$usuarioBD = "root";
$claveBD   = "";

date_default_timezone_set("America/Argentina/Buenos_Aires");
session_start();
header("Content-Type: application/json; charset=utf-8");

try {
    $conexion = new PDO(
        "mysql:host=$servidor;dbname=$baseDatos;charset=utf8mb4",
        $usuarioBD,
        $claveBD
    );
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $error) {
    responder(false, "No se pudo conectar con la base de datos.");
}

/* Envía la respuesta al navegador y corta la ejecución */
function responder($ok, $mensaje, $extra = array()) {
    $respuesta = array_merge(array("ok" => $ok, "mensaje" => $mensaje), $extra);
    echo json_encode($respuesta);
    exit;
}

/* Devuelve el usuario que inició sesión (o null) */
function usuarioActual($conexion) {
    if (!isset($_SESSION["usuarioId"])) {
        return null;
    }
    $consulta = $conexion->prepare("SELECT * FROM usuarios WHERE id = ?");
    $consulta->execute(array($_SESSION["usuarioId"]));
    $usuario = $consulta->fetch(PDO::FETCH_ASSOC);
    return $usuario ? $usuario : null;
}
