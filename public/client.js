var socket = io();

var statusMessage = document.getElementById('status-message');
var buttons = document.querySelectorAll('#choices button');
var pathURL = window.location.pathname.split("/")
var pollId = pathURL[pathURL.length - 1]
var voteCount = document.getElementById('vote-count');
var $choices = $('#choices')
var $adminClosing = $('#admin-closing')


for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send(`voteCast-${pollId}`, {vote: this.innerText, pollId: pollId });
  });
}

socket.on(`voteCount-${pollId}`, function (poll) {
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
  socket.send(`endPoll-${pollId}`, { pollId: pollId });
})

socket.on(`pollClosed-${pollId}`, function (message) {
  $adminClosing.children().remove()
  $adminClosing.append(`<h3>This poll has been closed</h3>`)
  $choices.children().remove()
  $choices.append('<h5>Voting has been closed for this poll</h5>')
});
