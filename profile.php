<?php

require_once("inc/common.inc.php");

$username = getFromSession('username');
$users = getUserList();


$vars = array ('username' => $username, 'friends' => $users);

echo getView('profile.html.twig', $vars);