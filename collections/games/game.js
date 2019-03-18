const SimpleSchema = require('simpl-schema');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestentsContext = new SimpleSchema({
  contestentId: {
      type: Schema.Types.ObjectId,
      ref: 'contestants'
  },
  moneySpent: {
      type: Integer,
      required: true
  }
})

const PlayerContext = {
  playerId: {
      type: Schema.Types.ObjectId,
      ref: 'users'
  },
  moneyRemaining: {
      type: Integer,
      required: true
  },
  ContestentsOwned: {
    type:[ContestentsContex],
    default:[],
    required: true,
  },
  admin: {
    type:Boolean,
    default:false,
    required: true
  }
}


//Create Schema
const GameSchema = new Schema({
    madeBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    season: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    players:{
      type:[PlayerContext],
      required:true,
      default:[],
})

module.exports = Game = mongoose.model('games',GameSchema);
