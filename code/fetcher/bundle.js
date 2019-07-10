
module.exports = async function(bundleID, version, cdn) {
	let bid = bundleID.toString(16).toUpperCase();

	let bundleLocal = _pa.join('./temp/bundle', `${version}-${bid}.bundle`);
	let bundleBuffer;

	if(_fs.existsSync(bundleLocal)) {
		L(`[Bundle-${bid}] cache exists, use cache.`);

		bundleBuffer = _fs.readFileSync(bundleLocal);
	}
	else {
		L(`[Bundle-${bid}] fetch...`);
		let bundleBuffer = (await Axios.get(_ul.resolve(cdn, `channels/public/bundles/${bid}.bundle`), { responseType: 'arraybuffer' })).data;

		L(`[Bundle-${bid}] fetched, save at '${bundleLocal}'`);
		_fs.writeFileSync(bundleLocal, bundleBuffer);
	}

	return [bid, bundleBuffer];
};