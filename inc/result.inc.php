<?php

require_once("common.inc.php");

function saveScore($name, $score)
{
    $userID = getUserIdByName($name)[0]['user_id'];
    $saveScoreQueryString = "INSERT INTO " . RESULT_TABLE . " (user_id, game_date, scores) 
    VALUES ('" . dbQuote($userID) . "', '" . date("Y-m-d") . "', '" . dbQuote($score) .  "')";
    echo $saveScoreQueryString;
    dbQuery($saveScoreQueryString);
    return dbGetLastInsertId();
}

$score = isset($_POST['score']) ? $_POST['score'] : 0;
$username = getFromSession('username');
saveScore($username, $score);

