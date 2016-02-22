var Problems = (function(_super) {
    __extends(Problems, _super);

    function Problems() {
        _super.call(this);
    }

    Problems.prototype.addProblem = function(problemObj) {

        return global.db.execSQL("insert into Problems values (?)",JSON.stringify(problemObj));
        promise.then(function(id) {
            console.log("The new record id is:", id);
        });


        // return global.db.execSQL("insert into Problems values (?)", JSON.stringify(problemObj))
        //     .then(
        //         function(id) {
        //             return "Inserted!";
        //         },
        //         function(err) {
        //             throw Error(err);
        //         });
    };


    Problems.prototype.getAll = function() {
        return global.db.all("select * from Problems").then(
            function(problems) {
                return problems;
            },
            function(err) {
                throw Error(err);
            });
    };

    return Problems;
})(Object);

exports.problem = new Problems();