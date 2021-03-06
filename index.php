<?php
session_start();
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>News Feed</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="css/style.css">

  <!-- Load in the RSS reader -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>
  <script type='text/javascript' src="js/newsRSS.js"></script>
  <script type='text/javascript' src="js/users.js"></script>
  <script type='text/javascript' src="js/favorites.js"></script>    
</head>

<body>

<nav class="navbar navbar-expand-md navbar-light bg-light fixed-top ">
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <div id="newsSelector" class="navbar-nav mr-auto btn-group-toggle" data-toggle="buttons">
      <label class="btn btn-outline-primary active" name="newsButton">
        <input type="radio" name="newsOptions" value='US'/>US
      </label>

      <label class="btn btn-outline-primary" name='newsButton'>
        <input type='radio' name='newsOptions' value='World'/>World
      </label>

      <label class="btn btn-outline-primary" name='newsButton'>
        <input type='radio' name='newsOptions' value='Technology'/>Tech
      </label>

      <label class="btn btn-outline-primary" name='newsButton'>
        <input type='radio' name='newsOptions' value='Sports'/>Sports
      </label>

      <?php
        if($_SESSION['user'] != ''){
      ?>
        <label class="btn btn-outline-primary" name='favoritesButton' onclick="get_favorites()">
          <input type='radio' name='favorites'/>Favs
        </label>
      <?php 
        }
      ?>
    </div>

    <div class="inline my-2 my-lg-0" id="user_section">
      <?php 
        if($_SESSION['user'] != ''){
          echo '<label class="text-black" id="name">';
          echo $_SESSION["user"];
          echo '</label>';
          echo '<button class="btn btn-outline-success" id="logout">Logout</button>';
        }
        else {
          echo '<button class="btn btn-outline-success" data-toggle="modal" data-target="#loginModal">Login</button>';
          echo '<button class="btn btn-outline-success" data-toggle="modal" data-target="#newUserModal">Sign Up</button>';                      
        }
      ?>
    </div>
  </div>
</nav>



<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="loginModalLabel">Login with your username and password</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="username">Enter Username</label>
            <input type="text" class="form-control" id="username" placeholder="Username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button id="login" type="button" class="submit btn btn-primary" data-dismiss="modal">Login</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="newUserModal" tabindex="-1" role="dialog" aria-labelledby="newUserModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="newUserModalLabel">Create a new user.</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="username">Enter Username</label>
            <input type="text" class="form-control" id="newUsername" placeholder="Username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="newPassword" placeholder="Password">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button id="createUser" type="button" class="submit btn btn-primary" data-dismiss="modal">Sign Up</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<main class="container">
  <div id="notification" class="justify-content-center position-static">
  </div>
  <div id="content">
    <div id="article">
      <div class="card flex-md-row mb-4 box-shadow">
        <div id="articleInfo" class="card-body d-flex flex-column align-items-start">
            <h4 class="mb-0">
              <a id="title" class="text-dark" href="#">Title</a>
            </h4>        
            <div>    
              <span id="pubDate" class="mb-1 text-muted">
                Published Date
              </span>
              <button id="favoriteButton" type="button" class="favoriteButton btn btn-default btn-circle" onclick="new_favorite(this)">
                <i class="fa fa-heart"></i>
              </button>
            </div>
            <p id="description" class="card-text mb-auto">Description</p>
            <a id="link" href="#">Continue reading</a>
        </div>
        <div id="imageWrapper" class="mx-auto">
          <img id="image" class="card-img-right flex-auto d-none d-md-block">
        </div>
      </div>
    </div>
  </div>
</main>

</body>
</html>
