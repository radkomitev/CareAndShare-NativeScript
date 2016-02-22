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
		}, function(error) {
			console.log("fdfd" + JSON.stringify(error));
		});


}

function getAllProblems() {

	//SQL
	dbContext.dbInit();

	problemServices.problem.getAll().then(
		function(problems) {

			console.log("ko e towaw" + JSON.stringify(problems));
		},
		function(e) {
			throw Error(e);
		});

}

function loadMore(page) {

	console.log("ff");
}

function loadUi(page) {

	var myPage = page.getViewById("listPage");
	myPage.backgroundImage = "~/eee.jpg";
	image = page.getViewById("myimage");
}

exports.pageLoaded = pageLoaded;