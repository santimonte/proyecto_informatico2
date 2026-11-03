<?php
/* Cerrar sesión */
require "conexion.php";

session_destroy();
responder(true, "Sesión cerrada.");
