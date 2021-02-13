const path = require("path");
const express = require("express");
const { format } = require("timeago.js");

const { port } = require("./config/config.js");

const app = express();
require("./db/mongodb");

//Settings
app.set("port", port || 3000);
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

//Middleware
app.use(require("./middleware/morgan"));
app.use(express.urlencoded({ extended: false }));
app.use(require("./middleware/multer"));
app.use((req, res, next) => {
  app.locals.formatDate = format; //ahora se puede acceder al metodo format de manera global en la app
  next();
});

//Routes
app.use(require("./routes"));

//Static Files
app.use(express.static(path.join(__dirname, "./public"))); //Da acceso al cliente a todo lo que esté dentro de la carpeta public

app.listen(app.get("port"), () => {
  console.log(`Server listenning on http://localhost:${app.get("port")}`);
});
