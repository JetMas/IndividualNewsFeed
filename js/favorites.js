

$(document).ready(function () {
    console.log("Adding favorite onlcick");
    console.log($(".favoriteButton"));
    $(".favoriteButton").click(function () {
        console.log('click1');   
        console.log($(this).closest("#title").innerHTML);
        console.log($(this).closest("#link").href);
    });
});