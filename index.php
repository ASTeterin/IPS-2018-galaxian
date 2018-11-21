<?php
require_once("inc/common.inc.php");

$vars = array(
    'sidebar_hobby_items' => array(
        'Спорт', 'Кино', 'Кемпинг', 'Рыбалка'),
    'sidebar_film_items' => array(
            'Бэтмэн: Тёмный рыцарь', 'Престиж', 'Москва слезам не верит', 'Начало')
    );
echo getView('index.twig', $vars);