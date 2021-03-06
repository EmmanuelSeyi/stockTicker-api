const mongoose = require('mongoose');
const debug = require('debug');
const { DB_URI: connectionUri } = require('./util');

const log = debug('log');

const connect = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      log('Database connecting...');
      await mongoose.connect(connectionUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });

      log('Connected!');
    }
  } catch (error) {
    log(error);
    process.exit(1);
  }
};

const format = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    );

    await Promise.all(promises);
  }
};

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

module.exports = { connect, format, disconnect };
