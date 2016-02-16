'use strict'

var observable = require("data/observable");
var frameMode = require("ui/frame");
let observableArrayModule = require("data/observable-array");

var topmost = frameMode.topmost();

class EventViewModel extends observable.Observable {

	constructor() {
		super();
		// this.events = new observableArrayModule.ObservableArray([]);
		// this.events.push( {colour: "grey", name: "Spot", size: 46});

		this.events = [{
			title: "Dangerous intersect",
			idea: "Walkaway",
			category: "Infrastructure",
			location: "Sofia",
			proprity: 9
		}, {
			title: "Disrupting terrace",
			idea: "Reconstruction",
			category: "Infrastructure",
			location: "Bourgas",
			proprity: 8
		}, {
			title: "Old Swings",
			idea: "Modernize park",
			category: "Health",
			location: "Pernik",
			proprity: 5
		}, {
			title: "Dangerous intersect",
			idea: "Walkaway",
			category: "Infrastructure",
			location: "Sofia",
			proprity: 9
		}, {
			title: "Disrupting terrace",
			idea: "Reconstruction",
			category: "Infrastructure",
			location: "Bourgas",
			proprity: 8
		}, {
			title: "Old Swings",
			idea: "Modernize park",
			category: "Health",
			location: "Pernik",
			proprity: 5
		}];
	}

	backAction() {
		var topmost = frameMode.topmost();
		topmost.navigate("main-page");
	}
}

exports.EventViewModel = EventViewModel;
exports.evViewModel = new EventViewModel();