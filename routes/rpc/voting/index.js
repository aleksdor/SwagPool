const { database } = require("../../../core/database");

module.exports = {
	/**
	 * Start voting for stream
	 * @param {string} stream_id
	 */
	 startVoting(stream_id) {	
		return stream_id
	},

	/**
	 * Stop voting for stream
	 * @param {*} stream
	 */
	 stopVotiong(stream) {},

	/**
	 * Vote for photo by user token
	 * @param {*} photo_id
	 * @param {*} utoken
	 */
	async vote(photo_id, utoken) {
		const { User, Photo } = database.get().models;

		const user = await User.findOne({ where: { utoken } });
		if (!user) throw "User with such token not defined";

		const photo = await Photo.findByPk(photo_id);
		if (!photo) throw `Photo ${photo_id} not defined`;

		if (photo.votes && photo.votes.includes(user.id)) throw "User already voted";

		photo.votes = photo.votes ? [...photo.votes, user.id] : [user.id];
		await photo.save();

		return photo.votes.length;
	},




};
