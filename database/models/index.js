"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const conf = require('../../conf.js')
const raw_config = conf.db

const db = {};

function loadAllModels(sequelize){
	fs.readdirSync(__dirname)
		.filter((file) => {
			return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
		})
		.forEach((file) => {
			const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
			db[model.name] = model;
		});
	
	Object.keys(db).forEach((modelName) => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});
}

async function create(db_name){
	let sequelize;

	let config = Object.assign({}, raw_config)
	
	if (config.dialect.toLowerCase() == 'sqlite')
	{
		config.storage += `${db_name}.sqlite`
	}
	else{
		sequelize = new Sequelize('', config.username, config.password, {...config});
		await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${db_name}`)
		// config = {...raw_config, database: db_name, logging: false}
	}	

	// sequelize = new Sequelize(config.database, config.username, config.password, config);	

	return connect(db_name, true)
	// loadAllModels()

	// db.sequelize = sequelize;
	// db.Sequelize = Sequelize;	
	
	// await db.sequelize.sync({alter: true})
	// return db.sequelize
}

async function connect(db_name, sync = false){
	let sequelize;

	let config = Object.assign({}, raw_config, {database: db_name})	
	
	const isSqlite = config.dialect.toLowerCase() == 'sqlite'

	if (isSqlite) config.storage += `${db_name}.sqlite`	

	sequelize = new Sequelize(config.database, config.username, config.password, config);

	if (isSqlite) await sequelize.query('PRAGMA journal_mode=OFF')

	loadAllModels(sequelize)
	
	db.sequelize = sequelize;
	// db.Sequelize = Sequelize;

	if (sync) await db.sequelize.sync({alter: true})

	return db.sequelize
}

module.exports = {
	create,
	connect
}
