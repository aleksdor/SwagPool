const crypto = require('crypto');
module.exports = {    
    /**
     * Fake login to system. You get a token and can work with it as with real;
     * @param {string} login 
     * @param {string} password 
     * @returns 
     */
    fakeLogin(login, password){        
        const str = Date.now().toString(32) + login + password
        return crypto.createHash('md5').update(str).digest('hex');
    }
}