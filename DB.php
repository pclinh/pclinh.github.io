<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "API";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
echo "succeed";
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

function select_category($conn)
{
    $sql = "SELECT * FROM category";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<br> id: " . $row["id"] . " - Name: " . $row["name"] . "   Amount: " . $row["amount"] . "      Avg:" . $row["avg_engagement"] . "</br>";
        }
    } else {
        echo "0 results";
    }
}
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
function insert_categogy($conn, $name)
{
    $sql = "INSERT INTO category (name) VALUES ('$name')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
        select_category($conn);
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}
function delete_post($conn, $id)
{
    $sql = "DELETE FROM post WHERE id =$id";
    if (mysqli_query($conn, $sql)) {
        echo "Delete successfully";
        select_post($conn);
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}
function delect_category($conn, $name)
{
    $sql = "SELECT id FROM category where name = $name";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $id = $row["id"];
            $delete_sql = "DELETE FROM category WHERE id =$id";
        }
    }
}
function engagement_update($conn, $id, $amount, $avg)
{
    $sql = "INSERT INTO category (amount, avg_engagement) VALUES ('$amount','$avg')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
        select_category($conn);
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}
function add_post($conn, $id, $category_id)
{
    $sql = "INSERT INTO post (id, category_id) VALUES ('$id','$category_id')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
        select_post($conn);
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}
function Update_post_engagement($conn, $id, $engagement)
{
    $sql = "UPDATE post SET engagement=$engagement WHERE id=$id";
    select_post($conn);
}
select_post($conn);
