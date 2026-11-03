<?php
/* RF001 - Ingresar al sistema */
require "conexion.php";

$datoIngreso = trim($_POST["usuarioEmail"] ?? "");
$contrasena  = $_POST["contrasena"] ?? "";

if ($datoIngreso === "" || $contrasena === "") {
    responder(false, "Completá todos los campos.");
}

$consulta = $conexion->prepare(
    "SELECT * FROM usuarios WHERE nombre_usuario = ? OR email = ?"
);
$consulta->execute(array($datoIngreso, strtolower($datoIngreso)));
$usuario = $consulta->fetch(PDO::FETCH_ASSOC);

if (!$usuario || !password_verify($contrasena, $usuario["contraseña"])) {
    responder(false, "Usuario o contraseña incorrectos.");
}

$_SESSION["usuarioId"] = $usuario["id"];
responder(true, "Ingreso correcto.");
