const userFile = 'json/users.json';

function appendLoginButton(){
  const loginButton = document.createElement("BUTTON");
  loginButton.innerHTML = "login";
  loginButton.className = "btn btn-outline-success";
  loginButton.setAttribute("id", "login");
  loginButton.setAttribute("data-toggle", "modal");
  loginButton.setAttribute("data-target", "#loginModal");
  document.getElementById('user_section').innerHTML = "";
  document.getElementById('user_section').appendChild(loginButton);
}

function appendLogoutButton(){
  const logoutButton = document.createElement("BUTTON");
  logoutButton.innerHTML = "Logout";
  logoutButton.className = "btn btn-outline-success";
  logoutButton.setAttribute("id", "logout");
  document.getElementById('user_section').innerHTML = "";
  document.getElementById('user_section').appendChild(logoutButton);
}

function login(username, password) {
  var data = `action=login&username=${username}&password=${password}`;
  $.ajax({
    type:'POST',
    data: data,
    url: 'php/usersAPI.php',
    success: function(response){
      console.log(response);
      //appendLogoutButton();                              
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
      //appendLoginButton();                                            
      window.location.reload();      
    }
  });
}

function createUser(username, password){
  var data = `action=new_user&username=${username}&password=${password}`;
  $.ajax({
    type:'POST',
    data: data,    
    url: 'php/usersAPI.php',
    success: function(response){
      console.log(response);                                    
    }
  });  
}

$(document).ready(function () {
  $('#login').click(function () {
    //console.log('click1');
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    login(username, password);
  });
  $('#logout').click(function () {
    //console.log('click1');
    logout();
  });
  $('#createUser').click(function () {
    //console.log('click1');
    var username = document.getElementById("newUsername").value;
    var password = document.getElementById("newPassword").value;
    createUser(username, password)
  });
});
