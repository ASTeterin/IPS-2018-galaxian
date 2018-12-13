<?php
  
    /*const DB_HOST = "localhost";
    const DB_USER = "root";
    const DB_PASS = "Qwerty123";
    const DB_NAME = "galaxian";
    const DB_PORT = "3306";
  */

    
    $g_dbLink = null;
    
    function dbInitialConnect()
    {
        global $g_dbLink;
        $g_dbLink = mysqli_connect("localhost", "root", "Qwerty123", "galaxian");
        
        $error = mysqli_connect_error();
        if ($error)
            die('Unable to connect to DB');
    }
    
    function dbQuery($query)
    {
        global $g_dbLink;
        $result = mysqli_query($g_dbLink, $query);
        return ($result !== false);    
    }
    
    function dbQuote($value)
    {
        global $g_dbLink;
        return mysqli_real_escape_string($g_dbLink, $value);    
    }
    
    function dbGetLastInsertId()
    {
        global $g_dbLink;
        return mysqli_insert_id($g_dbLink);    
    }
    
    function dbQueryGetResult($query)
    {
        global $g_dbLink;
        $data = array();
        $result = mysqli_query($g_dbLink, $query);
        if ($result)
        {
            while($row = mysqli_fetch_assoc($result))
            {
                array_push($data, $row);
            }
            mysqli_free_result($result);        
        }        
        
        return $data;    
    }

