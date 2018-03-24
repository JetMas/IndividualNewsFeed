var handleData = function(data) {
  // data is a DOM-like object, so `querySelectorAll` works
  const items = Array.from(data.querySelectorAll('item'));

  // map the list of items into nodes for html
  const nodes = items.map(function(item) {
    // make a node of the image
    const imageNode = document.createElement('img');
    const mediaContent = item.getElementsByTagName('media:content')[0];
    //Some stories have images and some don't
    if (mediaContent){
      console.log(mediaContent.getAttribute('url'));
      imageNode.src = mediaContent.getAttribute('url');
    }

    // make a node for the title
    const titleNode = document.createElement('strong');
    titleNode.innerHTML = item.querySelector('title').textContent +
      '&nbsp;';

    // make a node for the date
    const dateNode = document.createElement('em');
    dateNode.innerHTML = item.querySelector('pubDate').textContent +
      '&nbsp;';

    // make a node for the link
    const linkNode = document.createElement('a');
    linkNode.href = item.querySelector('link').textContent;
    linkNode.textContent = '(link)';

    // make a node for everything
    const articleNode = document.createElement('article');
    articleNode.appendChild(imageNode);
    articleNode.appendChild(titleNode);
    articleNode.appendChild(dateNode);
    articleNode.appendChild(linkNode);

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
  const buttons = Array.from(document.querySelectorAll('input'));

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

var init = function() {

  // connect the change of event of the form to the method
  document.querySelector('form').addEventListener('change',
      handleSelectionChange);

  handleSelectionChange(); // call the method to simulate the first
                           // selection
};

// call init when the page has loaded
window.onload = init;
