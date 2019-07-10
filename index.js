require('./env');

const fetchEntry = require('./code/fetcher/entry');
const fetchManifest = require('./code/fetcher/manifest');

const parseRman = require('./code/parser/rman');
const parseBody = require('./code/parser/body');

const Manifest = require('./code/part/Manifest');


Fex.ensureDirSync('./temp/manifest');
Fex.ensureDirSync('./temp/bundle');
Fex.ensureDirSync('./temp/chunk');

let channel = 'pbe-pbe-win';
let solution = 'game';
let cdn = 'https://lol.dyn.riotcdn.net';

(async () => {
	L(`[Channel] is '${channel}'`);
	L(`[Solution] is '${solution}'`);
	L(`[CDN] is '${cdn}'`);

	let [maniURL, version] = await fetchEntry(channel, solution, cdn);

	let maniBuffer = await fetchManifest(maniURL, version);

	let manifest = Manifest(maniURL, version, cdn);

	let bodyBuffer = await parseRman(manifest, maniBuffer);
	await parseBody(manifest, bodyBuffer);

	// Just play it
	for(let pathFile in manifest.files) {
		if(pathFile.indexOf('LeeSin.zh_CN') + 1) {
			let file = manifest.files[pathFile];

			await file.extract(manifest.version, manifest.cdn);
		}
	}

	L.end();
})();