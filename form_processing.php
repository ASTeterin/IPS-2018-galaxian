<?php
//TODO: rename file from form_processing.php to register_user_ajax.php
require_once("inc/common.inc.php");

//TODO: don't use htmlspecialchars
$name = htmlspecialchars($_POST["username"] ?? ""); //TODO: check if parameters are passed
$password = htmlspecialchars($_POST["password"] ?? "");
$reenteredPassword = htmlspecialchars($_POST["confirmed_password"] ?? "");
echo $password;


//TODO: create user.inc.php module and getUserInfoByName(r$name) function
 //TODO: quote all parameters in sql

$registredUsers = getUserInfoByName($name);

if (!empty($registredUsers)) {
    echo json_encode(['error_code' => 7]);
    echo 'пользователь уже существует';
    return;
}

//TODO: create registerUser($name, $pass) : $userId function

$result = registerUser($name, $password);
/*
$redicet = $_SERVER['HTTP_REFERER'];
@header ("Location: $redicet");*/
echo json_encode(['success' => 1, 'user_id' => $userId]);