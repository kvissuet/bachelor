const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ContestantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
  },
  instagram: {
    type: String,
  },
  picture: {
    type: String,
  },
})

module.exports = Contestant = mongoose.model('contestants',ContestantSchema);
