require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  mongoLocalServer: Boolean(process.env.MONGO_LOCAL_SERVER),
  mongoPort: process.env.MONGO_PORT,
  mongoDBName: process.env.MONGO_DB_NAME,
  mongoHost: process.env.MONGO_HOST,
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
};
