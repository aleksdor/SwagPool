const conf = require('./conf')

const { create } = require("./database/models")
const {startWeb} = require("./core/express")
const { database } = require('./core/database')
const { startCron, appendTask } = require("./core/cron")
const { sheduleMakeNfts } = require('./core/nft-crone')


async function start(){
    const db = await create('base')
    const web = await startWeb(conf.port, db)

    database.set(db)

    sheduleMakeNfts()
}

start()