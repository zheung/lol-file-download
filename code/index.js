(async () => {
	require('./env');

	const play = require('./play');
	const parseRman = require('./parser/rman');
	const parseBody = require('./parser/body');

	const Manifest = require('./part/Manifest');

	let maniPath = './reso/7E54987B972432DB.manifest';

	let manifest = Manifest;

	await parseRman(manifest, maniPath);
	let files = await parseBody(manifest);

	await play(files);

	L.end();
})();