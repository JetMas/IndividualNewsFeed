
function favorite(element){
    console.log(element);   
    console.log(element.closest("#articleInfo").find("#title"));
    console.log(element.closest("#articleInfo").find("#link"));
}