const Fs = require('fs');
const Path = require('path');

class Post {

	constructor (file) {
		
		this.file = file;
		this.attributes = {};

		this.filename = Path.basename(this.file);
		this.id = encodeURIComponent(this.filename.substr(0, this.filename.length-Path.extname(this.filename).length));

		if(!this.readFile()) throw new Error('Cannot read file');

	}

	get title () { return this.attributes.title; }
	get time () { return this.attributes.time; }
	get tags () { return this.attributes.tags || []; }
	get description () { return this.attributes.description || false; }
	get keywords () { return this.attributes.keywords || []; }
	get author () { return this.attributes.author || false; }

	readFile () {

		try {

			if(Path.extname(this.file) === '.md'){
			
				let content = Fs.readFileSync(this.file).toString();

				this.attributes = this.readAttributes(content);

				if(this.attributes){
					
					this.attributes.title = this.attributes.title.trim();
					this.attributes.time = this.readTime();

					if(this.attributes.time){
						
						if(this.attributes.tags)
							this.readTags();

						this.content = content.replace(content.trim().match(/^\-\-\-([^>]*)\-\-\-/)[0], '');

						return true;

					}

				}

			}

		}catch(err){

			console.log(err);

		}

		return false;
	}

	readAttributes (content) {

		let meta = content.trim().match(/^\-\-\-([^>]*)\-\-\-/);
				
		if(meta != null){
					
			let attributes = {};
					
			meta = meta[1].trim();
			meta = meta.split(/\r?\n/);
					
			for(let i in meta){

				let seperator_pos = meta[i].indexOf(':');
						
				if(seperator_pos > -1){

					let attr_name = meta[i].substr(0, seperator_pos).trim();
					attributes[attr_name] = meta[i].substr(seperator_pos + 1).trim();

				}

			}
					
			if(attributes.title && attributes.time)
				return attributes;

		}

		return false;
	}

	readTags () {

		let tags = this.attributes.tags.split(',');

		for(let i in tags)
			tags[i] = tags[i].trim().toLowerCase();

		this.attributes.tags = tags;
	}

	readTime () {

		let time = new Date(this.attributes.time.trim());
		
		if(time == 'Invalid Date') return false;
		else return time;
	}

}

module.exports = Post;