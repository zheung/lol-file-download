const Struct = require('./Struct');

module.exports = function Biffer(path) {
	if(!(this instanceof Biffer)) {
		return new Biffer(...arguments);
	}

	this.path = path;
	this.buffer = _fs.readFileSync(path);
	this.pos = 0;

	this.unpack = function(format) {
		let result = Struct.unpack(format, this.buffer, this.pos);

		this.pos += Struct.calc(format);

		return result;
	};
	this.tell = function() {
		return this.pos;
	};
	this.raw = function(length) {
		let start = this.pos;
		this.pos += length;

		return this.buffer.slice(start, this.pos);
	};
	this.seek = function(position) {
		this.pos = position;
	};
	this.skip = function(position) {
		this.pos += position;
	};

	this.unpackString = function() {
		let [length] = this.unpack('<L');

		let result = this.raw(length);

		return String(result);
	};
};