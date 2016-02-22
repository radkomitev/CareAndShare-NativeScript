var frameModule = require("ui/frame");
var view = require("ui/core/view");
var colorModule = require("color");
var actionBarModule = require("ui/action-bar");
var ImageModule = require("ui/image");
var view = require("ui/core/view");
var btnSubmit;
var btnHelp;
var page;
var isClicked = true;

function pageLoaded(args) {
    page = args.object;

    loadUi(page);

}

function loadUi(page) {

    var myPage = page.getViewById("initialPage");
    myPage.backgroundImage = "~/eee.jpg";


    var labelInfo = page.getViewById("labelAboutApp");
    labelInfo.backgroundImage = "~/eee.jpg";

    btnSubmit = page.getViewById("buttonSubmitProblem");
    btnSubmit.backgroundImage = "~/yellow.jpg";

    var btnList = page.getViewById("buttonListProblem");
    btnList.backgroundImage = "~/yellow.jpg";

    var btnАbout = page.getViewById("buttonAboutCareAndShare");
    btnАbout.backgroundImage = "~/yellow.jpg";

    btnHelp = page.getViewById("buttonHelp");
    btnHelp.backgroundImage = "~/yellow.jpg";

}

exports.goToHelpPage = function() {

    var topmost = frameModule.topmost();
    topmost.navigate("./views/help-page");
};

exports.goToLocationPage = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("./views/location-page");
};

exports.goTolistProblemsPage = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("./views/list-page");
};

exports.aboutApp = function() {
    var textView = page.getViewById("labelAboutApp");
    var button = page.getViewById("buttonAboutCareAndShare");
    if (isClicked) {
        isClicked = false;
        button.animate({
            opacity: 0.5
        });
        textView.animate({
            translate: {
                x: 0,
                y: -30
            },
            opacity: 1,
            duration: 2000,
            translate: {
                x: 0,
                y: 30
            },
        });
    } else {
        isClicked = true;
        button.animate({
            opacity: 1
        });
        textView.animate({
            translate: {
                x: 0,
                y: 30
            },
            opacity: 0,
            duration: 2000,
            translate: {
                x: 0,
                y: -30
            },
        });
    }
};

exports.pageLoaded = pageLoaded;