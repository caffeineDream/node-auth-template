/* Module dependencies */
const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');

/* Get port from environment and store it in Express */
var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

/* Normalize port */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/* Create HTTP server */
const server = http.createServer(app);

/* Listen on provided port */
server.listen(port, () => {
    console.log(`Listening on port ${port}!`);
})

/* Connect to mongoDB with mongoose */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to Mongo!')
});
mongoose.set('useFindAndModify', false);