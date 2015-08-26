//main.js

//*******************html content*******************
var homeURL = "htmlContent/home.html";


//*******************get dom elements*******************
//get all links from nav wrapper and store them in an array
var navDiv = document.getElementById("nav-wrapper");
var lst = navDiv.getElementsByTagName('a');

//get all links from nav wrapper and store them in an array
var mobileNavDiv = document.getElementById("nav-wrapper-mobile");
var mobileLst = mobileNavDiv.getElementsByTagName('a');

//main content div
var contentDiv = document.getElementById("content");

//nav-panel-mobile for collapsing nav onclick
var navPanelMobile = document.getElementById("nav-panel-mobile");


//*******************onload event*******************
// when window loads, setup events on buttons and browser
window.onload = function() {
	if (supports_history_api()){
		//parse url and load page once at the beginning
		//used incase the visitor is coming from an external site (or bookmark)
 		var url = parseURL();
 		loadPage(url, false);

 		//add click events to all buttons in the nav-wrapper
		for (var i=0; i<lst.length; i++){
			addClicker(lst[i]);
		}

 		//add click events to all buttons in the nav-wrapper-mobile
		for (var i=0; i<mobileLst.length; i++){
			addClicker(mobileLst[i]);
		}

		window.addEventListener("popstate", function(e) {
			//for debugging
			console.log("pop");

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
		newHash = "#home";
	}
	newHash = newHash.slice(1);
    	var newURL = "htmlContent/" + newHash + ".html";
    	return newURL;
}


// add event listener to html element to load page when clicked on
function addClicker(element) {
  	element.addEventListener("click", function(e) {
		//for debugging
		console.log("click");

  		//prevend default action of button
  		e.preventDefault();

  		//check for href of element that was clicked on
	     	var pushURL = element.href;
		var index = pushURL.indexOf("#");

		//if there is no href, the user is trying to go home
		if (index<0){
			pushURL = "home";
			var fullURL = window.location.protocol + "//" + window.location.hostname + "/" + "rextwedt.com/";
		} else {
			pushURL = pushURL.slice(index+1);
			var fullURL = window.location.protocol + "//" + window.location.hostname + "/" + "rextwedt.com/#" + pushURL;
		}

		//if user clicks on projects or gallery button or mobile menu button, cancel the ajax call, you don't want to load these pages!
		if (pushURL == "projects" || pushURL == "gallery" || pushURL == "nav-panel-mobile"){
			return false;
		}
		
		//create url for ajax call
		pushURL = "htmlContent/" + pushURL + ".html";


		//go here for readable json of blog:
		//http://retwedt.tumblr.com/api/read/json?debug=1

		// //tumblr feed test
		// if (pushURL == "home"){
		// 	console.log("home!");
		// 	var titleCheck = tumblr_api_read['posts'][1]['regular-title'];
		// 	var bodyCheck = tumblr_api_read['posts'][1]['regular-body'];
		// 	var urlCheck = tumblr_api_read['posts'][1]['url'];
		// 	contentDiv.innerHTML = titleCheck + "<br>" + bodyCheck + "<br>" + urlCheck;
		// } else {
		// 	//create url for ajax call
		// 	pushURL = "htmlContent/" + pushURL + ".html";
		// 	loadPage(pushURL, true);
		// }


		loadPage(pushURL, true);
	     	history.pushState(" ", null, fullURL);

	     	//close nav panel after click, from bootstrap docs
	     	$('#nav-panel-mobile').collapse('hide');
	     	$('#projects').collapse('hide');
	     	$('#gallery').collapse('hide');
	}, true);
}



// var titleCheck = tumblr_api_read['posts'][0]['regular-title'];
// var bodyCheck = tumblr_api_read['posts'][0]['regular-body'];
// var urlCheck = tumblr_api_read['posts'][0]['url'];
// console.log(titleCheck + ", " + bodyCheck + ", " + urlCheck);