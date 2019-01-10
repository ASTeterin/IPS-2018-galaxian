<?php

function getUserInfoByName($name)
{
    $findUserQueryString = "SELECT user_name FROM " . USER_TABLE .  " WHERE user_name = '" . dbQuote($name)  . "'";
    return dbQueryGetResult($findUserQueryString);
}

function getUserIdByName($name)
{
    $getUserIdQueryString = "SELECT user_id FROM " . USER_TABLE .  " WHERE user_name = '" . dbQuote($name)  . "'";
    return dbQueryGetResult($getUserIdQueryString);
}

function addFriend($username, $friendName)
{
    $addFriendQueryString = "INSERT INTO " . FRIEND_TABLE . " (user_ID, friend_ID) 
    VALUES ('" . dbQuote($username) . "', '" . dbQuote($friendName). "')";
    dbQuery($addFriendQueryString);
    return dbGetLastInsertId();
}

function getAllUsers()
{
    $userListQueryString = "SELECT user_name FROM " . USER_TABLE . " ORDER BY user_name";
    return dbQueryGetResult($userListQueryString);
}

function changeUserName($oldName, $newName)
{
    $id = getUserIdByName($oldName);
    $changeUserQueryString = "UPDATE " . USER_TABLE . " SET user_name = '" .  dbQuote($newName) . "' WHERE user_id = '" . $id[0]["user_id"]  . "'";
    dbQuery($changeUserQueryString);
    return dbGetLastInsertId();
}

function changePassword($username, $password)
{
    $id = getUserIdByName($username);
    $changePasswordQueryString = "UPDATE " . USER_TABLE . " SET user_password = '" .  dbQuote($password) . "' WHERE user_id = '" . $id[0]["user_id"]  . "'";
    dbQuery($changePasswordQueryString);
    return dbGetLastInsertId();
}



function getUserList()
{
    $users = [];
    $userList = getAllUsers();
    foreach ($userList as $user) {
        $users[] = $user['user_name'];
    }
    return $users;
}

function registerUser($name, $pass)
{
    $insertNewUserQueryString = "INSERT INTO " . USER_TABLE . " (user_name, user_password, registration_date) 
    VALUES ('" . dbQuote($name) . "', '" . dbQuote($pass) . "', '" . date("Y-m-d") . "')";
    dbQuery($insertNewUserQueryString);
    return dbGetLastInsertId();
} 

function getPasswordByName($name)
{
    $getPasswordQueryString = "SELECT user_password FROM " . USER_TABLE .  " WHERE user_name = '" . dbQuote($name)  . "'";
    return dbQueryGetResult($getPasswordQueryString);
}

function checkPassword($name, $password)
{
    $validPasswordHash = getPasswordByName($name)[0]["user_password"];
    $passwordHash = sha1($password);
    return ($passwordHash == $validPasswordHash);
}