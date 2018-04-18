
function handle_data(data){
    let favJSON = JSON.parse(data);

    let nodes = [];
    //Create articles for favorites
    for(var i = 0; i < favJSON.length; i++) {
        let articleNode = document.getElementById('article').cloneNode(true);
        
        let titleNode = articleNode.querySelector('a[id="title"]');
        titleNode.innerHTML = favJSON[i].title;    
        titleNode.href = favJSON[i].url;


        const imageNode = articleNode.querySelector('img[id="image"]');
        imageNode.src = "";


        const dateNode = articleNode.querySelector('span[id="pubDate"]');
        dateNode.innerHTML = "";

        const descriptionNode = articleNode.querySelector('p[id="description"]');
        descriptionNode.innerHTML = "";

        const linkNode = articleNode.querySelector('a[id="link"]');
        linkNode.href = favJSON[i].url;

        nodes.push(articleNode);
    }
    // clear out the container
    const container = document.getElementById('content');
    container.innerHTML = '';

    // append them all to the container
    nodes.forEach(function(node) {
        container.appendChild(node);
    });   
}

function get_favorites(){
    var data = `action=get_favorites`;        
    $.ajax({
        type:'GET',
        data: data,    
        url: 'php/favoritesAPI.php',
        success: function(response){
            //console.log(response);
            handle_data(response);                                                                                                              
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