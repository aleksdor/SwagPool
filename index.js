const { connect } = require("./database/models")
const {startWeb} = require("./core/express")

const conf = require('./conf')

async function start(){
    const db = await connect('base')
    const web = await startWeb(conf.port, db)
}

start()