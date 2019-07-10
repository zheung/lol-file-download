
global._fs = require('fs');
global._pa = require('path');
global._cr = require('crypto');
global._as = require('assert');

global.Axios = require('axios');
global.Fex = require('fs-extra');
global.Zstd = require('node-zstandard');

let logs = [];

global.L = function(...argv) {
	(console || {}).log(...argv);

	logs.push(argv.join('\t'));
};

global.L.end = function(path, text) {
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

	QtoBI({ high, low } = { high: 0, low: 0 }) {
		return (BigInt(high >>> 0) << BigInt(32)) | BigInt(low >>> 0);
	}
};