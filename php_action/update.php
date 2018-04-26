<?php 

require_once 'db_connect.php';

//if form is submitted
if($_POST) {	

	$validator = array('success' => false, 'messages' => array());
    $fecha=date_default_timezone_set("America/Lima"). date("Y-m-d H:i:s");


	$id = $_POST['member_id'];
	$nombre = $_POST['editnombre'];
	$historia = $_POST['edithistoria'];
	//$horasalida = $_POST['edithorasalida'];
	$horaretorno = $fecha;
	$especialidad = $_POST['editespecialidad'];
	$especialista = $_POST['editespecialista'];
	$encargado = $_POST['editencargado'];
	$active = $_POST['editActive'];

	$sql = "UPDATE tbcontactos SET nombre='$nombre', historia='$historia', horaretorno='$horaretorno', especialidad='$especialidad', especialista='$especialista', encargado='$encargado', active='$active' WHERE id=$id";
	$query = $connect->query($sql);

	if($query === TRUE) {			
		$validator['success'] = true;
		$validator['messages'] = "Agregado exitosamente";		
	} else {		
		$validator['success'] = false;
		$validator['messages'] = "Error al agregar la información del miembro";
	}

	// close the database connection
	$connect->close();

	echo json_encode($validator);

}