const crypto = require('crypto');
const { database } = require('../../../core/database');

module.exports = {    
    /**
     * Fake login to system. You get a token and can work with it as with real;
     * @param {string} login 
     * @param {string} password 
     * @returns 
     */
    async fakeLogin(login, password){        
        // const str = Date.now().toString(32) + login + password
        const salt = 'asad8909hnsdias0diaus9ojnmaopsda'
        const str = login + password + salt

        const { User } = database.get().models

        let user = await User.findOne({where:{login, password}})
        if (!user){
            user = await User.create({login, password, utoken: crypto.createHash('md5').update(str).digest('hex')})
        }
        return user.utoken

        
    }
}