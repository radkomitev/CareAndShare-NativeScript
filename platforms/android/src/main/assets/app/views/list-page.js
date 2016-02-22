'use strict'
let eventModule = require("./list-view-model");
let frameModule = require("ui/frame");
var Everlive = require("~/libs/everlive/everlive.all.min");
var el = new Everlive('wzgxk32dkp4rhuz0');
var activityIndicatorModule = require("ui/activity-indicator");
var indicator = new activityIndicatorModule.ActivityIndicator();
var problemServices = require("~/services/problems");
var dbContext = require("~/helpers/dbContext");
var image;
var labelInternetConnection;

function pageLoaded(args) {
	let page = args.object;

	var vm = eventModule.evViewModel;
	page.bindingContext = vm;

	loadUi(page);
	//getAllProblems();
	// var indicator = new activityIndicatorModule.ActivityIndicator();
	// indicator.width = 100;
	// indicator.height = 100;
	// // Bind the busy property of the indicator to the isLoading property of the image
	// indicator.bind({
	// 	sourceProperty: "isLoading",
	// 	targetProperty: "busy"
	// }, image);


	var data = el.data('problem');
	var query = new Everlive.Query();
	query.where()
		.done()
		.order()
		.select("title", "idea", "categoryName", "priority", "location", "image")
		.skip(0)
		.take(10);

	data.get(query)
		.then(function(data) {

			vm.loadProblems(data.result.reverse());


			console.log(JSON.stringify(data.result));
			
			labelInternetConnection.visibility = "collapsed";
		}, function(error) {

			console.log("Error " + JSON.stringify(error));

			labelInternetConnection.visibility = "visible";
			blink(labelInternetConnection);
		});


}

function  blink(label){
var animation1 = label.createAnimation({ opacity: 0 });
var animation2 = label.createAnimation({ opacity: 1 });
	animation1.play()
    .then(function () { return animation2.play(); })
    .then(function () { return animation1.play(); })
    .then(function () { return animation2.play(); })
    .then(function () { return animation1.play(); })
    .then(function () { return animation2.play(); })
    .then(function () { return animation1.play(); })
    .then(function () { return animation2.play(); })
    .then(function () { return animation1.play(); })
    .then(function () { return animation2.play(); })
    .then(function () {
    console.log("Animation finished");
})
    .catch(function (e) {
    console.log(e.message);
});
}

function getAllProblems() {

	//SQL
	dbContext.dbInit();

	problemServices.problem.getAll().then(
		function(problems) {

			console.log("All problems " + JSON.stringify(problems));
		},
		function(e) {
			throw Error(e);
		});

}


function loadUi(page) {


	var myPage = page.getViewById("listPage");
	myPage.backgroundImage = "~/eee.jpg";
	image = page.getViewById("myimage");
	labelInternetConnection = page.getViewById("labelNoInternetConnection");
	labelInternetConnection.visibility = "collapsed";
}

exports.pageLoaded = pageLoaded;