const mongoose = require("mongoose");

const {
  mongoLocalServer,
  mongoPort,
  mongoDBName,
  mongoHost,
  mongoPassword,
  mongoUser,
} = require("../config/config.js");

let uri;

if (mongoLocalServer) {
  uri = `mongodb://localhost:${mongoPort || 27017}/${
    mongoDBName || "node-images-app"
  }`;
} else {
  const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}/${
    mongoDBName || "node-images-app"
  }?retryWrites=true&w=majority`;
}

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error("------- New Error:", err));
