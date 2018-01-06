myApp.controller('dashCtrl', ['$filter', '$http', '$location', '$routeParams', 'queryService', 'authService', function ($filter, $http, $location, $routeParams, queryService, authService) {

    var main = this;

    var user;

    this.getSecurityQuestion = function () {
        var data = {
            _id: $routeParams.userId
        }
        queryService.getquestion(data)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {

                    var userId;
                    var data = response.data.data;
                    //console.log(data);
                    main.user = data.name;
                    main.userId = data._id;
                    authService.setToken(response.data.token);
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");

            })
    }

    this.getSecurityQuestion();

    //check if logged
    this.logged = function () {
        //console.log("this is logged function");
        //console.log(queryService.log);
        main.username = queryService.userName;
        if (queryService.log == 1 || queryService.userId !== 'undefined') {
            return 1;
        } else {
            $location.path('/');
        }
    }
    this.logged();
    this.userId = $routeParams.userId;

    main.heading = "Welcome to Testifier"


    //code to get the details or number of tests taken,pending test as average score:
    this.getusertestdetails = function () {
        var userid = $routeParams.userId;
        queryService.getusertestdetails(userid)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {

                    var data = response.data.data;
                    console.log(data)
                    main.testtakenDetails = data;
                    main.testtakenDetailsforgraph = [];
                    main.testtakenDetailslabels = [];
                    var len = data.length;
                    for(var i=0;i<data.length;i++)
                    {
                            main.testtakenDetailsforgraph.push(data[i].score);
                            main.testtakenDetailslabels.push(data[i]._id)
                    }
                    console.log(main.testtakenDetailsforgraph);
                    console.log(main.testtakenDetailslabels);
                    if (len == 0) {
                        main.testtaken = "No Tests Given";
                        main.averagemarks = "0";
                    } else {
                        var scoreadd = 0;
                        for (var i = 0; i < len; i++) {
                            scoreadd = scoreadd + data[i].score;
                        }
                        main.averagemarks = (scoreadd / len);
                        //console.log(main.averagemarks);
                        main.testtaken = data.length;
                        //console.log(main.testtaken);
                    }

                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");

            })


    }
    this.getusertestdetails();

    //logout
    this.logout = function () {
        authService.setToken();
        main.user = '';
        queryService.log = 0;
        queryService.userId = "undefined";
        queryService.userName = '';
        $location.path('/');
    }

}]);
