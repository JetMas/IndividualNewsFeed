
function favorite(element){
    console.log(element);
    console.log($(element).closest("#articleInfo").find("#title"));
    console.log($(element).closest("#articleInfo").find("#link"));
    console.log($(element).closest("#articleInfo").find("#title").textContent);
    console.log($(element).closest("#articleInfo").find("#link").attr('href'));
}