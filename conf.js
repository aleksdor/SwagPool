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
    port: process.env.PORT || 4000,

    db,

    nft,

    // db_path: "sqlite::memory:"
    // db_path: process.env.DB || "sqlite:../data/base.sqlite"
}