const express = require('express');
const mongoose = require('mongoose');
const itunesAPI = require("node-itunes-search");
const app = express();

// app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongodb:27017/hapodcastia',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Podcast = require('./models/Podcast');

app.get('/podcasts', (req, res) => {
  Podcast.find()
    .then(podcasts => res.json(podcasts))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});


app.post('/itunes', (req, res) => {
  const searchOptions = new itunesAPI.ItunesSearchOptions({
    term: req.body['searchTerm'],
    limit: 5,
    entity: itunesAPI.ItunesEntityPodcast.Podcast
  });
  
  itunesAPI.searchItunes(searchOptions).then((result) => {
    res.json(result.results);
  });
});



// app.post('/item/add', (req, res) => {
//   const newItem = new Item({
//     name: req.body.name
//   });

//   newItem.save().then(item => res.redirect('/'));
// });

const port = 3000;

app.listen(port, () => console.log('Server running...'));
