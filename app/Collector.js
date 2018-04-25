const Fs = require('fs');
const Path = require('path');
const Post = require('./Post');
const Cache = require('./Cache');

class Collector {

	constructor (posts_dir) {

		this.posts_dir = posts_dir;

	}

	async collectPosts () {

		let storage = {
			posts: {},
			tags: {},

			index_sort_by_time_asc: [],
			index_sort_by_time_desc: []
		};

		let posts = Fs.readdirSync(this.posts_dir);

		for(let i in posts){

			let filename = posts[i];
			let file = this.posts_dir + '/' + filename;

			try {

				if(Path.extname(filename) === '.md'){

					let post = new Post(file);
					let post_id = encodeURIComponent(filename.substr(0, filename.length-Path.extname(filename).length));
					//let post_id = Object.keys(storage.posts).length + 1;
					
					storage.posts[post_id] = {
						file
					};

					storage.index_sort_by_time_asc.push([post.attributes.time.getTime()/1000, post_id]);

					this.collectTags(storage, post.attributes.tags, post_id);

				}
				
			}catch(err){

				console.log(err);

			}

		}

		storage.index_sort_by_time_asc = storage.index_sort_by_time_asc.sort((a, b) => {
			if(a[0] < b[0]) return -1;
			if(a[0] > b[0]) return 1;
			return 0;
		}).map(data => {
			return data[1];
		});

		storage.index_sort_by_time_desc = storage.index_sort_by_time_asc.slice().reverse();

		for(let name in storage)
			Fs.writeFileSync(__dirname + '/../storage/' + name + '.json', JSON.stringify(storage[name]));

		Cache.clear();

	}

	async collectTags (storage, tags, post_id) {

		for(let i in tags){

			let tag = tags[i];

			if(typeof storage.tags[tag] != 'undefined')
				storage.tags[tag].push(post_id);
			else storage.tags[tag] = [post_id];

		}

	}

}

module.exports = Collector;