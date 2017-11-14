myApp.controller('adminCtrl', ['$filter', '$http', '$location', '$routeParams', 'queryService', 'authService', function ($filter, $http, $location, $routeParams, queryService, authService) {

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

    main.heading = "welcome ";

    this.Create = function () {

        var data = {
            testName: main.testName,
            testCategory: main.testCategory,
            testDetails: main.testDetails,
            totalScore: main.totalScore,
            testDuration: main.testDuration
        }
       // console.log(data);
        queryService.createTest(data)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    console.log(response);
                    $('.form-control').val('');
                    $('#myModal').modal('hide');
                    main.getTests();
                    alert("Thank You! Test has been Created...");
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");

            })
    }

    var testId;

    //creating function to get the tests
    this.getTests = function () {

        queryService.getTests()
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                   // console.log(response.data.data);
                    main.testArray = response.data.data;
                   // console.log(main.testArray);
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");

            })
    }

    this.createQuestion = function () {

        var data = {
            question: main.question,
            optionA: main.optionA,
            optionB: main.optionB,
            optionC: main.optionC,
            optionD: main.optionD,
            answer: main.answer,
            id: main.idoftest
        }
       // console.log(data);
        queryService.createQuestion(data)
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    $('.form-control').val('');
                    $('#myModal3').modal('hide');
                    main.getTests();

                    alert("Thank You! Question has been Created...");
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })
    }


    this.deleteTest = function (id) {

        var data = id;
        //console.log(id);
        queryService.deleteTest(data)
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                   // console.log(response);
                    main.getTests();
                    alert("Thank You! Test has been Deleted...");
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })

    }


    this.viewQuestion = function (id) {

        var data = id;
       // console.log(id);
        queryService.viewQuestion(data)
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    main.quesArray = response.data.data;
                   // console.log(main.quesArray);

                    if (main.quesArray.length == 0) {
                        alert("Sorry! there is no Question.")
                    } else {
                        $('#myModalViewQues').modal('show');
                        alert("all questions fetched Successfully!!!");
                    }
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })

    }


    this.viewUpdateQuestion = function (id) {

        var data = id;
       // console.log(id);
        queryService.viewQuestion(data)
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    main.quesArray = response.data.data;
                   // console.log(main.quesArray);

                    if (main.quesArray.length == 0) {
                        alert("Sorry! there is no Question.")
                    } else {
                        $('#myModalQuestionList').modal('show');
                        alert("all questions fetched Successfully!!!");
                    }
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })

    }


    this.viewUpdateQuestiontoupdate = function (id) {
        main.useridforupadtionoftest = id;
        var data = id;
        //console.log(id);
        queryService.viewQuestion(data)
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    main.quesArray = response.data.data;
                    //console.log(main.quesArray);

                    if (main.quesArray.length == 0) {
                        alert("Sorry! there is no Question.")
                    } else {
                        $('#myModalQuestionListtoupdate').modal('show');
                        alert("all questions fetched Successfully!!!");
                    }
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })

    }


    this.updateform = function (index, questionid) {
        main.idexwherequestionisupdated = index;
        main.questionidtobeupdated = questionid;
        $('#myModalQuestionListtoupdateform').modal('show');
    }

    this.DeleteQuestion = function (index, quesid) {
        //console.log(index);
        //console.log(quesid);
        var data = {
            id: main.idoftest
        }
        //console.log(data);

        queryService.DeleteQuestion(data, index, quesid)
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                   // console.log(response);
                    $('#myModalQuestionList').modal('hide');
                    main.getTests();

                    alert("Thank You! Question no: " + (index + 1) + " has been Deleted...");
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })
    }


    this.UpdateQuestion = function () {

        var data = {
            question: main.question,
            optionA: main.optionA,
            optionB: main.optionB,
            optionC: main.optionC,
            optionD: main.optionD,
            answer: main.answer,
            id: main.useridforupadtionoftest
        }
       // console.log(data);

        queryService.updateQuestion(data, main.idexwherequestionisupdated, main.questionidtobeupdated)
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    alert("Thank You! Question has been Updated...");
                    $('.form-control').val('');
                    $('#myModalQuestionListtoupdateform').modal('hide');
                    $('#myModalQuestionListtoupdate').modal('hide');
                    main.getTests();


                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })
    }



    this.UpdateTest = function () {

        var data = {
            testName: main.testName,
            testCategory: main.testCategory,
            testDetails: main.testDetails,
            totalScore: main.totalScore,
            testDuration: main.testDuration,
            id: main.idofupdate
        }
        //console.log(data);
        queryService.UpdateTest(data)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    $('.form-control').val('');
                    $('#myModalUpdateTest').modal('hide');

                    main.getTests();

                    alert("Thank You! Test has been Updated...");
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");

            })
    }

    this.getUserInfo = function () {
        queryService.userInfo()
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    main.userInfo = response.data.data;
                    $('#myModalgetUserinfo').modal('show');
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })
    }

    this.getUserInfofacebook = function () {
        queryService.userInfofacebook()
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    main.userInfofacebook = response.data;
                    $('#myModalgetUserinfofacebook').modal('show');
                }
            }, function errorCallBack(response) {
               // console.log(response);
                alert("Error!! Check Console");
            })
    }

    this.getUserInfogoogle = function () {
        queryService.userInfogoogle()
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    main.userInfogoogle = response.data;
                    $('#myModalgetUserinfogoogle').modal('show');
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })
    }

    this.getUserInfoforperformance = function () {

        queryService.userInfo()
            .then(function successCallBack(response) {

                if (response.data.error === true) {
                    alert(response.data.message);
                } else {

                   // console.log(response);
                    main.userInfo = response.data.data;
                    $('#myModalgetUserinfoforperformance').modal('show');
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })

    }


    this.getperformanceinfo = function (userid) {
        var id = userid;
        queryService.getusertestdetails(id)
            .then(function successCallback(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    //console.log(response);
                    main.userInfoperformance = response.data.data;
                    $('#myModalgetUserinfoforperformanceshow').modal('show');
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check Console");
            })
    }

    //logout
    this.logout = function () {
        authService.setToken();
        main.user = '';
        queryService.log = 0;
        queryService.userId = "undefined";
        queryService.userName = '';
        $location.path('/');
    }

}])
