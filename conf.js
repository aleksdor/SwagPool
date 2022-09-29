require('dotenv').config()

const db = {
    dialect: process.env.DB_TYPE,
    storage: process.env.DB_FILE,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    use_env_variable: false
};


const nft = {
    timeout: process.env.NFT_TIMEOUT || 30000,
    api_url: process.env.NFT_API_URL
}

if (process.env.DB_SILENT) db.logging = false

module.exports = {
    port: process.env.PORT || 3000,

    db,

    nft_api: process.env.NFT_SERVICE,
}