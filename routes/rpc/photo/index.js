const { database } = require("../../../core/database")


module.exports = {
    /**
     * Create shut for user.
     * @param {*} stream 
     * @param {*} author utoken of hunter
     * @param {*} photo Base64 encoded photo
     */
    async makeShut(stream, author, photo){
        const { Photo }  = database.get().models

        await Photo.create({stream, author, photo})
        return true
    },

    /**
     * Get photos of stream.
     * @param {*} stream 
     * @returns 
     */
    async getPhotos(stream){
        const { Photo }  = database.get().models
        return Photo.findAll(stream ? {where: {stream}} : {})
    },

    async makeNFT(photo_id, owner){
        // Here will be call to NFT creation token.
    }
}