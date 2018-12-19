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

function loadedUser() {
    var id = searchParams();
    $.ajax(`http://localhost:3000/api/users/${id}`).done(function (data) {
        var datito = JSON.parse(data);
        $('#name').val(datito.name);
        $('#surname').val(datito.surname);
        $('#tel').val(datito.tel);
        $('#mail').val(datito.mail);
    })
}

loadedUser();

function saveEditUser(e) {
    var id = searchParams();
    var newName = $("#name").val();
    var newSurname = $("#surname").val();
    var newTel = $("#tel").val();
    var newMail = $("#mail").val();
    if (name() && surname() && telephone() && mail()) {
        $.ajax({
            url: `http://localhost:3000/api/users/${id}`,
            type: 'PUT',
            data: {
                name: newName,
                surname: newSurname,
                tel: newTel,
                mail: newMail
            },
            success: function (result) {
                $("#editUser").append(`<p class="success">Los datos han sido modificados y guardados exitosamente. MUCHAS GRACIAS.</p>`)
            }
        });
    }
}

$('#save').on('click', function (e) {
    saveEditUser(e);
})

function searchParams() {
    var search = window.location.search;
    // "?id=7125"
    search = search.slice(1, search.length);
    search = search.split("=");
    // "[id,7125]"
    return search[1];
}