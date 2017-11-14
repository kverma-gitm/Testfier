var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PerformanceSchema = new Schema({

        user: {
         type: String, required:true
        },


        test: [],
        score: {
          type: Number,
          default: 0
        },
        timeTaken: {
          type: Number,
          default: 0
        },
        totalCorrectAnswers: {
          type: Number,
          default: 0
        },
        totalWrongAnswers: {
          type: Number,
          default: 0
        }

})
module.exports = mongoose.model('Performance', PerformanceSchema)

