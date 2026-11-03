<?php
/* RF002 - Registrar usuario */
require "conexion.php";

$nombre        = trim($_POST["nombre"] ?? "");
$apellido      = trim($_POST["apellido"] ?? "");
$nombreUsuario = trim($_POST["nombreUsuario"] ?? "");
$email         = strtolower(trim($_POST["email"] ?? ""));
$contrasena    = $_POST["contrasena"] ?? "";
$contrasena2   = $_POST["contrasena2"] ?? "";

if ($nombre === "" || $apellido === "" || $nombreUsuario === "" || $email === "" || $contrasena === "") {
    responder(false, "Completá todos los campos.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(false, "El email ingresado no es válido.");
}

if ($contrasena !== $contrasena2) {
    responder(false, "Las contraseñas no coinciden.");
}

/* El email no puede estar en uso */
$consulta = $conexion->prepare("SELECT id FROM usuarios WHERE email = ?");
$consulta->execute(array($email));
if ($consulta->fetch()) {
    responder(false, "Ese email ya está en uso.");
}

/* El nombre de usuario tampoco puede repetirse */
$consulta = $conexion->prepare("SELECT id FROM usuarios WHERE nombre_usuario = ?");
$consulta->execute(array($nombreUsuario));
if ($consulta->fetch()) {
    responder(false, "Ese nombre de usuario ya está en uso.");
}

/* La contraseña se guarda cifrada */
$contrasenaCifrada = password_hash($contrasena, PASSWORD_DEFAULT);

$insertar = $conexion->prepare(
    "INSERT INTO usuarios (nombre, apellido, nombre_usuario, email, `contraseña`, fecha_registro)
     VALUES (?, ?, ?, ?, ?, ?)"
);
$insertar->execute(array(
    $nombre, $apellido, $nombreUsuario, $email, $contrasenaCifrada, date("Y-m-d H:i:s")
));

$_SESSION["usuarioId"] = $conexion->lastInsertId();
responder(true, "Cuenta creada.");
