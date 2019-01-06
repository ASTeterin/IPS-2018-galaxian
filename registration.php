<?php

require_once('inc/common.inc.php');


$name = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

$registredUsers = getUserInfoByName($name);


if (!empty($registredUsers)) {
    echo json_encode(['error_code' => ERR_USER_EXIST]);
    return;
}
$hash_password = sha1($password);
$userId = registerUser($name, $hash_password);
header('Content-Type: text/json');
echo json_encode(['success' => $name]);

//echo json_encode(['success' => 1]);

//echo 2;






