'use strict';

let view = require('ui/core/view');
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
var zoomInfoLabel;
var imageSet = false;

function pageLoaded(args) {
	var page = args.object;

	page.bindingContext = page.navigationContext;
	myLocation = page.bindingContext.locationProblem;

	myImage = page.getViewById("myImg");
	zoomInfoLabel = page.getViewById("zoomInfo");
	if (!imageSet) {};

	myImage.on('doubleTap', function(args) {

		if (!isImageClicked) {
			console.log("first");
			isImageClicked = true;
			// myImage.width *= 2;
			// myImage.height *= 2;
			myImage.animate({
				duration: 3000,
				rotate: 360,
				scale: {
					x: 1.5,
					y: 1.5
				}
			});

			zoomInfoLabel.text = "long press to zoom out";
		}
	});

	myImage.on('longPress', function(args) {
		if (isImageClicked) {
			console.log("second");
			myImage.animate({
				duration: 3000,
				rotate: 0,
				scale: {
					y: 1,
					x: 1
				}
			});
			// myImage.width *= 0.5;
			// myImage.height *= 0.5;
			isImageClicked = false;
			zoomInfoLabel.text = "double tap to zoom in";
		}
	});
}

function takePicture() {


	camera.takePicture().then(function(picture) {
		myImage.imageSource = picture;

		zoomInfoLabel.visibility = "visible";
		imageToPass = myImage.imageSource.toBase64String('.jpg', 100);
		var file = {
			Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
			ContentType: "image/jpeg",
			base64: imageToPass
		};
		el.Files.create(file, function(response) {

			fileId = response.result.Id;
			console.log('FILE ID  +++ ' + fileId);
			imageSet = true;

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