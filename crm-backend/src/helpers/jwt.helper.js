const jwt = require('jsonwebtoken')
const { setJWT } = require('./redis.helper')

const createJWT = async (email, _id) => {
    try {
        const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRETE, { expiresIn: '15m' })
        await setJWT(accessToken, _id)
        return Promise.resolve(accessToken)
    }
    catch (err) {
        throw err;
    }
}

const refreshJWT = (payload) => {
    const refreshToken = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRETE, { expiresIn: '30d' })
    return Promise.resolve(refreshToken)
}

module.exports = {
    createJWT,
    refreshJWT,
}