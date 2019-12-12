require('./env');

const bnkBuffer = _fs.readFileSync('D:/Research/LOL客户端解包/CDTB/cdragontoolbox/新建文件夹/assets/sounds/wwise2016/vo/en_us/characters/annie/skins/base/annie_base_vo_events.bnk');

const Biffer = require('./code/util/Biffer');

const Section = require('./code/part/bnk/Section');

const topSections = [];

const bnkBiffer = Biffer(bnkBuffer);

L('Top Sections');
while(!bnkBiffer.isEnd()) {
	let [magic, length] = bnkBiffer.unpack('<4sL');

	topSections.push(Section(magic).parse(bnkBiffer.sub(length)));

	L(magic, length);
}

_fs.writeFileSync('./HIRC/result.json', JSON.stringify(topSections, null, '\t'));

L('end');