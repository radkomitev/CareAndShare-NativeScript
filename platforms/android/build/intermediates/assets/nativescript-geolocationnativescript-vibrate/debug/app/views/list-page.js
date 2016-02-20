'use strict'
let eventModule = require("./list-view-model");
let frameModule = require("ui/frame");
var Everlive = require("~/libs/everlive/everlive.all.min");
var el = new Everlive('wzgxk32dkp4rhuz0');

function pageLoaded(args) {
	let page = args.object;

	var vm = eventModule.evViewModel;
	page.bindingContext = vm;
    
    loadUi(page);
	var data = el.data('problem');
	var query = new Everlive.Query();
	query.where()
		.done()
		.orderDesc()
		.select("title","idea","categoryName","priority","location","image")
		.skip(0)
		.take(10);

	data.get(query)
		.then(function(data) {
			
			vm.loadProblems(data.result);
			console.log(JSON.stringify(data.result));
		}, function(error) {
			console.log("fdfd" + JSON.stringify(error));
		});


}

function loadUi(page){

    var myPage  = page.getViewById("listPage");
    myPage.backgroundImage = "~/eee.jpg";
}
exports.pageLoaded = pageLoaded;