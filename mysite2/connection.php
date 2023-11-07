<?php
$host = 'localhost';
$user = 'root';
$password = '';
$db = "react_todo";


function connection($host, $user, $password, $db)
{
    $connect = mysqli_connect($host, $user, $password, $db);
    return $connect;
}

$connection = connection($host, $user, $password, $db);
