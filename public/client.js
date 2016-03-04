var socket = io();

var statusMessage = document.getElementById('status-message');
var buttons = document.querySelectorAll('#choices button');
var pathURL = window.location.pathname.split("/")
var pollId = pathURL[pathURL.length - 1]
var voteCount = document.getElementById('vote-count');


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', {vote: this.innerText, pollId: pollId });
  });
}

socket.on('voteCount', function (poll) {
  var i = 1
  for (var choice in poll.choices) {
    $(`#${poll.id}-${i}`).text(`${poll.choices[choice]}`)
    i++
};
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

$('#end-poll').on('click', function() {
  socket.send('endPoll', { pollId: pollId });
})
