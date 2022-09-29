const crypto = require('crypto');
const { database } = require('../../../core/database');

module.exports = {    
    /**
     * Fake login to system. You get a token and can work with it as with real;
     * @param {string} login User login
     * @param {string} password User password
     * @param {string} account User EVM account address which gets NFT
     * @returns {string} utoken - unique user token to operate in system
     */
    async fakeLogin(login, password, account){        
        // const str = Date.now().toString(32) + login + password
        const salt = 'asad8909hnsdias0diaus9ojnmaopsda'
        const str = login + password + salt

        const { User } = database.get().models

        let user = await User.findOne({where:{login, password}})
        if (!user){
            user = await User.create({login, password, account, utoken: crypto.createHash('md5').update(str).digest('hex')})
        }
        return user.utoken

        
    }
}