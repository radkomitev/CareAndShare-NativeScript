var frameModule = require("ui/frame");

function pageLoaded(args) {
	var page = args.object;
}

exports.goToCameraPage = function() {
	var topmost = frameModule.topmost();
	topmost.navigate("./views/camera-page");
}

exports.pageLoaded = pageLoaded;