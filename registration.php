<?php
//TODO: rename file from form_processing.php to register_user_ajax.php
require_once("inc/common.inc.php");

//TODO: don't use htmlspecialchars
$name = $_POST["username"] ?? "";
$password = $_POST["password"] ?? "";
$reenteredPassword = $_POST["confirmed_password"] ?? "";
echo $password;



$registredUsers = getUserInfoByName($name);

if (!empty($registredUsers)) {
    echo json_encode(['error_code' => 7]);
    //echo 'пользователь уже существует';
    return;
}

$result = registerUser($name, $password);
/*
$redicet = $_SERVER['HTTP_REFERER'];
@header ("Location: $redicet");*/
echo json_encode(['success' => 1, 'user_id' => $userId]);