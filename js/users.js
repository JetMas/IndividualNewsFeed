const userFile = 'json/users.json';

function login(username, password) {
  $.getJSON(userFile, function(data){
    $.each(data, function(key, val) {
      console.log(`${key} : ${value}`);
    });
  });
}


$(document).ready(function () {
  $('#login').click(function () {
    //console.log('click1');
    login('user', 1234);
  });
});
