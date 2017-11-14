myApp.controller('forgotCtrl', ['$http', '$location', 'queryService', 'authService', function ($http, $location, queryService, authService) {

    var main = this;

    //function to reset password
    this.submit = function () {

        // console.log(main.email);
        var data = {
            email: main.email
        }

        queryService.resetpass(data)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {

                    var userId;
                    var data = response.data.data;
                    //console.log(data);
                    authService.setToken(response.data.token);
                    $location.path('/resetpassword/' + data._id);
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");
            });
    } //end submitLog


}]);
