//morgan imprime en consola,los datos de cada peticion
//que llegue a nuestro servidor
const morgan = require("morgan");

module.exports = morgan("dev");
