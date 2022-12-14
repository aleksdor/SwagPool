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
			stream: DataTypes.STRING,
			author: DataTypes.INTEGER,
			photo: DataTypes.STRING,
			votes: DataTypes.JSON
		},
		{
			sequelize,
			modelName: "Photo",
			timestamps: false
		}
	);
	return object;
};
