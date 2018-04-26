// global la tabla de gestionar memeber 
var manageMemberTable;

$(document).ready(function() {
	manageMemberTable = $("#manageMemberTable").DataTable({
		"ajax": "php_action/retrieve.php",
		"order": []
	});

	$("#addMemberModalBtn").on('click', function() {
		// restablecer el formulario
		$("#createMemberForm")[0].reset();
		// eliminar el error 
		$(".form-group").removeClass('has-error').removeClass('has-success');
		$(".text-danger").remove();
		// vaciar el mensaje div
		$(".messages").html("");

		// enviar formulario
		$("#createMemberForm").unbind('submit').bind('submit', function() {

			$(".text-danger").remove();

			var form = $(this);

			// validación
			var nombre = $("#nombre").val();
			var historia = $("#historia").val();
			var horasalida = $("#horasalida").val();
			//var horaretorno = $("#horaretorno").val();
			var especialidad = $("#especialidad").val();
			var especialista = $("#especialista").val();
			var encargado = $("#encargado").val();
			var active = $("#active").val();

			if(nombre == "") {
				$("#nombre").closest('.form-group').addClass('has-error');
				$("#nombre").after('<p class="text-danger">El campo de nombre es obligatorio</p>');
			} else {
				$("#nombre").closest('.form-group').removeClass('has-error');
				$("#nombre").closest('.form-group').addClass('has-success');				
			}

			if(historia == "") {
				$("#historia").closest('.form-group').addClass('has-error');
				$("#historia").after('<p class="text-danger">El campo de  historia es obligatorio</p>');
			} else {
				$("#historia").closest('.form-group').removeClass('has-error');
				$("#historia").closest('.form-group').addClass('has-success');				
			}

			if(horasalida == "") {
				$("#horasalida").closest('.form-group').addClass('has-error');
				$("#horasalida").after('<p class="text-danger">El campo de  horasalida es obligatorio</p>');
			} else {
				$("#horasalida").closest('.form-group').removeClass('has-error');
				$("#horasalida").closest('.form-group').addClass('has-success');				
			}


			/*if(horaretorno == "") {
				$("#horaretorno").closest('.form-group').addClass('has-error');
				$("#horaretorno").after('<p class="text-danger">El campo de  horaretorno es obligatorio</p>');
			} else {
				$("#horaretorno").closest('.form-group').removeClass('has-error');
				$("#horaretorno").closest('.form-group').addClass('has-success');				
			}*/


			if(especialidad == "") {
				$("#especialidad").closest('.form-group').addClass('has-error');
				$("#especialidad").after('<p class="text-danger">El campo de  especialidad es obligatorio</p>');
			} else {
				$("#especialidad").closest('.form-group').removeClass('has-error');
				$("#especialidad").closest('.form-group').addClass('has-success');				
			}


			if(especialista == "") {
				$("#especialista").closest('.form-group').addClass('has-error');
				$("#especialista").after('<p class="text-danger">El campo de  especialista es obligatorio</p>');
			} else {
				$("#especialista").closest('.form-group').removeClass('has-error');
				$("#especialista").closest('.form-group').addClass('has-success');				
			}


			if(encargado == "") {
				$("#encargado").closest('.form-group').addClass('has-error');
				$("#encargado").after('<p class="text-danger">El campo de  especialista es obligatorio</p>');
			} else {
				$("#encargado").closest('.form-group').removeClass('has-error');
				$("#encargado").closest('.form-group').addClass('has-success');				
			}


			if(active == "") {
				$("#active").closest('.form-group').addClass('has-error');
				$("#active").after('<p class="text-danger">El campo de  Active es obligatorio</p>');
			} else {
				$("#active").closest('.form-group').removeClass('has-error');
				$("#active").closest('.form-group').addClass('has-success');				
			}

			if(nombre && historia && horasalida  && especialidad && especialista && encargado && active) {
				// enviar el formulario al servidor
				$.ajax({
					url : form.attr('action'),
					type : form.attr('method'),
					data : form.serialize(),
					dataType : 'json',
					success:function(response) {

						// eliminar el error 
						$(".form-group").removeClass('has-error').removeClass('has-success');

						if(response.success == true) {
							$(".messages").html('<div class="alert alert-success alert-dismissible" role="alert">'+
							  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
							  '<strong> <span class="glyphicon glyphicon-ok-sign"></span> </strong>'+response.messages+
							'</div>');

							// restablecer el formulario 
							$("#createMemberForm")[0].reset();		

							// recarga las tablas de datos
							manageMemberTable.ajax.reload(null, false);
							// esta función está construida en función de tablas de datos;

						} else {
							$(".messages").html('<div class="alert alert-warning alert-dismissible" role="alert">'+
							  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
							  '<strong> <span class="glyphicon glyphicon-exclamation-sign"></span> </strong>'+response.messages+
							'</div>');
						}  // /else
					} // success  
				}); // ajax subit 				
			} /// if


			return false;
		}); // /enviar formulario para crear miembro
	}); // /add modal

});





















function removeMember(id = null) {
	if(id) {
		// haga clic en el botón Eliminar
		$("#removeBtn").unbind('click').bind('click', function() {
			$.ajax({
				url: 'php_action/remove.php',
				type: 'post',
				data: {member_id : id},
				dataType: 'json',
				success:function(response) {
					if(response.success == true) {						
						$(".removeMessages").html('<div class="alert alert-success alert-dismissible" role="alert">'+
							  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
							  '<strong> <span class="glyphicon glyphicon-ok-sign"></span> </strong>'+response.messages+
							'</div>');

						// refresca la mesa
						manageMemberTable.ajax.reload(null, false);

						// cerrar el modal
						$("#removeMemberModal").modal('hide');

					} else {
						$(".removeMessages").html('<div class="alert alert-warning alert-dismissible" role="alert">'+
							  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
							  '<strong> <span class="glyphicon glyphicon-exclamation-sign"></span> </strong>'+response.messages+
							'</div>');
					}
				}
			});
		}); // haga clic en eliminar btn
	} else {
		alert('Error: Refresh the page again');
	}
}











function editMember(id = null) {
	if(id) {

		// eliminar el error 
		$(".form-group").removeClass('has-error').removeClass('has-success');
		$(".text-danger").remove();
		// vaciar el mensaje div
		$(".edit-messages").html("");

		// eliminar el id
		$("#member_id").remove();

		// buscar los datos del miembro
		$.ajax({
			url: 'php_action/getSelectedMember.php',
			type: 'post',
			data: {member_id : id},
			dataType: 'json',
			success:function(response) {
				$("#editnombre").val(response.nombre);

				$("#edithistoria").val(response.historia);

				//$("#edithorasalida").val(response.horasalida);

				$("#edithoraretorno").val(response.horaretorno);

				$("#editespecialidad").val(response.especialidad);

				$("#editespecialista").val(response.especialista);

				$("#editencargado").val(response.encargado);

				$("#editActive").val(response.active);	

				// Identificación de id 
				$(".editMemberModal").append('<input type="hidden" name="member_id" id="member_id" value="'+response.id+'"/>');

				// aquí actualizar los datos de los miembros
				$("#updateMemberForm").unbind('submit').bind('submit', function() {
					// eliminar mensajes de error
					$(".text-danger").remove();

					var form = $(this);

					// validación
					var editnombre = $("#editnombre").val();
					var edithistoria = $("#edithistoria").val();
					//var edithorasalida = $("#edithorasalida").val();
					//var edithoraretorno = $("#edithoraretorno").val();
					var editespecialidad = $("#editespecialidad").val();
					var editespecialista = $("#editespecialista").val();
					var editencargado = $("#editencargado").val();
					var editActive = $("#editActive").val();

					if(editnombre == "") {
						$("#editnombre").closest('.form-group').addClass('has-error');
						$("#editnombre").after('<p class="text-danger">El campo Nombre es obligatorio</p>');
					} else {
						$("#editnombre").closest('.form-group').removeClass('has-error');
						$("#editnombre").closest('.form-group').addClass('has-success');				
					}

					if(edithistoria == "") {
						$("#edithistoria").closest('.form-group').addClass('has-error');
						$("#edithistoria").after('<p class="text-danger">El campo historia es obligatorio</p>');
					} else {
						$("#edithistoria").closest('.form-group').removeClass('has-error');
						$("#edithistoria").closest('.form-group').addClass('has-success');				
					}

					/*if(edithorasalida == "") {
						$("#edithorasalida").closest('.form-group').addClass('has-error');
						$("#edithorasalida").after('<p class="text-danger">El campo horasalida es obligatorio</p>');
					} else {
						$("#edithorasalida").closest('.form-group').removeClass('has-error');
						$("#edithorasalida").closest('.form-group').addClass('has-success');				
					}


					if(edithoraretorno == "") {
						$("#edithoraretorno").closest('.form-group').addClass('has-error');
						$("#edithoraretorno").after('<p class="text-danger">El campo horaretorno es obligatorio</p>');
					} else {
						$("#edithoraretorno").closest('.form-group').removeClass('has-error');
						$("#edithoraretorno").closest('.form-group').addClass('has-success');				
					}*/


					if(editespecialidad == "") {
						$("#editespecialidad").closest('.form-group').addClass('has-error');
						$("#editespecialidad").after('<p class="text-danger">El campo especialidad es obligatorio</p>');
					} else {
						$("#editespecialidad").closest('.form-group').removeClass('has-error');
						$("#editespecialidad").closest('.form-group').addClass('has-success');				
					}


					if(editespecialista == "") {
						$("#editespecialista").closest('.form-group').addClass('has-error');
						$("#editespecialista").after('<p class="text-danger">El campo especialista es obligatorio</p>');
					} else {
						$("#editespecialista").closest('.form-group').removeClass('has-error');
						$("#editespecialista").closest('.form-group').addClass('has-success');				
					}


					if(editencargado == "") {
						$("#editencargado").closest('.form-group').addClass('has-error');
						$("#editencargado").after('<p class="text-danger">El campo especialista es obligatorio</p>');
					} else {
						$("#editencargado").closest('.form-group').removeClass('has-error');
						$("#editencargado").closest('.form-group').addClass('has-success');				
					}



					if(editActive == "") {
						$("#editActive").closest('.form-group').addClass('has-error');
						$("#editActive").after('<p class="text-danger">El campo active es obligatorio/p>');
					} else {
						$("#editActive").closest('.form-group').removeClass('has-error');
						$("#editActive").closest('.form-group').addClass('has-success');				
					}

					if(editnombre && edithistoria && editespecialidad && editespecialista && editencargado && editActive) {
						$.ajax({
							url: form.attr('action'),
							type: form.attr('method'),
							data: form.serialize(),
							dataType: 'json',
							success:function(response) {
								if(response.success == true) {
									$(".edit-messages").html('<div class="alert alert-success alert-dismissible" role="alert">'+
									  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
									  '<strong> <span class="glyphicon glyphicon-ok-sign"></span> </strong>'+response.messages+
									'</div>');

									// recarga las tablas de datos
									manageMemberTable.ajax.reload(null, false);
									// esta función está construida en función de tablas de datos;

									// eliminar el error 
									$(".form-group").removeClass('has-success').removeClass('has-error');
									$(".text-danger").remove();
								} else {
									$(".edit-messages").html('<div class="alert alert-warning alert-dismissible" role="alert">'+
									  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
									  '<strong> <span class="glyphicon glyphicon-exclamation-sign"></span> </strong>'+response.messages+
									'</div>')
								}
							} // /success
						}); // /ajax
					} // /if

					return false;
				});

			} // /success
		}); // /buscar información de miembro seleccionada

	} else {
		alert("Error : Refresh the page again");
	}
}