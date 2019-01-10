<?php
require_once("inc/common.inc.php");

$username = getFromSession('username');
$vars = ['username'=> $username];

echo getView('game.twig.html', $vars);
