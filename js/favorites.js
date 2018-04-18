
function favorite(element){
    console.log(element);
    console.log($(element).closest("#articleInfo").find("#title").innerHTML);
    console.log($(element).closest("#articleInfo").find("#link").href);
}