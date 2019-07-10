const Biffer = require('../util/Biffer');

module.exports = async function parseRman(manifest, path) {
	let parser = Biffer(path);

	let [magic, versionMajor, versionMinor] = parser.unpack('<4sBB');

	if(magic != 'RMAN') {
		throw 'invalid magic code';
	}

	if(versionMajor != 2 || versionMinor != 0) {
		throw `unsupported RMAN version: ${versionMajor}.${versionMinor}`;
	}

	let [flags, offset, length, manifestId, bodyLength] = parser.unpack("<HLLQL");

	_as(flags & (1 << 9));
	_as(offset == parser.tell());

	let bodyRaw = parser.raw(length);

	_fs.writeFileSync('./temp/raw', bodyRaw);

	await new Promise(resolve => Zstd.decompress('./temp/raw', './temp/body', () => resolve()));
};