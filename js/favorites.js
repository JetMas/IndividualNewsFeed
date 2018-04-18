
function favorite(element){
    console.log(element);
    console.log($(element).closest("#articleInfo").find("#title"));
    console.log($(element).closest("#articleInfo").find("#link"));
    console.log($(element).closest("#articleInfo").find("#title").attr('text'));
    console.log($(element).closest("#articleInfo").find("#link").attr('href'));
}