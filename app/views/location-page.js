var frameModule = require("ui/frame");
var geolocation = require("nativescript-geolocation");
var observable = require("data/observable");
var observable_array = require("data/observable-array");
var dialogs = require("ui/dialogs");
var http = require("http");
var locationToPass;
var mySwitch;
var cameraBtn;

function pageLoaded(args) {
	var page = args.object;

	mySwitch = page.getViewById("switchForEnableLocation");

	loadUi(page);
}

exports.goToCameraPage = function() {

	if (cameraBtn.enable) {
		var topmost = frameModule.topmost();

		if (!locationToPass) {
			locationToPass = "No added location";
		}

		var navigationEntry = {
			moduleName: "./views/camera-page",
			context: {
				locationProblem: locationToPass
			},
			animated: true
		};

		topmost.navigate(navigationEntry);
	}
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

	cameraBtn.enable = false;

	if (mySwitch.checked === true) {
		var location = geolocation.getCurrentLocation({
			desiredAccuracy: 3,
			updateDistance: 10,
			maximumAge: 20000,
			timeout: 20000
		}).
		then(function(loc) {
				if (loc) {

					console.log("latitude ++++ " + loc.latitude);
					console.log("longitude ++++ " + loc.longitude);

					var lat = loc.latitude;
					var logn = loc.longitude;

					var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + logn + "&key=AIzaSyB6DUf9Jr8CHXH9YzA-U3wj5pykZ8_gdQw";


					http.getJSON(url).then(function(r) {

							locationToPass = JSON.stringify(r.results[0].formatted_address);

							while (locationToPass.indexOf("\\") > 0) {
								locationToPass = locationToPass.replace("\\", " ");
							}

							cameraBtn.enable = true;
							console.log("My adrress" + locationToPass);
						},
						function(e) {
							cameraBtn.enable = true;
							console.log("Error with talking location like string" + e);

						});


				}
			},
			function(e) {
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

	cameraBtn = page.getViewById("goToCameraBtn");
	cameraBtn.enable = true;
	cameraBtn.backgroundImage = "~/yellow.jpg";

	var locationBtn = page.getViewById("takeLocationBtn");
	locationBtn.backgroundImage = "~/yellow.jpg";

}

exports.pageLoaded = pageLoaded;