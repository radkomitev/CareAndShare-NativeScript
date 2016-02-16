var frameModule = require("ui/frame");

function pageLoaded(args) {
<<<<<<< HEAD
    var page = args.object;
   // page.addCssFile("./styles/location-page");
}

exports.goToCameraPage = function(){
	var topmost = frameModule.topmost();
	topmost.navigate("./views/camera-page");  
}

exports.pageLoaded = pageLoaded;
=======
	var page = args.object;
}

exports.goToCameraPage = function() {
	var topmost = frameModule.topmost();
	topmost.navigate("./views/camera-page");
}

exports.pageLoaded = pageLoaded;
>>>>>>> origin/master
