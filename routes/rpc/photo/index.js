const { database } = require("../../../core/database")


module.exports = {
    /**
     * Create shut for user.
     * @param {*} stream 
     * @param {*} utoken 
     * @param {*} photo Base64 encoded photo
     */
    async makeShut(stream, utoken, photo){
        const { Photo }  = database.get().models

        await Photo.create({stream, utoken, photo})
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
    }
}