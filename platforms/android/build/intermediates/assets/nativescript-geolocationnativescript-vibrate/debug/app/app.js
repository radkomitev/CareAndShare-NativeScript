var application = require("application");
application.mainModule = "main-page";
application.cssFile = "./app.css";


var dbModule = require("./helpers/dbContext");
var problemsServices = require("./services/problems");



application.start();