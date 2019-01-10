<?php

require_once('inc/common.inc.php');
header('Content-Type: text/json');


$name = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

$registredUsers = getUserInfoByName($name);


if (!empty($registredUsers)) {
    echo json_encode(['error_code' => ERR_USER_EXIST]);
    return;
}
$hash_password = sha1($password);
$userId = registerUser($name, $hash_password);

echo json_encode(['success' => $name], JSON_UNESCAPED_UNICODE);

//echo json_encode(['success' => 1]);

//echo 2;






