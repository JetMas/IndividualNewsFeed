const userFile = 'json/users.json';

function setUserCookie(username){
  document.cookie = `user=${username}; path=/`;
}

function login(username, password) {
  $.getJSON(userFile, function(data){
    //console.log(data);
    $.each(data, function(key, val) {
      console.log(`${val.username}`);
      //Check if the username match
      //then check if the password match
      if( (val.username.toUpperCase() === username.toUpperCase()) && (val.password == password) ){
        //setUserCookie(username);
        console.log("login success!");
      }
    });
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
