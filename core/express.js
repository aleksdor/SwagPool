const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var helmet = require("helmet");
const jrpc = require('jrpc-srv')

const rpc = require('../routes/rpc')

// const conf = require("../conf");

async function startWeb(port, db) {
	let app = new express();

	app.use(cors());
	app.use(helmet());

	app.use(cookieParser());
	app.use(express.json({ limit: "350mb", extended: true }));
	app.use(express.urlencoded({ extended: true }));
	app.use(express.text());
	// app.use(upload.any());


	// Sugar for handling requests
	app.use((req, res, next) => {
		// If success send res.ok(data)
		res.ok = (data) => res.send({ success: true, data });

		// If failed send res.error("Error message")
		res.error = (data) => res.send({ success: false, data });

		// If just proxy, call res.handle(ProxiedPromise)
		res.handle = (async_func) => {
			async_func
				.then((r) => res.ok(r))
				.catch((ex) => {
					let msg = (ex.response && ex.response.data) || ex.message || ex;
					console.log("Request failed", msg, ex.stack); //
					res.error(msg);
				});
		};
		next();
	});

	app.use((req, res, next) => {
		req.db = db
		next()
	})

	const jrunner = jrpc.build_rpc_runner(rpc)
	const jrouter = jrpc.build_rpc_router(jrunner)
	app.use('/rpc', jrouter)	

	app.use("", require(`${__dirname}/../routes`));

	app.listen(port);
	console.log(`Server started at port ${port}`);
	return app;
};

module.exports = {
    startWeb
}


