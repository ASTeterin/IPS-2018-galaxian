<?php
require_once("inc/common.inc.php");

function getTopResult() {
    $getTopResultQueryString = "SELECT * FROM result";
}

$vars = array('records' => array(
    array('position'=> '1', 'name' => 'Mark', 'score' => 500), 
    array('position'=> '2', 'name' => 'John', 'score' => 400), 
    array('position'=> '3', 'name' => 'Bill', 'score' => 390), 
    array('position'=> '4', 'name' => 'Bill', 'score' => 350), 
    array('position'=> '5', 'name' => 'Bill', 'score' => 330), 
    array('position'=> '6', 'name' => 'Bill', 'score' => 320), 
    array('position'=> '7', 'name' => 'Bill', 'score' => 300), 
    array('position'=> '8', 'name' => 'Bill', 'score' => 90), 
    array('position'=> '9', 'name' => 'Bill', 'score' => 10), 
    ));
echo getView('records.html.twig', $vars);