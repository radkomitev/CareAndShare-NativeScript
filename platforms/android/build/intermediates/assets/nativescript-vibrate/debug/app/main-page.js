var frameModule = require("ui/frame");
var view = require("ui/core/view");
var colorModule = require("color");
var actionBarModule = require("ui/action-bar");

var ImageModule = require("ui/image");
var view = require("ui/core/view");

var page;
var isClicked = true;

function pageLoaded(args) {
    page = args.object;

    var myPage  = page.getViewById("initialPage");
    myPage.backgroundImage = "~/eee.jpg";

    var btnSubmit  = page.getViewById("buttonSubmitProblem");
    btnSubmit.backgroundImage = "~/yellow.jpg";
    var btnList  = page.getViewById("buttonListProblem");
    btnList.backgroundImage = "~/yellow.jpg";
    var btnHelp  = page.getViewById("buttonAboutCareAndShare");
    btnHelp.backgroundImage = "~/yellow.jpg";

}

exports.goToHelpPage = function(){
    var topmost = frameModule.topmost();
    topmost.navigate("./views/help-page");  
}

exports.goToLocationPage = function(){
	var topmost = frameModule.topmost();
	topmost.navigate("./views/location-page");  
}

exports.goTolistProblemsPage = function(){
	var topmost = frameModule.topmost();
	topmost.navigate("./views/list-page");  
}

exports.aboutApp = function(){
	var textView = page.getViewById("labelAboutApp");
	var button = page.getViewById("buttonAboutCareAndShare");
	if(isClicked){
	    isClicked = false;
	    button.animate({
	    	opacity:0.5
	    });
        textView.animate({
        translate: { x: 0, y: -40 },
        opacity: 1,
        duration: 2000,
        translate: { x: 0, y: 40 },
    });
    }
    else {
    	isClicked = true;
        button.animate({
	    	opacity:1
	    });
    	textView.animate({
    	translate: { x: 0, y: 40 },
    	opacity: 0,
  	    duration: 2000,
  	    translate: { x: 0, y: -40 },
    });
    }
}

exports.pageLoaded = pageLoaded;