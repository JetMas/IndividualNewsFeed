const userFile = 'json/users.json';

function setUserCookie(username){
  document.cookie = `user=${username}; path=/`;
}

function login(username, password) {
  var data = 'color='+c+'&food='+f;
  $.ajax({
    type:'POST',
    data: data,
    url: 'php/userAPI.php',
    success: function(response){
      console.log(response);
    }
  });
}


$(document).ready(function () {
  $('#login').click(function () {
    //console.log('click1');
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    console.log(username);
    console.log(password);
    login(username, password);
  });
});
