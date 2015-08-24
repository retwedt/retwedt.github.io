//main.js

//*******************html content*******************
var homeURL = "htmlContent/home.html";


//*******************get dom elements*******************
//button elements
var homeImg = document.getElementById("homeImg");
var title = document.getElementById("title");


//main content div
var contentDiv = document.getElementById("content");


//*******************setup buttons*******************
//setup nav bar events
homeImg.onclick = function() { loadPage(homeURL, true);}
title.onclick = function() { loadPage(homeURL, true);}



// when window loads, setup events on buttons and browser
window.onload = function() {
	if (supports_history_api()){

		//parse url and load page once at the beginning
		//used incase the visitor is coming from an external site (or bookmark)
 		var url = parseURL();
 		loadPage(url, false);

 		//add click events to buttons
		addClicker(aboutLink);
		addClicker(newsLink);
		// addClicker(projectsLink, null, null);
		// addClicker(galleryLink, null, null);
		addClicker(contactLink);

		window.addEventListener("popstate", function(e) {
	 		var url = parseURL();
	 		loadPage(url, false);
	    	}
		, false);
	}
}





// check if browser supports history api
function supports_history_api() {
	if (window.history){
		if (history.pushState){
			return true;
		}
	} else {
		console.log("history api not supported!");
		return false;
	}
}


// load page function
function loadPage(url, addToHistory){
	if (url!=null){
		//send request
		var requestReturn = "";
		var myRequest = new XMLHttpRequest();
		myRequest.open("GET", url, true);
		myRequest.onreadystatechange = function () {
			//process request function
			if (myRequest.readyState === 4 && myRequest.status === 200) {
				contentDiv.innerHTML = myRequest.responseText;
			}
		}
		myRequest.send();
	}
}


//get hash from current url, construct custom url for ajax call
function parseURL(){
	var newHash = window.location.hash;
	//if there is no hash (you are trying to go to the homepage)
	if (!newHash){
		newHash = "#home"
	}
	newHash = newHash.slice(1);
    	var newURL = "htmlContent/" + newHash + ".html";
    	return newURL;
}


// add event listener to html element to load page when clicked on
function addClicker(element) {
  	element.addEventListener("click", function(e) {
  		e.preventDefault();
	     	var pushURL = element.id;
	    	pushURL = pushURL.slice(0, -4);
	    	var hash = pushURL;
	    	hash = "#" + hash;
	    	pushURL = "htmlContent/" + pushURL + ".html";

	    	// var fullURL = window.location.protocol + "//" + window.location.hostname + "/" + hash;
	    	var fullURL = window.location.protocol + "//" + window.location.hostname + "/" + "rextwedt.com/" + hash;

	     	loadPage(pushURL, true);
	     	history.pushState(" ", null, fullURL);
	}, true);
}



