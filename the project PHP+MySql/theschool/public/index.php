<?php
session_start();

require_once('../inc/autoload.php');

$router = new Router();
$router->go();


?>