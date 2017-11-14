myApp.controller('testCtrl', ['$filter', '$http', '$location', '$routeParams', 'queryService', 'authService', function ($filter, $http, $location, $routeParams, queryService, authService) {

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
    main.heading = "Testfier"

    //creating function to get the tests
    this.getTests = function () {

        queryService.getTests()
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    if (response.data.data.length == 0) {
                        alert("Sorry! No Test Is Assigned By Admin!!!");
                        $location.path('/dashboard/' + main.userId);
                    } else {
                        //console.log(response.data.data);
                        main.testArray = response.data.data;
                        //console.log(main.testArray);
                    }
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");

            })
    }


}]);
