const dbConfig = require("../config/db.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.download = require("./download.model.js")
// (mongoose);

module.exports = db;