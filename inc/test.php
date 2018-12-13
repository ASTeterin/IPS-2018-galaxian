<?php

function dbQueryGetResult($query, $link)
    {
        global $g_dbLink;
        $data = array();
        $result = mysqli_query($link, $query);
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

$link = mysqli_connect("127.0.0.1", "root", "Qwerty123", "galaxian");

if (!$link) {
    echo "Ошибка: Невозможно установить соединение с MySQL." . PHP_EOL;
    echo "Код ошибки errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Текст ошибки error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$qwery = "select * from users";
//$qwery = "INSERT INTO users (user_name, user_password) VALUES ('user33', 'qwerty')";


$result = dbQueryGetResult($qwery, $link);
var_dump($result);


echo "Соединение с MySQL установлено!" . PHP_EOL;
echo "Информация о сервере: " . mysqli_get_host_info($link) . PHP_EOL;



//mysqli_close($link);