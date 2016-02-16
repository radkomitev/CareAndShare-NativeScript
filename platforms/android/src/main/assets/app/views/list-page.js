'use strict'
let eventModule = require("./list-view-model");
let frameModule = require("ui/frame");

function pageLoaded(args) {
	let page = args.object;
	page.bindingContext = eventModule.evViewModel;

}

exports.pageLoaded = pageLoaded;