const { create } = require("./database/models")
const {startWeb} = require("./core/express")
const { database } = require('./core/database')

const conf = require('./conf')

async function start(){
    const db = await create('base')
    const web = await startWeb(conf.port, db)

    database.set(db)
}

start()