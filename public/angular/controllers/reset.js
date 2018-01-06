myApp.controller('resetCtrl', ['$http', '$location', '$routeParams', 'queryService', 'authService', function ($http, $location, $routeParams, queryService, authService) {

    var main = this;

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
                    main.security = data.security;
                    authService.setToken(response.data.token);
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");

            })
    }

    this.getSecurityQuestion();

    //function to reset password
    this.submit = function () {
        //console.log("This is submit function of reset password!!!");
        var data = {
            answer: main.answer,
            _id: $routeParams.userId,
            password: main.password
        }

        queryService.resetpassword(data)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    alert("Password has been changed Successfully!!!");
                    $location.path('/');
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");
            });
    } //end submitLog


}]);
