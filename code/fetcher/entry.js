module.exports = async function(channel, solution, cdn) {
	L('[Version] fetching..');
	let data = (await Axios.get(_ul.resolve(cdn, `channels/public/${channel}.json`))).data;

	L(`[Version] is '${data.version}'`);

	let maniURL = data[solution + '_patch_url'];

	L(`[Manifest]'s URL is '${maniURL}'`);

	return [maniURL, data.version];
};