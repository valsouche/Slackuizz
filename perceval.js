var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var QuizBot = require('slackquizbot')

var port = process.env.PORT || 3000
var myQuizBot = new QuizBot("xoxb-111352045732-jPc3eUeu60YS1Eboa041o4Ef", "fr");
var score = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('Un client est connecté')
  console.log(socket.id)
});

app.get('/api/quiz-start', function (req, res) {
    var slackChanel = "C3DGRQNSF";
    var quizId= "myquiz";
    try {
        myQuizBot.startQuiz(quizId, slackChanel, quizId);
    } catch (err) {
        console.log(err);
    }
});

myQuizBot.addScore = function(points, user) {
    score.push({user: user, score:1})
    console.log(score)
}

http.listen(port, function(){
  console.log('Perceval est éveillé sur le port: ' + port);
});
