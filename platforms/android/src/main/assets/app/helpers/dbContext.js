var Sqlite = require( "nativescript-sqlite");

exports.dbInit = function () {     
        
    if (!Sqlite.exists("careShare.sqlite")) {
        return new Sqlite("careShare.sqlite", function(err, db) {
            if (err) { 
                console.error("We failed to open database", err);
            } else {
                global.db = db;
            }
            
            global.db.execSQL("CREATE TABLE `Problems`"); 
        });  
	} else {
        return new Sqlite("careAndShare.sqlite", function(err, db) {
            if (err) { 
                console.error("We failed to open database", err);
            } else {
                global.db = db;
            }
        });
    }
};