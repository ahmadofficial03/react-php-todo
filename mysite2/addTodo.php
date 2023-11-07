<?php
header('Access-Control-Allow-Origin:*');

include("connection.php");

function addTodo($connection)
{
    if (!isset($_POST['todo'])) {
        $response = ["success" => false, "message" => "Todo is required"];
    } else {
        $todo = $_POST['todo'];
        $query = "INSERT into todos (todo) values('$todo')";
        $result = mysqli_query($connection, $query);

        if ($result) {
            $response = ["success" => true, "message" => "Todo added successfully"];
        } else {
            $response = ["success" => false, "message" => "Todo are not added successfully"];
        }
    }

    echo json_encode($response);
}

addTodo($connection);
