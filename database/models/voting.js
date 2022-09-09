"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class object extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	object.init(
		{
			photoId: DataTypes.INTEGER,
			voted: DataTypes.ARRAY(DataTypes.INTEGER),
			stopped: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: "Voting",
			timestamps: false
		}
	);
	return object;
};
