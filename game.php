<?php
require_once("inc/common.inc.php");

$isFastGame = $_POST['session'];
saveToSession('isFastGame', $isFastGame);

$username = getFromSession('username');
$vars = ['username'=> $username];

echo getView('game.twig.html', $vars);
