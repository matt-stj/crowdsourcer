var socket = io();

var statusMessage = document.getElementById('status-message');
var buttons = document.querySelectorAll('#choices button');
var pathURL = window.location.pathname.split("/")
var pollId = pathURL[pathURL.length - 1]


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', {vote: this.innerText, pollId: pollId });
  });
}

// socket.on('voteCount', function (pollId, votes) {
//   console.log(pollId, votes);
// });

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});
