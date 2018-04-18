
function favorite(btn){
    console.log('click1');   
    console.log($(btn).closest("#title").innerHTML);
    console.log($(btn).closest("#link").href);
}