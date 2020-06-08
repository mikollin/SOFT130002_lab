<?php
session_start();
unset($_SESSION['Username']);
header("Location: ".$_SERVER['HTTP_REFERER']);

//setcookie("Username", "", -1);
//header("Location: " . $_SERVER['HTTP_REFERER']);

?>