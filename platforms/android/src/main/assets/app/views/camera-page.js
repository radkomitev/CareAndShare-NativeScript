var frameModule = require("ui/frame");
var camera = require("camera");
var imageSource = require("image-source");
var Everlive = require("~/libs/everlive/everlive.all.min");
var el = new Everlive('wzgxk32dkp4rhuz0');
var myImage;
var myLocation;
var isImageClicked = false;
var imageToPass;

function pageLoaded(args) {
	var page = args.object;

	page.bindingContext = page.navigationContext;
	myLocation = page.bindingContext.locationProblem;

	myImage = page.getViewById("myImg");
	myImage.on('doubleTap', function(args) {
		if (!isImageClicked) {
			isImageClicked = true;
			myImage.width *= 2;
			myImage.height *= 2;
		} else {
			myImage.width *= 0.5;
			myImage.height *= 0.5;
			isImageClicked = false;
		}
	});
}

function takePicture() {
		camera.takePicture().then(function(picture) {
		myImage.imageSource = picture;
			console.log("0");
		imageToPass = myImage.imageSource.toBase64String('.jpg', 100);
	console.log("1");
		var file = {
			Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
			ContentType: "image/jpeg",
			base64: imageToPass
		};
	console.log("2");
		el.Files.create(file, function(response) {
			var fileUri = response.result.Uri;
			console.log('FILE URI   +++ ' + fileUri);
		}, function(err) {
			console.log("Unfortunately the upload failed: " + err.message);
		});
			console.log("3");
	});
}

exports.goToDetailsPage = function() {

	var topmost = frameModule.topmost();

	var navigationEntry = {
		moduleName: "./views/details-page",
		context: {
			image: imageToPass,
			location: myLocation
		},
		animated: false
	};

	topmost.navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.takePicture = takePicture;