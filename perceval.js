var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var QuizBot = require('slackquizbot')

var port = process.env.PORT || 3000
var myQuizBot = new QuizBot("", "fr");
var score = [];
var mySocket;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('Un client est connecté')
  console.log(socket.id)
  socket.emit('message', 'lol')
  mySocket = socket;
});

app.post('/api/quiz-start', function (req, res) {
    var slackChanel = "C3DGRQNSF";
    var quizId= "myquiz";
    try {
      if (mySocket !== undefined) {
        mySocket.emit('start_quiz', 'Coucou petit raspberry')
      } else {
        console.log('Et meeeeerde (Début du quiz)')
      }
        myQuizBot.startQuiz(quizId, slackChanel, quizId);
    } catch (err) {
        console.log(err);
    }
});

myQuizBot.addScore = function(points, user) {
    console.log(score)
    if (mySocket !== undefined) {
        mySocket.emit('end_quiz', {user: user, score:1})
      } else {
        console.log('Et meeeeerde (Fin du quiz)')
      }
}

http.listen(port, function(){
  console.log('Perceval est éveillé sur le port: ' + port);
});
