const Cacheman = require('cacheman');

module.exports = new Cacheman(process.env.CACHE_NAME, {
	ttl: 360,
	engine: 'file'
});