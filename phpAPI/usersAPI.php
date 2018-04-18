<?php
//Author: Jethro Masangya
//Description: Provides Api for accessing the users json file.
session_start();

$users_file_path = "/users.json";
$users_str = file_get_contents($users_file_path);
$users_array = json_decode($users_str, true);
  

function get_users() {
    return $users;
}

function get_user_by_username($username){   
    foreach ($GLOBALS['users_array'] as $user){
        if(strcasecmp($user['username'],$username) == 0){
            return $user;
        }
    }
    return null;
}

//Creates a new user
//endcodes the user info and adds it to users.json.
function new_user($username, $password){
    $new_user = array(
        'username' => $username,
        'password' => $password
    );
    array_push($GLOBALS['users_array'], $new_user);
    print_r(json_encode($GLOBALS['users_array']));
    file_put_contents($GLOBALS['users_file_path'], json_encode($GLOBALS['users_array']));
}

//Login user
//Checks if the recorded user password is equal to the provided password.
function user_login($username, $password){
    $user = get_user_by_username($username);
    if(strcmp($user["password"],$password) == 0){
        $_SESSION['user'] = $user['username'];
        return true;
    }
    else{
        return false;
    }
}

//Logout user
//Sets the session variable for 'session' to an empty string.
function user_logout(){
    $_SESSION['user'] = '';
}

$accepted_URL = array("get_users", "get_user_by_username", "new_user", "login", "logout");
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
                if(get_user_by_username($_POST["username"])===null){
                    new_user($_POST["username"], $_POST["password"]);
                    $value = "User successfully created.";
                }
                else{
                    $value = "Username already taken.";
                }
            }
            else {
                $value = "Missing argument";
            }
            break;
        case "login":
            if(isset($_POST["username"]) && isset($_POST["password"])){
                if(get_user_by_username($_POST["username"])!==null && user_login($_POST["username"], $_POST["password"])){
                        $value = "Login successful.";
                }
		        else{
                    $value = "Wrong username or password.";                        
                }
            }
            else {
                $value = "Missing argument";
            }
            break;
        default:
            $value = "Unkown action.";
        case "logout":
            user_logout();
            $value = "Logout successful";            
            break;
    }
}

exit(json_encode($value));
?>
