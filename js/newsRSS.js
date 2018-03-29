
var handleData = function(data) {
  // data is a DOM-like object, so `querySelectorAll` works
  const items = Array.from(data.querySelectorAll('item'));

  // map the list of items into nodes for html
  const nodes = items.map(function(item) {
    //Get node in html with the proper bootstrap classes
    const articleNode = document.getElementById('article').cloneNode(true);

    // make a node of the image
    const imageNode = articleNode.querySelector('img[id="image"]');
    //imageNode.className = 'img-thumbnail'
    //imageNode.setAttribute('id', 'articleImage');
    const mediaContent = item.getElementsByTagName('media:content')[0];
    //Some stories have images and some don't
    if (mediaContent){
      imageNode.src = mediaContent.getAttribute('url');
    }
    else {
      imageNode.src = 'images/placeHolder.jpg';
    }
    //articleNode.querySelector('div[id="imageWrapper"]').innerHTML = '';
    //articleNode.querySelector('div[id="imageWrapper"]').appendChild(imageNode);

    // make a node for the title
    const titleNode = articleNode.querySelector('a[id="title"]');
    titleNode.href = item.querySelector('link').textContent;
    titleNode.innerHTML = item.querySelector('title').textContent + '&nbsp;';
    //articleNode.querySelector('div[id="title"]').innerHTML = '';
    //articleNode.querySelector('div[id="title"]').appendChild(titleNode);

    // make a node for the date
    const dateNode = articleNode.querySelector('div[id="pubDate"]');
    dateNode.innerHTML = item.querySelector('pubDate').textContent + '&nbsp;';
    //articleNode.querySelector('div[id="pubDate"]').innerHTML = item.querySelector('pubDate').textContent;
    //articleNode.querySelector('div[id="pubDate"]').appendChild(dateNode);

    // make a node for the description
    const descriptionNode = articleNode.querySelector('p[id="description"]');
    descriptionNode.innerHTML = item.querySelector('description').textContent + '&nbsp;';
    //articleNode.querySelector('div[id="description"]').innerHTML = item.querySelector('description').textContent;
    //articleNode.querySelector('div[id="description"]').appendChild(descriptionNode);

    // make a node for the link
    const linkNode = articleNode.querySelector('a[id="link"]');
    linkNode.href = item.querySelector('link').textContent;
    //linkNode.textContent = '(link)';
    //articleNode.querySelector('div[id="description"]').appendChild(linkNode);


    /*
    const infoNode = document.createElement('div');
    infoNode.className = 'col-md-10';
    infoNode.appendChild(titleNode);
    infoNode.appendChild(dateNode);
    infoNode.appendChild(descriptionWrap);
    //infoNode.appendChild(linkNode);

    // make a node for everything
    const articleNode = document.createElement('div');
    articleNode.className = 'row justify-content-md-center';
    articleNode.appendChild(imageWrap);
    articleNode.appendChild(infoNode);
    */
    return articleNode;
  });

  // clear out the container
  const container = document.getElementById('content');
  container.innerHTML = '';

  // append them all to the container
  nodes.forEach(function(node) {
    container.appendChild(node);
  });
};

function createsCORSRequest(method, url){
  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  }
  else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  }
  else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}

var handleSelectionChange = function() {
  // store the radio buttons as an array
  const buttons = Array.from(document.querySelectorAll('input[name="newsOptions"]'));

  // find the button that is checked and get its value
  const newsType = buttons.find(function(button) {
    return button.checked;
  }).value;

  //Uses New Yorks Times' RSS feed
  const url = `http://rss.nytimes.com/services/xml/rss/nyt/${newsType}.xml`;

  const xhr = createsCORSRequest('GET', url);
  if(!xhr){
    const container = document.querySelector('content');
    container.innerHTML = '';
    container.textValue = 'An error occured reading the stream';
  }

  xhr.onload = function() {
    if (xhr.status === 200) {
      handleData(xhr.responseXML);
    } else {
      const container = document.querySelector('content');
      container.innerHTML = '';
      container.textValue = 'An error occured reading the stream';
    }
  };

  xhr.send();
};

var selectionChangeOnClick = function(value) {
  //Uses New Yorks Times' RSS feed
  const url = `http://rss.nytimes.com/services/xml/rss/nyt/${value}.xml`;

  const xhr = createsCORSRequest('GET', url);
  if(!xhr){
    const container = document.querySelector('content');
    container.innerHTML = '';
    container.textValue = 'An error occured reading the stream';
  }

  xhr.onload = function() {
    if (xhr.status === 200) {
      handleData(xhr.responseXML);
    } else {
      const container = document.querySelector('content');
      container.innerHTML = '';
      container.textValue = 'An error occured reading the stream';
    }
  };

  xhr.send();
};

var init = function() {
  // connect the change of event of the form to the method
  /*document.getElementById('newsSelector').addEventListener('change',
      handleSelectionChange);*/

  document.getElementsByName("newsButton").forEach(function (element, index){
    element.addEventListener("click", function(){
      //console.log(element.querySelector('input').value);
      //The input element is wrapped inside a label element
      selectionChangeOnClick(element.querySelector('input').value);
    });
  });
  //handleSelectionChange(); // call the method to simulate the first
                           // selection

  //Click the first button for the first selection.
  //The first button should be set active.
  document.querySelector("label[name='newsButton']").click();
};

// call init when the page has loaded
window.onload = init;
