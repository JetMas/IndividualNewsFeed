const userFile = 'json/users.json';

function setUserCookie(username){
  document.cookie = `user=${username}; path=/`;
}

function login(username, password) {
  var data = `action=login&usernam=${username}&password=${password}`;
  console.log("login")
  $.ajax({
    type:'POST',
    data: data,
    url: 'php/usersAPI.php',
    success: function(response){
      console.log("success");
    }
  });
}


$(document).ready(function () {
  $('#login').click(function () {
    //console.log('click1');
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    console.log(password);
    login(username, password);
  });
});
