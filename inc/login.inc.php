<?php

require_once('common.inc.php');
header("ContetnType: application/json");

$name = $_POST['login'] ?? '';
$password = $_POST['currentPassword'] ?? '';

if (empty($name) || empty($password)) {
    //echo json_encode(['error_code' => ERR_USER_NOT_EXIST]);
    echo json_encode(['error_code' => ERR_USER_NOT_EXIST]);
    return;
}

$registredUsers = getUserInfoByName($name);

if (empty($registredUsers)) {
    echo json_encode(['error_code' => ERR_USER_NOT_EXIST]);
    return;
}

if (checkPassword($name, $password)) {
    header("Location: ../personal_accaunt.php");
} else {
    echo json_encode(['error_code' => ERR_INCORRECT_PASS]);
}