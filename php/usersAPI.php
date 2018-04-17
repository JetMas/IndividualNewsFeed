<?php
//Author: Jethro Masangya
//Description: Provides Api for accessing the users json file.
session_start();

$users = json_decode(file_get_contents('json/users.json'), true);

function get_users() {
    return $users;
}

function get_user_by_username($username){
    foreach($users as $user){
        if(strcasecmp($user['username'],$username) == 0){
            return $user;
        }
    }
    return null;
}

function new_user($username, $password){
    $new_user = array(
        'username' => $username,
        'password' => $password
    );
    array_push($users, $new_user);
    file_put_contents('json/users.json', json_encode($users));
}

function user_login($username, $password){
    $user = get_user_by_username($username);
    if(strcmp($user['password'],$password) == 0){
        $_SESSION['user'] = $username;
        return true;
    }
    else{
        return false;
    }
}

$accepted_URL = array("get_users", "get_user_by_username", "new_user", "login");
$value = "An error has occured";

if(isset($_GET["action"]) && in_array($_GET["action"], $accepted_URL)){
    switch($_GET["action"]){
        case "get_users":
            $value = get_users();
            break;
        case "get_user_by_username":
            if(isset($_GET["username"])){
                $value = get_user_by_username($_GET["username"]); 
            }   
            else {
                $value = "Missing argument";
            }        
            break;
        default:
            $value = "Unkown action.";            
    }
}

if(isset($_POST["action"]) && in_array($_POST["action"], $accepted_URL)){
    switch($_POST["action"]){
        case "new_user":
            if(isset($_POST["username"]) && isset($_POST["password"])){
                if(get_user_by_username($_POST["username"])!=null){
                    new_user($_POST["username"], $_POST["password"]);
                    $value = "User successfully created.";
                }
                else{
                    $value = $_POST["username"] + "Username already taken.";
                }
            }
            else {
                $value = "Missing argument";
            }
            break;
        case "login":
            if(isset($_POST["username"]) && isset($_POST["password"])){
                if(get_user_by_username($_POST["username"])!=null){
                    if(user_login($_POST["username"], $_POST["password"])){
                        $value = "Login successful.";
                    }
                    else {
                        $value = "Wrong username or password.";                        
                    }
                }
                else{
                    $value = "User does not exist.";
                }
            }
            else {
                $value = "Missing argument";
            }
            break;
        default:
            $value = "Unkown action.";
    }
}

exit(json_encode($value));
?>