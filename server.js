const express = require('express');
const app = express();

const path = require('path');

app.use(express.static('static'));

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Crowdsourcer';
app.locals.polls = {};


app.get('/', (request, response) => {
  response.render('pages/index');
});

app.post('/polls', (request, response) => {
  response.sendStatus(201);
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
