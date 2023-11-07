<?php
include("connection.php");

header('Access-Control-Allow-Origin:*');

function getTodo($connection)
{
    $query = 'SELECT * from todos';
    $result = mysqli_query($connection, $query);

    $todos = array();
    while ($row = mysqli_fetch_array($result)) {
        $todos[] = array(
            'id' => $row['id'],
            'todo' => $row['todo'],
        );
    }

    $response = ['success' => 'true', 'data' => $todos];
    echo json_encode($response);
}

getTodo($connection);
