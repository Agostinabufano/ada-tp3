var express = require('express');
const fs = require('fs');
var router = express.Router();
var path = require("path");

/* GET home page. */

router.get('/ping', function (req, res, next) {
  res.send('Pong');
});

// Renderización
router.get('/users/new', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../cliente/html/new.html'));
});

router.get('/users', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../cliente/html/index.html'));
});

router.get('/users/edit', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../cliente/html/edit.html'));
});

router.use('/css', express.static(__dirname + '/../../cliente/css'));

router.use('/js', express.static(__dirname + '/../../cliente/js'));

router.post('/api/user', function (req, res, next) {
  const user = req.body;
  if (validate(user) == true) {
    saveData(user);
    res.redirect("/users");
  } else {
    res.status(400).send("Es necesario que cargue correctamente sus datos");
  }

  function validate(obj) {
    if (obj.name !== "" && obj.name.length <= 30 &&
      obj.surname !== "" && obj.surname.length <= 30 &&
      obj.tel !== "" && /[0-9]/.test(obj.tel) &&
      obj.mail !== "" && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(obj.mail)) {
      return true;
    } else {
      return false
    }
  }
});

function id() {
  return Math.floor((Math.random() * 1000) + 1)
}

function read() {
  let data = fs.readFileSync("data/data.json");
  data = JSON.parse(data);
  return data;
}

function saveData(obj) {
  var data = read();
  var object = {
    name: obj.name,
    surname: obj.surname,
    tel: obj.tel,
    mail: obj.mail.toLowerCase(),
    id: id()
  }
  data.arr.push(object);
  fs.writeFileSync("data/data.json", JSON.stringify(data));
}

router.get('/api/users', function (req, res, next) {
  var data = read();
  var filteredUsers = [];
  if (req.query.search == null) {
    return res.send(JSON.stringify(data.arr))
  } else {
    var search = req.query.search.toLowerCase();
    for (var i = 0; i < data.arr.length; i++) {
      if (data.arr[i].name.toLowerCase().includes(search) ||
        data.arr[i].surname.toLowerCase().includes(search) ||
        data.arr[i].tel.includes(search) ||
        data.arr[i].mail.includes(search)) {
        filteredUsers.push(data.arr[i]);
      }
    }
    res.send(JSON.stringify(filteredUsers));
  }
});

router.get("/api/users/:id", function (req, res) {
  var searchUserId = req.params.id;
  var foundUser = "";
  var data = read();
  for (var i = 0; i < data.arr.length; i++) {
    if (data.arr[i].id == searchUserId) {
      foundUser = data.arr[i];
    }
  }
  res.send(JSON.stringify(foundUser));
})

router.put("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const body = req.body;
  console.log(id, req.body);
  console.log(req.params);
  console.log(req.query);
  var data = read();
  for (var i = 0; i < data.arr.length; i++) {
    if (data.arr[i].id == id) {
      data.arr[i] = body;
    }
  }
  fs.writeFileSync("data/data.json", JSON.stringify(data));
  res.send("OK")
})

router.delete("/api/users/:id", function (req, res) {
  var deleteUserId = req.params.id;
  deleteData(deleteUserId);
  res.send("OK");
})

function deleteData(id) {
  var data = read();
  var pos = -1;
  for (var i = 0; i < data.arr.length; i++) {
    if (data.arr[i].id == id) {
      pos = i;
    }
  }
  if (pos > -1) {
    data.arr.splice(pos, 1);
  }
  fs.writeFileSync("data/data.json", JSON.stringify(data));
}

module.exports = router;