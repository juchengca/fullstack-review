const express = require('express');
let app = express();
var getRepos = require('../helpers/github.js');
var saveRepos = require('../database/index.js');

app.use(express.json());
//app.use(express.static('../client/dist'));
app.use(express.static(__dirname + '/../client/dist')); // html file

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.


app.post('/repos', function (req, res) {

  getRepos.getReposByUsername(req.body.username, (repos) => {
    // read all urls from database to check for duplicates
    var allURLS = [];
    saveRepos.read((allRepos) => {
      for (var j = 0; j < allRepos.length; j++) {
        allURLS.push(allRepos[j].url);
      }
      var userRepos = [];
      var tempObj = {};
      // add new repo objects to array to be written if not already in database
      for (var i = 0; i < repos.length; i++) {
        if (!allURLS.includes(repos[i].html_url)) {
          tempObj.id = repos[i].id;
          tempObj.name = repos[i].name;
          tempObj.stargazers = repos[i].stargazers_count;
          tempObj.url = repos[i].html_url;
          userRepos.push(tempObj);
          tempObj = {};
        }
      }
      // if new repo array is not empty, write to database
      if (userRepos.length > 0) {
        saveRepos.save(userRepos, () => {
          console.log('Success: user repo written to database');
          res.send();
        });
      } else {
        console.log('Repo already in database')
        res.send();
      }
    })
  });

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  var repos = [];
  var top25 = [];
  saveRepos.read((allRepos) => {
    repos = allRepos.sort((a, b) => b.stargazers - a.stargazers);
    for (var i = 0; i < repos.length; i++) {
      if (i < 25) {
        top25.push(repos[i]);
      }
    }
    res.send(top25);
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

