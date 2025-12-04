const User = require('../db/models/user');
const Post = require('../db/models/posts');
const Comment = require('../db/models/comments');
const Pet = require('../db/models/pets');
const Event = require('../db/models/events');
const EventAttendee = require('../db/models/event_attendees');

const addModels = (req, res, next) => {
  req.db = {
    User,
    Post,
    Comment,
    Pet,
    Event,
    EventAttendee,
  };
  next();
};

module.exports = addModels;