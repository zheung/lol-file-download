
global._fs = require('fs');
global._pa = require('path');
global._as = require('assert');
global._ul = require('url');

global.Axios = require('axios');
global.Fex = require('fs-extra');
global.Zstd = require('node-zstandard');

let logs = [];

global.L = function(...argv) {
	(console || {}).log(...argv);

	logs.push(argv.join('\t'));
};

global.L.end = function(text, path) {
	if(text) {
		L('END', text);
	}
	else {
		L('END');
	}

	if(path) {
		_fs.writeFileSync(path, logs.join('\r\n'));
	}
};

global.T = {
	objSort(obj) {
		Object.keys(obj).sort().map(function(key) {
			let val = obj[key];

			delete obj[key];

			obj[key] = val;

			if(val && typeof val == 'object') {
				T.objSort(val);
			}
		});

		return obj;
	},
	async unZstd(path, buffer, returnBuffer = false) {
		_fs.writeFileSync('./temp/zstd', buffer);

		await new Promise((resolve, reject) => Zstd.decompress('./temp/zstd', path, err => err ? reject(err) : resolve()));

		if(returnBuffer) {
			return _fs.readFileSync(path);
		}
	}
};

try {
	global.C = require('./config');
} catch (error) {
	global.C = require('./config.default');
}