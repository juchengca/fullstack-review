const express = require('express');
let app = express();
const cors = require('cors')
var getRepos = require('../helpers/github.js');

app.use(cors());
app.use(express.json());

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.get('/', (req, res) => {
  res.send('get /');
});

app.post('/repos', function (req, res) {
  console.log('req: ', req.body);
  getRepos.getReposByUsername(req.body.username, (repos) => {
    console.log(repos);
  });

  res.send('success');
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.send('hello');

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

