<?php 

require_once 'db_connect.php';

//si se envía el formulario
if($_POST) {	

	$validator = array('success' => false, 'messages' => array());

	$nombre = $_POST['nombre'];
	$historia = $_POST['historia'];
	$horasalida = $_POST['horasalida'];
	//$horaretorno = $_POST['horaretorno'];
	$especialidad = $_POST['especialidad'];
	$especialista = $_POST['especialista'];
	$encargado = $_POST['encargado'];
	$active = $_POST['active'];

	$sql = "INSERT INTO tbcontactos (nombre, historia, horasalida, especialidad, especialista, encargado, active) VALUES ('$nombre', '$historia', '$horasalida', '$especialidad', '$especialista', '$encargado', '$active')";
	$query = $connect->query($sql);

	if($query === TRUE) {			
		$validator['success'] = true;
		$validator['messages'] = "Agregado exitosamente";		
	} else {		
		$validator['success'] = false;
		$validator['messages'] = "Error al agregar la información del miembro";
	}

	// cerrar la conexión de la base de datos
	$connect->close();

	echo json_encode($validator);

}