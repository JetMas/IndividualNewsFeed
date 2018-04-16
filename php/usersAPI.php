<?php
//Author: Jethro Masangya
//Description: Provides Api for accessing the users json file.

$users = json_decode(file_get_contents('json/users.json'), true);

function get_users() {
    return $users;
}

function get_user_by_id($id){
    
}

?>