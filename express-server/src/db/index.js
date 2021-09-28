const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@mean_mongo:27017/');
mongoose.Promise = global.Promise;

module.exports = mongoose;