var mongoose = require('mongoose');
var express = require('express');
var testRouter = express.Router();
var Test = require('../models/Test');
var Question = require('../models/Question');
var Answer = require('../models/Answer');
var Performance = require('../models/Performance');
//response generating Liberary
var resGenerator = require('./../../libs/resGenerator');

//defining Auth as middleware for accessing api's
//defining token...
var token;
// used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');
//defining decoded tokens...
var decodedToken;
var auth = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "97hw9a73hr2q@#$#@mo8afjoeidha0e8doh", function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                decodedToken = decoded;
                console.log("Decoded Token");
                console.log(decodedToken);
                next();
            }
        });
    }
}

/*All Testing API'S*/

//all api's related to creation and deletion of tests....
/*********************************************************************************************************************/
//Api to create a new Test By Admin...

testRouter.post('/createTest/admin', auth, function (req, res) {
    var test = new Test(req.body);
    console.log(test);
    test.save(function (err, test) {
        if (err) {
            var error = resGenerator.generate(true, "Some Error Ocurred, error : " + err, 500, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "Successfully Created A Test", 200, test);
            res.send(response);
        }
    });
});
/********************************************************************************************************************/

//api to get all tests for user as well as Admin

testRouter.get('/allTests', auth, function (req, res) {

    Test.find(function (err, tests) {
        console.log(tests);
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else if (tests === [] || tests === undefined || tests === null) {
            var error = resGenerator.generate(true, "No result found , empty array", 204, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "All tests fetched successfully", 200, tests);
            res.send(response);
        }
    });
});
/*******************************************************************************************************************/

//API to display single test...
testRouter.get('/test/:test_id', auth, function (req, res) {

    Test.findById({
        _id: req.params.test_id
    }, function (err, test) {
        console.log(req.params.test_id);
        console.log(test);
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else if (test === null || test === undefined || test === []) {
            var error = resGenerator.generate(true, "No result found, Or test Deleted...", 204, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "Test fetched successfully", 200, test);
            res.send(response);
        }
    });
});
/*******************************************************************************************************************/

//api to update a test by Admin
testRouter.put('/test/update/:test_id', auth, function (req, res) {
    Test.findByIdAndUpdate({
        _id: req.params.test_id
    }, req.body, function (err, test) {
        if (err) {
            var error = resGenerator.generate(true, "Some Error Ocurred, error : " + err, 500, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "Successfully updated A Test", 200, test);
            res.send(response);
        }
    });
});
/*******************************************************************************************************************/

//api to delete a test by admin
testRouter.delete('/test/delete/:test_id', auth, function (req, res) {

    Test.findByIdAndRemove(req.params.test_id, function (err, test) {
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else if (test === null || test === undefined || test === []) {
            var error = resGenerator.generate(true, "No result found , empty array", 204, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "Test deleted successfully", 200, test);
            res.send(response);
        }
    });
});
/******************************************************************************************************************/

//API'S for creation of Question By Admin Panel...
testRouter.post('/:test_id/createquestions', auth, function (req, res) {
    var question = new Question(req.body);
    console.log(question);

    Test.findById({
        _id: req.params.test_id
    }, function (err, test) {
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, remove '/' Symbol from the Test ID error : " + err, 500, null);
            res.send(error);
        } else {
            if (test.questions.length == 10) {
                var error = resGenerator.generate(true, "Sorry! you can add only 10 Questions... or remove '/' and try Again... " + err, 500, null);
                res.send(error);
            } else {
                question.save();
                test.questions.push(question)
                test.save(function (err, test) {
                    if (err) {
                        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                        res.send(error);
                    } else if (question === null || question === undefined || question === []) {
                        var error = resGenerator.generate(true, "No result found , empty array", 204, null);
                        res.send(error);
                    } else {
                        var response = resGenerator.generate(false, "Question Created successfully", 200, question);
                        res.send(response);
                    }
                });
            }
        }
    });
});
/********************************************************************************************************************/

//to get all questions by User as well as Admin
testRouter.get('/:test_id/getquestions', auth, function (req, res) {
    Test.findById({
        _id: req.params.test_id
    }, function (err, test) {
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else if (test === null || test === undefined || test === []) {
            var error = resGenerator.generate(true, "No Questions found , empty array", 204, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "All Questions fetched successfully", 200, test.questions);
            res.send(response);
        }
    })
});
/**********************************************************************************************************************/

//api to delete a question from questions as well as test model by Admin
testRouter.get('/question/:test_id/:index/:question_id/delete', auth, function (req, res) {
    Test.findOne({
        _id: req.params.test_id
    }, function (err, test) {
        if (err) {
            var error = resGenerator.generate(true, "Please remove '/' symbol From Test ID. : " + err, 500, null);
            res.send(error);
        } else {
            if (test.questions.length == 0) {
                var error = resGenerator.generate(true, "Sorry! There are no Question for this test : " + err, 500, null);
                res.send(error);
            } else {
                Question.findByIdAndRemove(req.params.question_id);
                test.questions.splice(req.params.index, 1);
                console.log(test.questions);
                test.save(function (err, question) {
                    if (err) {
                        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                        res.send(error);
                    } else {
                        var response = resGenerator.generate(false, "Question has been deleted successfully!!!", 200, question);
                        res.send(response);
                    }
                });
            }
        }
    });
});
/***********************************************************************************************************************/

//api to update a question
testRouter.post('/question/:test_id/:index/:question_id/update', auth, function (req, res) {
    Question.findByIdAndUpdate(req.params.question_id, req.body, function (err, question) {
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else {
            console.log("test updated successfully!!!");
            Test.findById(req.params.test_id, function (err, test) {
                test.questions.splice(req.params.index, 1);
                var ques = new Question(req.body);
                test.questions.push(ques);
                test.save(function (err, result) {
                    if (err) {
                        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                        res.send(error);
                    } else {
                        var response = resGenerator.generate(false, "Question Updated successfully!!!", 200, result);
                        res.send(response);
                    }
                })

            })
        }
    });
});
/************************************************************************************************************************/

//API'S to store the data of the User in the mongoDB.....

//api to add scores to mongodb
testRouter.post('/tests/:test_id/questions/:question_id/answer', auth, function (req, res) {
    //api to add test result in db with all details
    var answerResult;
    var timeTakenEach;
    Question.findById(req.params.question_id, function (err, question) {
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else {
            console.log(question);
            console.log(req.body);
            var answer = new Answer(req.body);
            answer.user = decodedToken.id;
            answer.question = req.params.question_id;
            answer.test = req.params.test_id;
            console.log("user--" + answer.userAnswer);
            console.log("admin--" + answer.correctAnswer);
        }
        answer.save(function (err, answer) {
            if (err) {
                var error = resGenerator.generate(true, "Some Error Ocurred, error : " + err, 500, null);
                res.send(error);
            } else {
                var response = resGenerator.generate(false, "Successfully Given A Test", 200, answer);
                res.send(response);
            }
        });
    });
});
/*********************************************************************************************************************/

//api to get the answers of specific test ...

testRouter.get('/tests/:test_id/answers', auth, function (req, res) {
    Answer.find({
        "$and": [{
            "user": req.decodedToken.id
        }, {
            "test": req.params.test_id
        }]
    }, function (err, answer) {
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "All Answers fetched successfully", 200, answers);
            res.send(answers);
        }
    });
});
/*********************************************************************************************************************/

//api to get the answers given by the user for specific test...
testRouter.get('/tests/:user_id/answers', auth, function (req, res) {
    Answer.find(req.params.user_id, function (err, answers) {
        console.log(tests);
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else if (answers === [] || answers === undefined || answers === null) {
            var error = resGenerator.generate(true, "No result found , empty array", 204, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "All Answers fetched successfully for Various Tests", 200, answers);
            res.send(response);
        }
    });
});
/*********************************************************************************************************************/

//api for performance
testRouter.post('/performance/:test_id', auth, function (req, res) {
    //api to add test result in db with all details
    var scorePerformance = new Performance(req.body);
    scorePerformance.user = decodedToken.id;
    scorePerformance.test = req.params.test_id;
    scorePerformance.save(function (err, scorePerformance) {
        if (err) {
            var error = resGenerator.generate(true, "Some Error Ocurred, error : " + err, 500, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "Successfully Stored totalPerformance", 200, scorePerformance);
            res.send(response);
        }
    });
});
/*********************************************************************************************************************/

//api to get the performance of users in specific tests...

testRouter.get('/performance/:test_id', auth, function (req, res) {
    //api to get  performance test specific
    Performance.find(req.params.test_id, function (err, Performance) {
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else if (Performance === [] || Performance === undefined || Performance === null) {
            var error = resGenerator.generate(true, "No result found , empty array", 204, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "Performance for Test successfully fetched!!!", 200, Performance);
            res.send(response);
        }
    });
});
/*********************************************************************************************************************/

//api to get the performance of specific user in specific test...

testRouter.get('/performance/user/:user_id', auth, function (req, res) {
    //api to get  performance user specific
    Performance.find({
        user: req.params.user_id
    }, function (err, Performance) {
        if (err) {
            var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
            res.send(error);
        } else if (Performance === [] || Performance === undefined || Performance === null) {
            var error = resGenerator.generate(true, "No result found , empty array", 204, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "TotalPerformance of user in all Tests fetched successfully!!!", 200, Performance);
            res.send(response);
        }
    });
});
/************************************************************************************************************************/


// api to store test attemptedby users start
testRouter.put('/tests/:testid/attemptedby', auth, function (req, res) {
    console.log(req.body.testAttemptedBy);
    Test.findByIdAndUpdate({
        _id: req.params.testid
    }, {
        $push: {
            testAttemptedBy: req.body.testAttemptedBy
        }
    }, function (err, test) {
        if (err) {
            var error = resGenerator.generate(true, "Some Error Ocurred, error : " + err, 500, null);
            res.send(error);
        } else {
            var response = resGenerator.generate(false, "Successfully Updated The Test", 200, test);
            res.send(response);
        }
    });
});
/************************************************************************************************************************/

/*(((((((((((((((((((((((((((((((((((((((((END OF ALL  APIS)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*/

//export testRouter
module.exports = testRouter;
