let database = {
	instance: null,

	get() {
		return this.instance;
	},

	set(instance) {
		this.instance = instance;
	},
};

module.exports = { database };
