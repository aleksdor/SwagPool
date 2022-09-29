const { default: axios } = require("axios")
const conf = require("../../../conf")
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

    async makeNFT(photo_id){
        const { Photo, User }  = database.get().models
        const photo = await Photo.findByPk(photo_id)
        if (!photo) throw `Photo ${photo_id} not found`

        const user = await User.findByPk(photo.author)
        if (!photo) throw `Author of foto ${photo_id} not found`

        return axios.post(conf.nft_api, {image: photo.photo, address:user.address})        
    }
}