var frameModule = require("ui/frame");
<<<<<<< HEAD

function pageLoaded(args) {
    var page = args.object;
}

exports.goToDetailsPage = function(){
	var topmost = frameModule.topmost();
	topmost.navigate("./views/details-page");  
}

exports.pageLoaded = pageLoaded;
=======
var camera = require("camera");
var myImage;

function pageLoaded(args) {
	var page = args.object;
	myImage = page.getViewById("myImg");
}

function takePicture() {
	camera.takePicture().then(function(picture) {
		myImage.imageSource = picture;
	});
}

exports.goToDetailsPage = function() {
	var topmost = frameModule.topmost();
	topmost.navigate("./views/details-page");
}

exports.pageLoaded = pageLoaded;
exports.takePicture = takePicture;
>>>>>>> origin/master
