const inputName = $("#name");
const inputSurname = $("#surname");
const inputTel = $("#tel");
const inputMail = $("#email");

function name() {
    var nameI = inputName.val();
    if (nameI !== "" && nameI.length <= 30) {
        return true;
    } else {
        inputName.parent().html(`<p class="error">Es necesario ingresar un nombre</p>`);
        return false;
    }
}

function surname() {
    var surnameI = inputSurname.val();
    if (surnameI !== "" && surnameI.length <= 30) {
        return true;
    } else {
        inputSurname.parent().html(`<p class="error">Es necesario ingresar un apellido</p>`);
        return false;
    }
}

function telephone() {
    var telI = inputTel.val();
    if (telI !== "" && /[0-9]/.test(telI)) {
        return true;
    } else {
        inputTel.parent().html(`<p class="error">Es necesario ingresar un número de teléfono</p>`);
        return false;
    }
}

function mail() {
    var emailI = inputMail.val();
    if (emailI !== "" && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(emailI)) {
        return true;
    } else {
       inputMail.parent().html(`<p class="error">Es necesario ingresar una dirección de mail</p>`);
        return false;
    }
}

function loadedUser() {
    var id = searchParams();
    $.ajax(`http://localhost:3000/api/users/${id}`).done(function (data) {
        var datito = JSON.parse(data);
        inputName.val(datito.name);
        inputSurname.val(datito.surname);
        inputTel.val(datito.tel);
        inputMail.val(datito.mail);
    })
}

loadedUser();

function saveEditUser(e) {
    var id = searchParams();
    var newName = inputName.val();
    var newSurname = inputSurname.val();
    var newTel = inputTel.val();
    var newMail = inputMail.val();
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

$("#return").on("click", function () {
    location.href(`http://localhost:3000/api/users`)
})