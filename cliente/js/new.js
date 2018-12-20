$("#save").on("click", function (e) {
    if (name() && surname() && telephone() && mail()) {
        return true;
    }
    e.preventDefault();
})

function name() {
    var nameI = $("#name").val();
    if (nameI !== "" && nameI.length <= 30) {
        return true;
    } else {
        $("#name").parent().append(`<p class="error">Es necesario ingresar un nombre</p>`);
        return false;
    }
}

function surname() {
    var surnameI = $("#surname").val();
    if (surnameI !== "" && surnameI.length <= 30) {
        return true;
    } else {
        $("#surname").parent().append(`<p class="error">Es necesario ingresar un apellido</p>`);
        return false;
    }
}

function telephone() {
    var telI = $("#tel").val();
    if (telI !== "" && /[0-9]/.test(telI)) {
        return true;
    } else {
        $("#tel").parent().append(`<p class="error">Es necesario ingresar un número de teléfono</p>`);
        return false;
    }
}

function mail() {
    var emailI = $("#mail").val();
    if (emailI !== "" && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(emailI)) {
        return true;
    } else {
        $("#mail").parent().append(`<p class="error">Es necesario ingresar una dirección de mail</p>`);
        return false;
    }
}