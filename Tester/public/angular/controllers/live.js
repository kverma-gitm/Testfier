myApp.controller('liveCtrl', ['$scope', '$filter', '$http', '$location', '$routeParams', 'queryService', 'authService', function ($scope, $filter, $http, $location, $routeParams, queryService, authService) {

    var main = this;

    var numberofQuestions;
    var user;
    var testName;
    main.numberofQuestionsfortime = [];
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
    main.heading = "Testifier - Test your limits "


    $('.thisismodalforlivetestwarning').modal('show');
    $(document).on('click', '#returntotaketest', function () {

        $('.thisismodalforlivetestwarning').modal('hide');
        //console.log(main.userId);
        location.replace("#/takeTest/" + main.userId)
    })


    //creating function to get the tests
    this.getSingleTest = function () {

        var singleTestId = $routeParams.testId;
        //console.log(singleTestId);
        queryService.getSingleTest(singleTestId)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                    window.location.href = "#/takeTest/" + main.userId;
                } else {
                    if (response.data.data.questions.length == 0) {
                        $location.path("/takeTest/" + main.userId);
                        alert("Sorry! No Questions Are there in this Test, Admin has Not yet Assigned the Questions!!!");


                    } else {
                        //console.log(response.data.data);
                        main.numberofQuestions = response.data.data.questions.length;
                        main.numberofQuestionsfortime.push(response.data.data.questions.length);
                        main.quizHeading = "Quiz on " + response.data.data.testName;
                        main.testName = response.data.data.testName;
                        main.singletestArray = response.data.data.questions;
                        main.time = response.data.data.testDuration;
                        //console.log(main.time);
                        //console.log(main.singletestArray.length);
                    }
                }
            }, function errorCallBack(response) {
                //console.log(response);
                alert("Error!! Check console");

            })
    }
    this.getSingleTest();


    var total_seconds = 300;
    //console.log(total_seconds);
    var c_minutes = parseInt(total_seconds / 60);
    var c_seconds = parseInt(total_seconds % 60);

    this.checkTime = function () {

        total_seconds = total_seconds - 1;
        c_minutes = parseInt(total_seconds / 60);
        c_seconds = parseInt(total_seconds % 60);
        //console.log(total_seconds);
        main.timetakenfortest = (300 - total_seconds);

        //console.log("Initialized CountDown Timer");
        document.getElementById('quiz-time-left').innerHTML = 'Time Left: ' + c_minutes + ' minutes ' + c_seconds + ' seconds';
        if (total_seconds <= 0) {
            clearTimeout(main.counttime);
            main.timetakenfortest = 300;
            alert("Times Up!...");
            container.style.display = 'none';

            var attempdata = {
                testAttemptedBy: main.user + " " + $routeParams.userId,
                testId: $routeParams.testId
            }
            queryService.testAttempted(attempdata)
                .then(function successCallback(response) {}, function errorCallBack(response) {})


            //code to submit data...
            var data = {
                userid: $routeParams.userId,
                testid: $routeParams.testId,
                score: score,
               
                timeTaken: main.timetakenfortest,
                totalCorrectAnswers: (score / 10),
                totalWrongAnswers: (10 - (score / 10))
            }
            //console.log(data);
            queryService.submitTest(data)
                .then(function successCallBack(response) {

                    if (response.data.error === true) {
                        alert(response.data.message);
                    } else {

                        //console.log(response.data.data);
                        main.performanceUserID = response.data.data.user;
                        main.answerscorrect = response.data.data.totalCorrectAnswers;
                        main.answerswrong = response.data.data.totalWrongAnswers;
                        main.securedscore = response.data.data.score;
                        main.timeTaken = response.data.data.timeTaken;
                       
                        $('.thisismodalforUserTestPerformance').modal('show');
                        /*location.reload();
		window.location.href = "#/takeTest/"+main.userId;
				*/
                    }
                }, function errorCallBack(response) {
                    //console.log(response);
                    alert("Error!! Check console");

                })
            console.log("end of check time");


        }
        /*else
        {
        	total_seconds = total_seconds - 1;
        	c_minutes = parseInt(total_seconds/60);
        	c_seconds = parseInt(total_seconds%60);
        	console.log(total_seconds);
        	main.timetakenfortest = (300-total_seconds);
          //$scope.counttime = setTimeout(this.checkTime, 1000);
        }*/
    }




    //code related to getting question
    var currentQuestion = 0;
    var score = 0;
    var totQuestion = 0;
    var container = document.getElementById('quizContainer');
    var questionEl = document.getElementById('question');
    var opt1 = document.getElementById('opt1');
    var opt2 = document.getElementById('opt2');
    var opt3 = document.getElementById('opt3');
    var opt4 = document.getElementById('opt4');
    var nextButton = document.getElementById('nextButton');
    var resultCont = document.getElementById('result');

    this.loadQuestion = function (questionIndex) {
        if (questionIndex == 0) {
            totQuestion = main.numberofQuestions;
            //console.log(totQuestion)

            $('.thisismodalforlivetestwarning').modal('hide');
            main.counttime = setInterval(this.checkTime, 1000);
        }
        var q = main.singletestArray[questionIndex];
        questionEl.textContent = (questionIndex + 1) + '.' + q.question;
        opt1.textContent = q.optionA;
        opt2.textContent = q.optionB;
        opt3.textContent = q.optionC;
        opt4.textContent = q.optionD;
    };

    this.loadNextQuestion = function () {
        var selectedOption = document.querySelector('input[type=radio]:checked');
        if (!selectedOption) {
            alert("please select your answer!");
            return;
        }
        var answer = selectedOption.value;
        if (main.singletestArray[currentQuestion].answer == answer) {
            score += 10;
        }
        var data = {
            userid: $routeParams.userId,
            testid: $routeParams.testId,
            questionid: main.singletestArray[currentQuestion]._id,
            userAnswer: answer,
            correctAnswer: main.singletestArray[currentQuestion].answer,
            timeTakenEach: main.timetakenfortest
        }
        //console.log(data);
        queryService.submitAnswer(data)
            .then(function successCallBack(response) {}, function errorCallBack(response) {})
        selectedOption.checked = false;
        currentQuestion++;
        if (currentQuestion == totQuestion - 1) {
            nextButton.textContent = 'finish';
        }
        if (currentQuestion == totQuestion) {
            container.style.display = 'none';
            //code for test attempted by
            clearTimeout(main.counttime);
            var attempdata = {
                testAttemptedBy: main.user + " " + $routeParams.userId,
                testId: $routeParams.testId
            }
            queryService.testAttempted(attempdata)
                .then(function successCallback(response) {}, function errorCallBack(response) {})


            //code to submit data...
            var data = {
                userid: $routeParams.userId,
                testid: $routeParams.testId,
                score: score,
                
                timeTaken: main.timetakenfortest,
                totalCorrectAnswers: (score / 10),
                totalWrongAnswers: (10 - (score / 10))
            }
            //console.log(data);
            queryService.submitTest(data)
                .then(function successCallBack(response) {

                    if (response.data.error === true) {
                        alert(response.data.message);
                    } else {

                        //console.log(response.data.data);
                        main.performanceUserID = response.data.data.user;
                        main.answerscorrect = response.data.data.totalCorrectAnswers;
                        main.answerswrong = response.data.data.totalWrongAnswers;
                        main.securedscore = response.data.data.score;
                        main.timeTaken = response.data.data.timeTaken;
                        
                        $('.thisismodalforUserTestPerformance').modal('show');


                    }
                }, function errorCallBack(response) {
                    //console.log(response);
                    alert("Error!! Check console");

                })
            return;
        }
        this.loadQuestion(currentQuestion);
    }


}]);
