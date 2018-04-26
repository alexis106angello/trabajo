<?php 

require_once 'db_connect.php';

$output = array('data' => array());

$sql = "SELECT * FROM tbcontactos limit 09";
$query = $connect->query($sql);

$x = 1;
while ($row = $query->fetch_assoc()) {
	$active = '';
	if($row['active'] == 1) {
		$active = '<label class="label label-success">completo</label>';
	} else {
		$active = '<label class="label label-danger">incompleto</label>'; 
	}

	$actionButton = '
	<div class="btn-group">
	  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    Accion <span class="caret"></span>
	  </button>

	  <ul class="dropdown-menu">
	    <li><a type="button" data-toggle="modal" data-target="#editMemberModal" onclick="editMember('.$row['id'].')"> <span class="glyphicon glyphicon-edit"></span> Editar</a></li>
	    <li><a type="button" data-toggle="modal" data-target="#removeMemberModal" onclick="removeMember('.$row['id'].')"> <span class="glyphicon glyphicon-trash"></span> Eliminar</a></li>	    
	  </ul>
	</div>
		';

	$output['data'][] = array(
		$x,
		$row['nombre'],
		$row['historia'],
		$row['horasalida'],
		$row['horaretorno'],
		$row['especialidad'],
		$row['especialista'],
		$row['encargado'],
		$active,
		$actionButton
	);

	$x++;
}

// database connection close
$connect->close();

echo json_encode($output);