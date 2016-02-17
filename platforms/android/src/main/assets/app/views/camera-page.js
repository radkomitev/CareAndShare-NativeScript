var frameModule = require("ui/frame");
var camera = require("camera");
var imageSource = require("image-source");
var Everlive = require("~/libs/everlive/everlive.all.min");
var el = new Everlive('wzgxk32dkp4rhuz0');
var myImage;
var fileId;
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
		imageToPass = myImage.imageSource.toBase64String('.jpg', 100);
		var file = {
			Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
			ContentType: "image/jpeg",
			base64: imageToPass
		};
		el.Files.create(file, function(response) {

			fileId = response.result.Id;
			console.log('FILE ID  +++ ' + fileId);
		}, function(err) {
			console.log("Unfortunately the upload failed: " + err.message);
		});
	});
}

exports.goToDetailsPage = function() {

	var topmost = frameModule.topmost();
console.log(fileId);
	var navigationEntry = {
		moduleName: "./views/details-page",
		context: {
			image: fileId,
			location: myLocation
		},
		animated: false
	};

	topmost.navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.takePicture = takePicture;