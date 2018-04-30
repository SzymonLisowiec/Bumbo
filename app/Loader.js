const Fs = require('fs');
const Post = require('./Post');
const Cache = require('./Cache');

class Loader {

	constructor (posts_dir) {

		this.posts_dir = posts_dir;

	}

	async list (from, limit, tags) {

		tags = (typeof tags === 'object') ? tags : [];

		let cache_key = 'list_' + from + ':' + limit + ((tags.length > 0) ? ':' + tags.join(',').toLowerCase() : '');
		let cache = await Cache.get(cache_key);
		
		if(cache === null){
			
			let posts = [];
			let index = this.loadIndexFile();
			let count = 0;
			let all_tags = this.loadTags();
			let all_posts = this.loadPosts();
			
			if(tags.length > 0){

				let whitelist = [];
				for(let i in tags)
					whitelist = whitelist.concat(all_tags[tags[i].toLowerCase()]);
				
				index = index.filter(post_id => {
					return whitelist.indexOf(post_id) > -1;
				});

			}

			count = index.length;
			index = index.slice(from, from+limit);
			
			for(let i in index){
				
				let post = new Post(all_posts[index[i]].file);
				posts.push({
					id: post.id,
					title: post.title,
					time: post.time.getTime()/1000,
					tags: post.tags
				});

			}

			Cache.set(cache_key, {
				posts,
				count
			});

			return {
				posts,
				count
			};

		}
		
		return cache;
	}

	post (post_id) {

		try {

			let post = new Post(this.loadPosts()[post_id].file);
			
			return {
				title: post.title,
				time: post.time.getTime()/1000,
				tags: post.tags,
				content: post.content,
				description: post.description,
				keywords: post.keywords,
				author: post.author
			};

		}catch(err){

			return {};

		}

	}

	loadIndexFile () {

		try {

			return JSON.parse(Fs.readFileSync(this.posts_dir + '/../storage/index_sort_by_time_desc.json'));

		}catch(err){

			return false;

		}

	}

	loadPosts () {

		try {

			return JSON.parse(Fs.readFileSync(this.posts_dir + '/../storage/posts.json'));

		}catch(err){

			return {};

		}

	}

	loadTags () {

		try {

			return JSON.parse(Fs.readFileSync(this.posts_dir + '/../storage/tags.json'));

		}catch(err){

			return {};

		}

	}

}

module.exports = Loader;