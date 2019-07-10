const Biffer = require('./code/util/Biffer');

let fetchBundle = require('./code/fetcher/bundle');

module.exports = function File(name, fileSize, link, langs, fileChunks) {
	if(!(this instanceof File)) {
		return new File(...arguments);
	}

	this.name = name;
	this.fileSize = fileSize;
	this.link = link;
	this.langs = langs;
	this.fileChunks = fileChunks;

	this.extract = async function(version, cdn) {
		let bundleIDSet = new Set();

		this.fileChunks.forEach(chunk => bundleIDSet.add(chunk.bundleID));

		let bundleBuffer = {};
		for(let bundleID of bundleIDSet) {
			let [bid, buffer] = await fetchBundle(bundleID, version, cdn);

			bundleBuffer[bid] = buffer;
		}

		let pathFinal = _pa.join('./assets/', this.name);

		Fex.removeSync(pathFinal);

		for(let chunk of this.fileChunks) {
			let bid = chunk.bundleID.toString(16).toUpperCase();

			let parser = Biffer(bundleBuffer[bid]);

			parser.seek(chunk.offset);

			Fex.ensureDirSync(_pa.parse(pathFinal).dir);

			let chunkBuffer = await T.unZstd(_pa.join('./temp/chunk', `${chunk.chunkID}.chunk`), parser.raw(chunk.size), true);

			Fex.appendFileSync(pathFinal, chunkBuffer);
		}
	};
};