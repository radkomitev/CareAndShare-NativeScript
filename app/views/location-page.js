var frameModule = require("ui/frame");

function pageLoaded(args) {
	var page = args.object;	
	loadUi(page);
}

exports.goToCameraPage = function() {

	var topmost = frameModule.topmost();

	//TODO: replace MYlocation with real string location
	var navigationEntry = {
		moduleName: "./views/camera-page",
		context: {
			locationProblem: "MyLocation"
		},
		animated: true
	};

	topmost.navigate(navigationEntry);
}

function loadUi(page) {

	var myPage = page.getViewById("locationPage");
	myPage.backgroundImage = "~/eee.jpg";

	var cameraBtn = page.getViewById("goToCameraBtn");
	cameraBtn.backgroundImage = "~/yellow.jpg";

}

exports.pageLoaded = pageLoaded;