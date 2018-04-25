const Express = require('express');

class Server {

	constructor (loader) {

		this.loader = loader;
		this.server = Express();

		this.routing();

		this.server.listen(process.env.PORT, process.env.HOST, _ => {
			console.log('Server listening on ' + process.env.HOST + ':' + process.env.PORT);
		});

	}

	routing () {

		this.server.get('/posts', async (req, res) => {

			let from = req.query.from || 0;
			let limit = req.query.limit || 10;
			let tags = req.query.tags || false;

			if(limit >= 20) limit = 10;
			if(tags) tags = tags.split(',');

			res.end(JSON.stringify(await this.loader.list(from, limit, tags)));

		});

		this.server.get('/post/:post_id', async (req, res) => {

			res.end(JSON.stringify(this.loader.post(req.params.post_id)));

		});

	}

}

module.exports = Server;