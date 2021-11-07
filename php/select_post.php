<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "API";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";
    function select_post($conn)
    {
        $sql = "SELECT * FROM post";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<br> id: " . $row["id"] .  "   Engagement: " . $row["engagement"] . "      Category Id:" . $row["category_id"] . "</br>";
            }
        } else {
            echo "0 results";
        }
    }
}
