<?php

require_once('common.inc.php');
header("ContetnType: application/json");

$name = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($name) || empty($password)) {
    echo json_encode(ERR_NO_PARAM);//2
    return;
}

$registredUsers = getUserInfoByName($name);

if (empty($registredUsers)) {
    echo json_encode(ERR_USER_NOT_EXIST);//2
    return;
}

if (checkPassword($name, $password)) {
    
    saveToSession('username', $name);
    echo json_encode(ERR_NO_ERROR);
    exit();
} else {
    echo json_encode(ERR_INCORRECT_PASS);
}