// Change to 80 or 150 whatever and see what happens
require("events").EventEmitter.prototype._maxListeners = 700;
require("events").defaultMaxListeners = 700;
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
 
server.use(middlewares)
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})

process.on("warning", function (err) {
	if ("MaxListenersExceededWarning" == err.name) {
		console.log("o kurwa");
		// write to log function
		process.exit(1); // its up to you what then in my case script was hang
	}
});
