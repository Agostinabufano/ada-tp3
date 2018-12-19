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

$.ajax("http://localhost:3000/api/users").done(function (data) {
    var users = JSON.parse(data);
    for (var i = 0; i < users.length; i++) {
        var aux = users[i];
        $("#users").append(createUserDiv(users[i]))
        $(`#deleteUser${users[i].id}`).on("click", function () {
            $.ajax({
                url: `http://localhost:3000/api/users/${aux.id}`,
                type: 'DELETE',
                success: function (result) {
                    if (result == "OK") {
                        $(`#${aux.id}`).remove();
                    }
                }
            });
        })
        console.log(users[i]);
    }
})

$("#filtro").on("click", function () {
    var filtroVal = $("#filtroVal").val();
    $.ajax(`http://localhost:3000/api/users?search=${filtroVal}`).done(function (data) {
        $("#users").children().remove()
        var filteredUsers = JSON.parse(data);
        for (var i = 0; i < filteredUsers.length; i++) {
            var aux = filteredUsers[i];
            $("#users").append(createUserDiv(filteredUsers[i]))
            $(`#deleteUser${filteredUsers[i].id}`).on("click", function () {
                $.ajax({
                    url: `http://localhost:3000/api/users/${aux.id}`,
                    type: 'DELETE',
                    success: function (result) {
                        if (result == "OK") {
                            $(`#${aux.id}`).remove();
                        }
                    }
                });
            })
        }
    })
})

function createUserDiv(user) {
    return `<div id=${user.id} class="user-container">
    <div class="container">${user.name}</div>
    <div class= "container">${user.surname}</div>
    <div class="container">${user.tel}</div>
    <div class="container">${user.mail}</div>
    <div class="button-container">
    <a href="/users/edit?id=${user.id}"><button id="editUser${user.id}">EDITAR</button></a>
    <button id="deleteUser${user.id}">ELIMINAR</button>
    </div>
    </div>`;
}