const userFile = 'json/users.json';

function login(username, password) {
  var data = `action=login&username=${username}&password=${password}`;
  $.ajax({
    type:'POST',
    data: data,
    url: 'php/usersAPI.php',
    success: function(response){
      console.log(response);
      const logoutButton = document.createElement("BUTTON");
      logoutButton.innerHTML = "Logout";
      logoutButton.className = "btn btn-outline-success";
      logoutButton.setAttribute("id", "logout");
      $('#user_section').innerHTML = logoutButton;      
      //window.location.reload();      
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
      const loginButton = document.createElement("BUTTON");
      loginButton.innerHTML = "login";
      loginButton.className = "btn btn-outline-success";
      loginButton.setAttribute("id", "login");
      loginButton.setAttribute("data-toggle", "modal");
      loginButton.setAttribute("data-target", "#loginModal");
      $('#user_section').innerHTML = loginButton;                  
      //window.location.reload();      
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
