var QuizBot = require('slackquizbot');

var express = require('express');

var myQuizBot = new QuizBot("xoxb-111352045732-EpQx8mkB1iK0gOFcg9HOA3ve", "fr");

// console.log('QuizBot ' + myQuizBot);

// myQuizBot.startQuiz();

var app = express();

var server = app.listen(8081, function () {
    console.log("Example app listening");
})

app.post('/api/github', function (req, res) {


    res.send('hello world');
});

var slackChanel = "C3DGRQNSF";
var quizId= "myquiz";
app.get('/api/quiz-start', function (req, res) {
    try {
        var c = myQuizBot.getContext();
        console.log(c);
        myQuizBot.startQuiz(quizId, slackChanel, quizId);
    } catch (err) {
        console.log(err);
    }
});

