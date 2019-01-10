<?php

require_once('common.inc.php');
header("ContetnType: application/json");

$name = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$friends = $_POST['friends'] ?? '';
$isChangeed = false;
//echo ($name);
//echo ($password);

$currentName = getFromSession('username');
//echo $name;

if (($currentName == $name) && ($password == '')) {
    return;
}

if ($currentName != $name) {
    changeUserName($currentName, $name);
    saveToSession('username', $name);
    $isChangeed = true;
   
}

if ($password !== '') {
    //if (checkPassword($name, $password)) {
        $hash = sha1($password);
        changePassword($name, $hash);
        $isChangeed = true;
    //}
}

if ($isChangeed) {
    echo json_encode(ERR_NO_ERROR);
    exit();
}





