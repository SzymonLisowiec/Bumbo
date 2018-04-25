const NodeWatch = require('node-watch');

class Watcher {

	constructor (posts_dir, collector) {

		this.collector = collector;
		this.watcher = NodeWatch(posts_dir, { recursive: true });

		this.watcher.on('change', this.onChange.bind(this));

	}

	onChange () {

		this.collector.collectPosts();

	}

}

module.exports = Watcher;