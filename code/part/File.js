module.exports = function File(name, fileSize, link, langs, fileChunks) {
	if(!(this instanceof File)) {
		return new File(...arguments);
	}

	this.name = name;
	this.fileSize = fileSize;
	this.link = link;
	this.langs = langs;
	this.fileChunks = fileChunks;
};