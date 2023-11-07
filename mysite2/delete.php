<?php
header('Access-Control-Allow-Origin:*');

include './connection.php';

function deleteTodo($connection)
{
    if (!isset($_POST['id'])) {
        $response = ["success" => false, "message" => "ID and Todo is required"];
    } else {
        $id = $_POST['id'];
        $todo = $_POST['todo'];

        $query = "DELETE from todos where id='$id'";
        $result = mysqli_query($connection, $query);

        if ($result) {
            $response = ["success" => true, "message" => "Todo Deleted successfully"];
        } else {
            $response = ["success" => false, "message" => "something went wrong when deleting with todos"];
        }
    }

    echo json_encode($response);
}

deleteTodo($connection);
