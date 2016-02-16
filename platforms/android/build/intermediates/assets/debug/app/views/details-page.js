<<<<<<< HEAD
var frameModule = require("ui/frame");

function pageLoaded(args) {
    var page = args.object;
}

exports.pageLoaded = pageLoaded;
=======
'use strict'
let eventModule = require("./details-view-model");
let frameModule = require("ui/frame");

function pageLoaded(args) {
	let page = args.object;
	page.bindingContext = eventModule.evViewModel;

}

exports.pageLoaded = pageLoaded;
>>>>>>> origin/master
