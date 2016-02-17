var frameModule = require("ui/frame");

function pageLoaded(args) {
	var page = args.object;
}

exports.goToCameraPage = function() {

    var topmost = frameModule.topmost();

	var navigationEntry = {
   	 moduleName: "./views/camera-page",
   	 context: {locationProblem: "MyLocation"},
   	 animated: true
	};

	topmost.navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;