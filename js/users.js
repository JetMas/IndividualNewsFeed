const userFile = 'json/users.json';

function login(username, password) {
  $.getJSON(userFile, function(data){
    console.log(data);
    $.each(data, function(key, val) {
      console.log(`${key} : ${val.username}`);
    });
  });
}


$(document).ready(function () {
  $('#login').click(function () {
    //console.log('click1');
    login('user', 1234);
  });
});
