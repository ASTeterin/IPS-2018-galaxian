<?php
require_once("inc/common.inc.php");

$username = getFromSession('username');

$buttons = array(
        'Играть', 'Таблица рекордов', 'Выход');

$params = array('buttons' => $buttons, 'username' => $username);



echo getView('personal_accaunt.html.twig', $params);