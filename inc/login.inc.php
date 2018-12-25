<?php

require_once('common.inc.php');

$name = $_POST['login'] ?? '';
$password = $_POST['currentPassword'] ?? '';


$registredUsers = getUserInfoByName($name);

if (empty($registredUsers)) {
    echo json_encode(['error_code' => 8]);
    return;
}

if (checkPassword($name, $password)) {
    header("Location: ../personal_accaunt.php");
} else {
    echo 'error';
}