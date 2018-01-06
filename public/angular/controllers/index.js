myApp.controller('indexCtrl', ['$http', '$location', 'queryService', 'authService', function ($http, $location, queryService, authService) {

    var main = this;

    //check if logged
    this.logged = function () {
        //console.log(userId);
        //console.log("this is logged function");
        //console.log(queryService.log);
        //console.log("userID");
        main.userID = queryService.userId;
        main.username = queryService.userName;
        //console.log(queryService.userId);
        //console.log(main.username);
        if (queryService.log == 1 && queryService.userId !== 'undefined') {
            return 1;
        } else {

            return 0;
        }
    }

    this.logged();
    //function to process login
    this.submitLog = function () {

        var data = {
            email: main.email,
            password: main.password
        }

        queryService.login(data)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else if (response.data.data.name == 'Admin') {
                    var userId;
                    var data = response.data.data;
                    //console.log(data);
                    //set logged status  
                    queryService.log = 1;
                    queryService.userId = data._id;
                    queryService.userName = response.data.data.name;
                    //console.log(main.userId);
                    authService.setToken(response.data.token);
                    $location.path('/admin/' + data._id);

                } else {

                    var userId;
                    var data = response.data.data;
                    //console.log(data);
                    //set logged status  
                    queryService.log = 1;
                    queryService.userId = data._id;
                    queryService.userName = response.data.data.name;
                    //console.log(main.userId);
                    authService.setToken(response.data.token);
                    $location.path('/dashboard/' + data._id);
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");
            });
    } //end submitLog

    //function to process signup
    this.submitSign = function () {

        var data = {
            name: main.name,
            email: main.email,
            password: main.password,
            mobileNumber: main.mobileNumber,
            security: main.security,
            answer: main.securityAnswer
        }
        queryService.signUp(data)
            .then(function successCallBack(response) {
                //console.log(response);
                if (response.data.error === true) {
                    alert(response.data.message)
                } else {

                    if (response.data.data.name == 'Admin') {
                        angular.element('#signupModal').modal('hide');
                        queryService.log = 1;
                        authService.setToken(response.data.token);
                        var data = response.data.data;
                        queryService.userName = response.data.data.name;
                        $location.path('/admin/' + data._id);
                    } else {
                        //hide signup modal
                        angular.element('#signupModal').modal('hide');
                        queryService.log = 1;
                        authService.setToken(response.data.token);
                        var data = response.data.data;
                        queryService.userName = response.data.data.name;
                        $location.path('/dashboard/' + data._id);
                    }
                }
            }, function errorCallBack(response) {
                //console.log(response);
                if (response.status === 400) {
                    alert(response.data);
                } else {
                    alert(response.data.message);
                }
            });

    } //end submitSign

    this.submitFacebook = function () {

        queryService.loginFacebook()
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {

                    var userId;
                    var data = response.data;
                    //console.log(data);
                    //set logged status  
                    queryService.log = 1;
                    queryService.userId = data._id;

                    //console.log(main.userId);
                    authService.setToken(data.token);
                    $location.path('/dashboard/' + data._id);
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");
            });
    }

    this.submitGoogle = function () {

        queryService.loginGoogle()
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);

                } else {

                    var userId;
                    var data = response.data;
                    console.log(",mdsnf,sdnfmnsdmfbsdmfbhdfgshjb");
                    
                    //set logged status  
                    queryService.log = 1;
                    queryService.userId = data._id;

                    //console.log(main.userId);
                    authService.setToken(data.token);
                    $location.path('/dashboard/' + data._id);
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");
            });
    }

}]);
