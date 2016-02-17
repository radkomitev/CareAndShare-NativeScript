var frameModule = require("ui/frame");
var camera = require("camera");
var myImage;
var isImageClicked = false;

function pageLoaded(args) {
	var page = args.object;
	myImage = page.getViewById("myImg");
    myImage.on('doubleTap', function(args) {
    	if(!isImageClicked){	
    		isImageClicked = true;
    		myImage.width *= 2;
   		    myImage.height *= 2;
			}
	    else{
	    	myImage.width *= 0.5;
   		    myImage.height *= 0.5;
   		    isImageClicked = false;
	    }
  });
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