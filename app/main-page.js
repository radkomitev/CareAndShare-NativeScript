var frameModule = require("ui/frame");
var view = require("ui/core/view");

function pageLoaded(args) {
    var page = args.object;
}

exports.goToLocationPage = function(){
	var topmost = frameModule.topmost();
	topmost.navigate("./views/location-page");  
}

exports.goTolistProblemsPage = function(){
	var topmost = frameModule.topmost();
	topmost.navigate("./views/list-page");  
}