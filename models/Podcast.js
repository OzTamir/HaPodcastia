const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PodcastSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
});

module.exports = Podcast = mongoose.model('podcast', PodcastSchema);
