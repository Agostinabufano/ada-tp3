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