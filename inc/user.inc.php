<?php

function getUserInfoByName($name)
{
    $findUserQueryString = "SELECT user_name FROM " . USER_TABLE .  " WHERE user_name = '" . dbQuote($name)  . "'";
    return dbQueryGetResult($findUserQueryString);
}

function registerUser($name, $pass)
{
    $insertNewUserQueryString = "INSERT INTO " . USER_TABLE . " (user_name, user_password) VALUES ('" . dbQuote($name) . "', '" . dbQuote($pass) . "')";
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
    $validPassword = getPasswordByName($name)[0]["user_password"];
    if ($password == $validPassword) {
        return true;    
    } else {
        return false;
    }
}