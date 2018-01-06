var mongoose = require('mongoose')
var Schema  =  mongoose.Schema;

var answerSchema = new Schema({

                          	user: {
                          	    type: String, require:true
                          	  },
                          	  test: {
                          	    type: String, require:true
                          	  },
                          	  question: {
                          	    type: String, require:true
                          	  },
                          	  userAnswer: {
                          	    type: String, require:true
                          	  },
                              correctAnswer: {
                          	    type: String, require:true
                          	  },
                              timeTakenEach: {
                                type: Number,
                                default: 1
                              }  //insecs

})

module.exports = mongoose.model('Answer', answerSchema);

