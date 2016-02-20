'use strict';

let view = require('ui/core/view');
var frameModule = require("ui/frame");
var camera = require("camera");
var imageSource = require("image-source");
var Everlive = require("~/libs/everlive/everlive.all.min");
var el = new Everlive('wzgxk32dkp4rhuz0');
let sound = require("nativescript-sound");
var myImage;
var fileUri;
var myLocation;
var isImageClicked = false;
var imageToPass;
var zoomInfoLabel;
var imageSet = false;

function pageLoaded(args) {
	var page = args.object;

	page.bindingContext = page.navigationContext;
	myLocation = page.bindingContext.locationProblem;

	loadUi(page);

	myImage = page.getViewById("myImg");
	zoomInfoLabel = page.getViewById("zoomInfo");
	if (!imageSet) {
		console.log("image is not set" + imageSet);
	};

	myImage.on('doubleTap', function(args) {

		if (!isImageClicked) {
			console.log("first");
			isImageClicked = true;
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

			fileUri = response.result.Uri;
			console.log('FILE ID  +++ ' + fileUri);
			imageSet = true;

		}, function(err) {
			console.log("Unfortunately the upload failed: " + err.message);
		});
	});
}


function loadUi(page){	

var myPage = page.getViewById("cameraPage");
	myPage.backgroundImage = "~/eee.jpg";

	var cameraBtn = page.getViewById("takePictureBtn");
	cameraBtn.backgroundImage = "~/yellow.jpg";

	var btnGoNextBtn = page.getViewById("goNextButton");
	btnGoNextBtn.backgroundImage = "~/yellow.jpg";
}

exports.goToDetailsPage = function() {

	// console.log(sound);
	// var tada = sound.create("~/sounds/camera.mp3");
	// console.log(tada);

	// for (var k in tada) {
	// 	console.log(k);
	// };

	// tada.play();

	var topmost = frameModule.topmost();

	var navigationEntry = {
		moduleName: "./views/details-page",
		context: {
			image: fileUri,
			location: myLocation
		},
		animated: false
	};

	topmost.navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.takePicture = takePicture;