var frameModule = require("ui/frame");
var camera = require("camera");
var myImage;
var myLocation;
var isImageClicked = false;

function pageLoaded(args) {
	var page = args.object;

    page.bindingContext = page.navigationContext;
    console.log(page.bindingContext.locationProblem);
	myLocation = page.bindingContext.locationProblem;

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

// console.log(myImage);
// console.log(myImage.imageSource);

	var navigationEntry = {
   	 moduleName: "./views/details-page",
   	 context: {image: myImage, location : myLocation},
   	 animated: false
	};

	topmost.navigate(navigationEntry);
}

exports.pageLoaded = pageLoaded;
exports.takePicture = takePicture;