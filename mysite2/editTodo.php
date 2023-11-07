<?php
header('Access-Control-Allow-Origin:*');

include 'connection.php';


function editTodo($connection)
{
    if (!isset($_POST['id']) && !isset($_POST['todo'])) {
        $response = ["success" => false, "message" => "ID and Todo is required"];
        // echo "true";
    } else {
        $id = $_POST['id'];
        $todo = $_POST['todo'];

        $query = "UPDATE todos set todo='$todo' where id='$id'";
        $result = mysqli_query($connection, $query);

        if ($result) {
            $response = ["success" => true, "message" => "Todo is successfully updated"];
        } else {
            $response = ["success" => false, "message" => "Something went wrong while trying to updating data"];
        }

        // echo "false";
    }

    echo json_encode($response);
}

editTodo($connection);
