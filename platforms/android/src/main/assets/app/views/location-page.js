var frameModule = require("ui/frame");
var geolocation = require("nativescript-geolocation");
var observable = require("data/observable");
var observable_array = require("data/observable-array");
var dialogs = require("ui/dialogs");
var mySwitch;

function pageLoaded(args) {
	var page = args.object;

	mySwitch = page.getViewById("switchForEnableLocation");

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

exports.changeS = function(args) {

	if (mySwitch.checked === true) {
		console.log(mySwitch.checked);
		var isEnabled = geolocation.isEnabled();
		if (!isEnabled) {

			geolocation.enableLocationRequest();

		}
	} else {

		console.log(false);
	}
}

exports.takeLocation = function(args) {

	if (mySwitch.checked === true) {
		var location = geolocation.getCurrentLocation({
			desiredAccuracy: 3,
			updateDistance: 10,
			maximumAge: 20000,
			timeout: 20000
		}).
		then(function(loc) {
			if (loc) {
				//console.log("Current location is: " + JSON.stringify(loc));
				console.log("latitude ++++ " + loc.latitude);
				console.log("longitude ++++ " + loc.longitude);				

			}
		}, function(e) {
			dialogs.alert({
				title: "Problem with taking location",
				message: e.message,
				okButtonText: "Ok"
			});
			console.log("Error: " + e.message);
		});
	} else {
		dialogs.alert({
			title: "Switch is not on",
			message: "Switch for location is not on",
			okButtonText: "Ok"
		});
	}

}

function loadUi(page) {

	var myPage = page.getViewById("locationPage");
	myPage.backgroundImage = "~/eee.jpg";

	var cameraBtn = page.getViewById("goToCameraBtn");
	cameraBtn.backgroundImage = "~/yellow.jpg";

	var locationBtn = page.getViewById("takeLocationBtn");
	locationBtn.backgroundImage = "~/yellow.jpg";

}

exports.pageLoaded = pageLoaded;