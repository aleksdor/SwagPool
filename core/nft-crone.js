const axios = require("axios")
const conf = require("../conf")
const { database } = require("./database")

/**
 * Make NFT tokens in all collection to winners and drop all images in channel.
 */
async function makeNFTs() {
    try {
        // const nftToDo =
        // {
        //     "id": "123",
        //     "addressTo": "0x66968e3A1dc30D328e3c6f39e9979b3A207245db",
        //     "images": [
        //         {
        //             "name": "nft-1",
        //             "description": "description",
        //             "external_url": "",
        //             "base": "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"
        //         }
        //     ]
        // }

        const db = database.get();
        const { Photo } = db.models
        console.log(await Photo.count())

        // const res = await axios.post(conf.nft.api_url, nftToDo)
        console.log(res)
    }
    catch (ex) {
        console.log(ex.message)
    }

    console.log('res')

    // sheduleMakeNfts()
}

/**
 * Shedule making NFTs for winners.
 */
function sheduleMakeNfts() {
    makeNFTs()
    // setTimeout(() => makeNFTs(), conf.nft.timeout)
}

module.exports = {
    makeNFTs,
    sheduleMakeNfts
}