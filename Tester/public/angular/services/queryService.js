myApp.factory('queryService', function queryFactory($http, authService, $q) {

    var queryArray = {};

    queryArray.log = '';
    queryArray.sign = '';




    //sign up request
    queryArray.signUp = function (userData) {
        return $http.post('/users/signup', userData);
    }

    //login request
    queryArray.login = function (loginData) {
        return $http.post('/users/login', loginData);
    }

    //login request for facebook
    queryArray.loginFacebook = function () {
        return $http.get('/auth/facebook');
        //window.location.href="/auth/facebook";
    }



    //login request for google
    queryArray.loginGoogle = function () {
        
       //return $http.get( window.location.href="/auth/google");
       //window.location.href="/auth/google";
       
       //window.location.replace("/auth/google");
       //return response;
       return $http.get('/auth/google/');
      



    }

    //login request for reset password
    queryArray.resetpass = function (data) {
        return $http.post('/users/reset', data);
    }

    //login request to get security Question
    queryArray.getquestion = function (data) {
        return $http.post('/users/securityQuestion', data);
    }

    //login request to set the new Password
    queryArray.resetpassword = function (data) {
        return $http.post('/users/resetpassword', data);
    }

    // request to Create a test by admin
    queryArray.createTest = function (data) {
        return $http.post('/tests/createTest/admin?token=' + authService.getToken(), data);
    }

    // request to Create a Question by Admin
    queryArray.getTests = function (data) {
        return $http.get('/tests/allTests?token=' + authService.getToken(), data);
    }

    // request to Create a Question by Admin
    queryArray.createQuestion = function (data) {
        //console.log(data.id);
        return $http.post('/tests/' + data.id + '/createquestions?token=' + authService.getToken(), data);
    }


    // request to delete a Test by Admin
    queryArray.deleteTest = function (data) {
       // console.log(data);
        return $http.delete('/tests/test/delete/' + data + '?token=' + authService.getToken(), data);
    }

    // request to view Questions by Admin
    queryArray.viewQuestion = function (data) {
       // console.log(data);
        return $http.get('/tests/' + data + '/getquestions?token=' + authService.getToken(), data);
    }

    // request to Update test by Admin
    queryArray.UpdateTest = function (data) {
        //console.log(data.id);
        return $http.put('/tests/test/update/' + data.id + '?token=' + authService.getToken(), data);
    }

    // request to Update test by Admin
    queryArray.DeleteQuestion = function (data, index, quesid) {
        //console.log(data);
        //console.log(index);
        //console.log(quesid);
        return $http.get('/tests/question/' + data.id + '/' + index + '/' + quesid + '/delete?token=' + authService.getToken());
    }

    // request to Update test by Admin
    queryArray.updateQuestion = function (data, index, quesid) {
       // console.log(data);
       // console.log(index);
       // console.log(quesid);
        return $http.post('/tests/question/' + data.id + '/' + index + '/' + quesid + '/update?token=' + authService.getToken(), data);
    }

    // request to User Info
    queryArray.userInfo = function () {
        return $http.get('/users/getUserinfo?token=' + authService.getToken());
    }

    // request to User Info Facebook
    queryArray.userInfofacebook = function () {
        return $http.get('/getUserinfofacebook?token=' + authService.getToken());
    }

    // request to User Info Facebook
    queryArray.userInfogoogle = function () {
        return $http.get('/getUserinfogoogle?token=' + authService.getToken());
    }

    //Query to get questions for single test
    queryArray.getSingleTest = function (singleTestId) {
        //console.log(singleTestId);
        return $http.get('/tests/test/' + singleTestId + '?token=' + authService.getToken());
    }

    //Query to get questions for single test
    queryArray.submitAnswer = function (data) {
        return $http.post('/tests/tests/' + data.testid + '/questions/' + data.questionid + '/answer?token=' + authService.getToken(), data);
    }


    //Query to get questions for single test
    queryArray.submitTest = function (data) {
        return $http.post('/tests/performance/' + data.testid + '?token=' + authService.getToken(), data);
    }

    //Query to post test attempted by
    queryArray.testAttempted = function (attempdata) {
        return $http.put('/tests/tests/' + attempdata.testId + '/attemptedby?token=' + authService.getToken(), attempdata);
    }

    //Query to get performance of users in dashboard
    queryArray.getusertestdetails = function (userid) {
        return $http.get('/tests/performance/user/' + userid + '?token=' + authService.getToken());
    }


    return queryArray;

}); //end query service
