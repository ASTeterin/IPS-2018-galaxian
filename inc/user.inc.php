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
    if ($passwordHash == $validPasswordHash) {
        return true;
    } else {
        return false;
    }
}