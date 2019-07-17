require('./env');

const fetchEntry = require('./code/fetcher/entry');
const fetchManifest = require('./code/fetcher/manifest');

const parseRman = require('./code/parser/rman');
const parseBody = require('./code/parser/body');

const Manifest = require('./code/part/Manifest');

Fex.ensureDirSync('./temp/manifest');
Fex.ensureDirSync('./temp/bundle');
Fex.ensureDirSync('./temp/chunk');

(async () => {
	L(`[Channel] ${C.channel} [Solution] ${C.solution} [CDN] ${C.cdn}`);

	let [maniURL, version] = await fetchEntry(C.channel, C.solution, C.cdn);

	let maniBuffer = await fetchManifest(maniURL, version);

	let manifest = Manifest(maniURL, version, C.cdn);

	let bodyBuffer = await parseRman(manifest, maniBuffer);
	await parseBody(manifest, bodyBuffer);

	// Just play it
	for(let pathFile in manifest.files) {
		if(pathFile.toLowerCase().indexOf('Global.en_US.wad'.toLowerCase()) + 1) {
			let file = manifest.files[pathFile];

			await file.extract(manifest.version, manifest.cdn);
		}
	}

	L.end();
})();