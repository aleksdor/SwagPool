const crypto = require('crypto');
const { database } = require('../../../core/database');

module.exports = {    
    /**
     * Fake login to system. You get a token and can work with it as with real;
     * @param {string} login 
     * @param {string} password 
     * @param {string} address
     * @returns 
     */
    async fakeLogin(login, password, address){
        // const str = Date.now().toString(32) + login + password
        const salt = 'asad8909hnsdias0diaus9ojnmaopsda'
        const str = login + password + salt

        const { User } = database.get().models

        let user = await User.findOne({where:{login, password}})
        if (!user){
            const utoken = crypto.createHash('md5').update(str).digest('hex')
            user = await User.create({login, password, utoken, address})
        }
        return user.utoken

        
    }
}