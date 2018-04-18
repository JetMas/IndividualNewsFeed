<?php
//Author: Jethro Masangya
//Description: Provides Api for accessing the users json file.
session_start();

$favorites_file_path = "favorites.json";
$favorites_str = file_get_contents($favorites_file_path);
$favorites_array = json_decode($favorites_str, true);
  

function get_favorites($username) {
    $favorites = array();
    foreach($GLOBALS['favorites_array'] as $favorite){
        if(strcasecmp($favorite['username'], $username) == 0){
            array_push($favorites, $favorite);
        }
    }
    return $favorites;
}


//Creates a new user
//endcodes the user info and adds it to users.json.
function new_favorite($username, $title, $url){
    $new_favorite = array(
        'username' => $username,
        'title' => $title,
        'url' => $url
    );
    array_push($GLOBALS['favorites_array'], $new_favorite);
    //print_r(json_encode($GLOBALS['favorites_array']));
    file_put_contents($GLOBALS['favorites_file_path'], json_encode($GLOBALS['favorites_array']));
}

$accepted_URL = array("get_favorites", "new_favorite");
$value = "An error has occured";

if(isset($_GET["action"]) && in_array($_GET["action"], $accepted_URL)){
    switch($_GET["action"]){
        case "get_favorites":
            if($_SESSION['user'] != ''){
                $value = get_favorites($_SESSION['user']);
            }
            else {
                $value = "Must be logged in to favorite stories.";
            }
            break;
        default:
            $value = "Unkown action.";            
    }
}
if(isset($_POST["action"]) && in_array($_POST["action"], $accepted_URL)){
    switch($_POST["action"]){
        case "new_favorite":
            if(isset($_POST["title"]) && isset($_POST["url"])){
                if($_SESSION['user'] != ''){
                    new_favorite($_SESSION['user'], $_POST["title"], $_POST["url"]);
                    $value = "Article saved.";                    
                }
                else {
                    $value = "Must be logged in to create new favorite.";
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
