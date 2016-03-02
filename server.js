const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const generateId = require('./lib/generate-id');

const path = require('path');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.locals.title = 'Crowdsourcer';
app.locals.polls = {};


app.get('/', (request, response) => {
  response.render('pages/index');
});

app.post('/polls', (request, response) => {
  var id = generateId();

  app.locals.polls[id] = request.body;
  console.log(request.body, request.body.length)

  response.sendStatus(201);
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
