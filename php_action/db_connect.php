<?php 

//Produccion
#$servername = "192.168.1.253";
#$username = "root";
#$password = "developt";
#$dbname = "csl_hc";

//Pruebas

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "csl_hc";


// create connection
$connect = new mysqli($servername, $username, $password, $dbname);

// check connection 
if($connect->connect_error) {
	die("Connection Failed : " . $connect->connect_error);
} else {
	// echo "Successfully Connected";
}