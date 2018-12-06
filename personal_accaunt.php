<?php
require_once("inc/common.inc.php");

$buttons = array(
        'Играть', 'Таблица рекордов', 'Выход');

echo getView('personal_accaunt.html.twig', $buttons);