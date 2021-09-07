const mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@localhost/mean-auth');
mongoose.Promise = global.Promise;

module.exports = mongoose;