
function handle_data(data){
    var favJSON = JSON.parse(data);
    const articleNode = document.getElementById('article').cloneNode(true);
    const titleNode = articleNode.querySelector('a[id="title"]');
    titleNode.href = item.querySelector('link').textContent;
    titleNode.innerHTML = item.querySelector('title').textContent;    
}

function get_favorites(){

    var data = `action=get_favorites`;        
    $.ajax({
        type:'GET',
        data: data,    
        url: 'php/favoritesAPI.php',
        success: function(response){
            //console.log(response);                                                                                                              
        }
    });
}



function new_favorite(element){
    var title = $(element).closest("#articleInfo").find("#title").text();
    var url = $(element).closest("#articleInfo").find("#link").attr('href');

    var data = `action=new_favorite&title=${title}&url=${url}`;    
    $.ajax({
        type:'POST',
        data: data,    
        url: 'php/favoritesAPI.php',
        success: function(response){
            //console.log(response);
            alert(response);            
            $(element).removeClass('btn-default');
            $(element).addClass('btn-danger');                                                                                                              
        }
    });
}