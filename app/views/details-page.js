var listPickerModule = require("ui/list-picker");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var Everlive = require("~/libs/everlive/everlive.all.min");
var el = new Everlive('wzgxk32dkp4rhuz0');
var dialogs = require("ui/dialogs");
var Toast = require("nativescript-toast");
// var vibrator = require("nativescript-vibrate");

//ui elements
var tfTitle,
    tfIdea,
    selectedCategoryIndex,
    priorityValue,
    locationValue,
    imageValue;

function pageLoaded(args) {
    var page = args.object;

    page.bindingContext = page.navigationContext;
    imageValue = page.bindingContext.image;
    console.log(imageValue);
    locationValue = page.bindingContext.location;

    problemInfo = {};
    tfTitle = page.getViewById("title");
    tfIdea = page.getViewById("idea");
    selectedCategoryIndex = page.getViewById("listPicker");
    priorityValue = page.getViewById("sliderPriority");

    var model = new observable.Observable({
        "myItems": ["Health", "Infrastructure", "Sport", "Animal", "Other"],
        "selectedIndex": 2,
        "minValue": 0,
        "maxValue": 100,
        "sliderValue": 50,
    });

    page.bindingContext = model;
};

exports.pageLoaded = pageLoaded;

exports.submitProblem = function() {
    if ((!tfTitle.text || tfTitle.text.length < 3) ||
        (!tfIdea.text || tfIdea.text.length < 3)) {

        Toast.makeText("Input information shoud be at least 3 symbols", "long").show();

        //vibrator.vibration(2000);
        // dialogs.alert({
        //     title: "Invalid info input",
        //     message: "Make sure all the fields are filled with valid info",
        //     okButtonText: "Ok"
        // });
    } else {

        problemInfo.title = tfTitle.text;
        problemInfo.idea = tfIdea.text;
        problemInfo.priority = +priorityValue.value;
        problemInfo.categoryName = selectedCategoryIndex.selectedIndex;
        problemInfo.location = locationValue;
        problemInfo.image = imageValue;

        var data = el.data('problem');

        data.create(problemInfo, function(data) {
            console.log(JSON.stringify(data));
        }, function(error) {
            console.log(JSON.stringify(error));
        });
        var topmost = frameModule.topmost();
        topmost.navigate("./main-page");
    }
}