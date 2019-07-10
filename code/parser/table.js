module.exports = async function parseTable(parser, entryParser) {
	let [count] = parser.unpack('<l');

	let list = [];

	for(let i = 0; i < count; i++) {
		if(i % 500 == 0) {
			L(entryParser.name, i);
		}

		let pos = parser.tell();
		let [offset] = parser.unpack('<l');

		parser.seek(pos + offset);

		list.push(await entryParser(parser));

		parser.seek(pos + 4);
	}

	return list;
};