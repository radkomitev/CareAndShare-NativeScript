var listPickerModule = require("ui/list-picker");
var observable = require("data/observable");
var frameModule = require("ui/frame");

function pageLoaded(args) {
	var page = args.object;

	var model = new observable.Observable({
        "myItems" : ["Health", "Infrastructure", "Sport", "Animal", "Other"],
        "selectedIndex" : 2,      
        "minValue": 0,
        "maxValue": 100,
        "sliderValue":50,
    });

	page.bindingContext = model;
  };

exports.pageLoaded = pageLoaded;

exports.submitProblem = function() {
	var topmost = frameModule.topmost();
	topmost.navigate("./main-page");
}