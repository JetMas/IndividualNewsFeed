const userFile = 'json/users.json';

function login(username, password) {
  var data = `action=login&username=${username}&password=${password}`;
  $.ajax({
    type:'POST',
    data: data,
    url: 'php/usersAPI.php',
    success: function(response){
      console.log(response);
      window.location.reload();      
    }
  });
}

function logout() {
  var data = `action=logout`;
  $.ajax({
    type:'POST',
    data: data,    
    url: 'php/usersAPI.php',
    success: function(response){
      console.log(response);
      window.location.reload();      
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
  $('#logout').click(function () {
    //console.log('click1');
    logout();
  });
});
