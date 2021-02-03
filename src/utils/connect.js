const mongoose = require('mongoose');

const { DB_USERNAME, DB_PASSWORD } = process.env;

function connect() {
  return mongoose.connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.tdlyc.mongodb.net/test`,
    { useNewUrlParser: true }
  );
}

module.exports = connect;
