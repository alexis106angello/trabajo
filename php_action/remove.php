<?php 

require_once 'db_connect.php';

$output = array('success' => false, 'messages' => array());

$memberId = $_POST['member_id'];

$sql = "DELETE FROM tbcontactos WHERE id = {$memberId}";
$query = $connect->query($sql);
if($query === TRUE) {
	$output['success'] = true;
	$output['messages'] = 'Eliminado con éxito';
} else {
	$output['success'] = false;
	$output['messages'] = 'Error al eliminar la información del miembro';
}

// close database connection
$connect->close();

echo json_encode($output);