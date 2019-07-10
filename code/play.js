const Biffer = require('./util/Biffer');

module.exports = async function(files) {
	let hashtable = [];
	for(let path in files) {
		hashtable.push(path);
		if(path.indexOf('LeeSin.zh_CN') + 1) {
			let file = files[path];

			let bundleIDSet = new Set();

			file.fileChunks.forEach(chunk => bundleIDSet.add(chunk.bundleID));

			// for(let bundleID of bundleIDSet) {
			// 	let bundlePath = `./reso/${bundleID.toString(16).toUpperCase()}.bundle`;
			// }

			for(let chunk of file.fileChunks) {
				let bid = chunk.bundleID.toString(16).toUpperCase();
				let bundlePath = `./reso/${bid}.bundle`;
				let parser = Biffer(bundlePath);

				parser.seek(chunk.offset);

				let tempPath =`./temp/chunk-${bid}-${chunk.offset}`;

				_fs.writeFileSync(tempPath, parser.raw(chunk.size));

				await new Promise(resolve => Zstd.decompress(tempPath, tempPath+'d', () => resolve()));

				Fex.appendFileSync(`./reso/chunk/{name}`, _fs.readFileSync(tempPath+'d'));
			}
		}
	}

};