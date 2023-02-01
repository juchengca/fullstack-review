const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  stargazers: Number,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  Repo.collection.insertMany(repos, (err, res) => {
    if (err) {
      console.log('err: ', err);
    } else {
      callback(res);
    }
  });

}

let read = (callback) => {
  Repo.collection.find({}).toArray(function(err, result) {
    if (err) {
      console.log('err: ', err);
    } else {
      callback(result);
    }
  })
}

module.exports.save = save;
module.exports.read = read;