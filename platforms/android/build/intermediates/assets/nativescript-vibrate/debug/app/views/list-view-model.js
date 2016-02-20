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

	loadProblems(data){
		this.set("events",data);
	}

	backAction() {
		var topmost = frameMode.topmost();
		topmost.navigate("main-page");
	}
}

exports.EventViewModel = EventViewModel;
exports.evViewModel = new EventViewModel();