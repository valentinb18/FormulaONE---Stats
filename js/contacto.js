function validarFormulario(){
    let valido = true;

    const errores = document.querySelectorAll(".error");
    errores.forEach(function(error){
        error.textContent = "";
    });

    const nombre = document.getElementById("nombre").value.trim();
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if(nombre === "") {
        document.getElementById("error-nombre").textContent = "El nombre es obligatorio";
        valido = false;
    }else if(!regexNombre.test(nombre)){
        document.getElementById("error-nombre").textContent = "El nombre no debe contener caracteres especiales";
        valido = false;
    }

    const apellido = document.getElementById("apellido").value.trim();
    const regexApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if(apellido === ""){
        document.getElementById("error-apellido").textContent = "El apellido es obligatorio";
        valido = false;
    }else if(!regexApellido.test(apellido)){
        document.getElementById("error-apellido").textContent = "El apellido no debe contener caracteres especiales";
        valido = false;
    }

    const email = document.getElementById("email").value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email === ""){
        document.getElementById("error-email").textContent = "El email es obligatorio";
        valido = false;
    }else if(!regexEmail.test(email)){
        document.getElementById("error-email").textContent = "El formato del email no es valido";
        valido = false;
    }

    const telefono = document.getElementById("telefono").value.trim();
    const regexTelefono = /^[0-9]{8,15}$/;
    if(telefono === ""){
        document.getElementById("error-telefono").textContent = "El telefono es obligatorio";
        valido = false;
    }else if (!regexTelefono.test(telefono)) {
        document.getElementById("error-telefono").textContent = "El formato del telefono no es valido";
        valido = false;
    }

    const motivo = document.getElementById("motivo").value;
    if(motivo === ""){
        document.getElementById("error-motivo").textContent = "Selecciona un motivo";
        valido = false;
    }

    const mensaje = document.getElementById("mensaje").value.trim();
    if(mensaje === "") {
        document.getElementById("error-mensaje").textContent = "El mensaje es obligatorio";
        valido = false;
    } else if (mensaje.length < 10) {
        document.getElementById("error-mensaje").textContent = "El mensaje debe tener al menos 10 caracteres";
        valido = false;
    }

    const terminos = document.getElementById("terminos").value.trim();
    if(!terminos ) {
        document.getElementById("error-terminos").textContent = "Debe aceptar los terminos y condiciones";
        valido = false;
    }

    if(valido){
        document.getElementById("mensaje-exito").textContent = "Mensaje enviado con exito";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("email").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("motivo").value = "";
        document.getElementById("mensaje").value = "";
        document.getElementById("terminos").checked = false;
    }
}
document.getElementById("btnEnviar").addEventListener("click", validarFormulario);