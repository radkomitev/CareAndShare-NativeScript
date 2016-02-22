'use strict'

var observable = require("data/observable");
var frameMode = require("ui/frame");
let observableArrayModule = require("data/observable-array");

var topmost = frameMode.topmost();

class EventViewModel extends observable.Observable {

	constructor() {
		super();

		this.events = [];
	}

	loadProblems(data) {
		this.set("events", data);
	}

	// loadMore() {
	// 	console.log("ff");
	// }
}

exports.EventViewModel = EventViewModel;
exports.evViewModel = new EventViewModel();