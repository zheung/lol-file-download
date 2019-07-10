module.exports = async function(manifestURL, version) {
	let maniLocal = _pa.join('./temp/manifest', `${version}-${_pa.parse(manifestURL).base}`);
	let maniBuffer;

	if(_fs.existsSync(maniLocal)) {
		L('[Manifest] cache exists, use cache.');

		maniBuffer = _fs.readFileSync(maniLocal);
	}
	else {
		L('[Manifest] fetch...');
		let maniBuffer = (await Axios.get(manifestURL, { responseType: 'arraybuffer' })).data;

		L(`[Manifest] fetched, save at '${maniLocal}'`);
		_fs.writeFileSync(maniLocal, maniBuffer);
	}

	return maniBuffer;
};