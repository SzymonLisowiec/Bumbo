const Path = require('path');

require('dotenv').config({path: Path.resolve(__dirname, '.env')});

const Watcher = require('./app/Watcher');
const Collector = require('./app/Collector');
const Server = require('./app/Server');
const Loader = require('./app/Loader');

class Main {

	constructor () {

		let posts_dir = Path.resolve(__dirname, 'posts');

		this.collector = new Collector(posts_dir);
		this.collector.collectPosts();
		
		this.watcher = new Watcher(posts_dir, this.collector);
		this.loader = new Loader(posts_dir);
		this.server = new Server(this.loader);

	}

}

module.exports = new Main();