module.exports = function HIRC(type, id) {
	if(!(this instanceof HIRC)) {
		return new HIRC(...arguments);
	}

	this.type = type;
	this.id = id;

	this.parse = function(B) {
		try {
			_fs.writeFileSync(`./HIRC/${type}@${id}@${id.toString(16).toUpperCase()}.hirc`, B.buffer);
		} catch(error) { true; }

		// Even Action
		if(type == 3) {
			const [scope, actionType, hircID, paramCount] = B.unpack('BBLxB');

			this.scope = scope;
			this.actionType = actionType;
			this.hircID = hircID;

			if(paramCount) {
				// Unused Struct
				this.paramTypes = B.unpack(`${paramCount}B`);

				L('Unused Even Action Param', actionType, paramCount);
			}

			// Unused Struct
			if(this.actionType != 4) {
				debugger;
			}
		}
		// Event
		else if(type == 4) {
			const [count] = B.unpack('B');

			this.count = count;

			if(count) {
				this.eActions = B.unpack(`${count}L`);
			}
		}

		return this;
	};
};