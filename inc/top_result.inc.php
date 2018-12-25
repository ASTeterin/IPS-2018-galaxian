<?php


function getDataFromStorage()
{
    $getTopResultQuery = "SELECT users.user_name, result.scores
    FROM " . USER_TABLE . 
    " INNER JOIN " . RESULT_TABLE. " USING (user_id)
    ORDER BY result.scores DESC";
    $result = dbQueryGetResult($getTopResultQuery);
    return $result; 
}

function getTopResult()
    {
        $data_array = getDataFromStorage();
        $indexArray = [];
        $resultArray = [];
        $i = 0;  
        foreach ($data_array as $value) {
            $indexArray = ['position'=> $i + 1];     
            $resultArray[$i] = array_merge($indexArray, $value);
            $i++;
        }
        return ['records' => $resultArray];
    }