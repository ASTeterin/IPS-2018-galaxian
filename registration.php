<?php

require_once('inc/common.inc.php');

$name = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

$registredUsers = getUserInfoByName($name);

if (!empty($registredUsers)) {
    echo json_encode(['error_code' => 7]);
    return;
}

$userId = registerUser($name, $password);
//echo json_encode(['success' => 1, 'user_id' => $userId]);

echo json_encode(['success' => 1]);






