<?php 

require_once 'db_connect.php';

$memberId = $_POST['member_id'];

$sql = "SELECT * FROM tbcontactos WHERE id = $memberId";
$query = $connect->query($sql);
$result = $query->fetch_assoc();

$connect->close();

echo json_encode($result);

