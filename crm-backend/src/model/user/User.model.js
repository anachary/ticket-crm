const { UserSchema } = require("./User.schema")

const insertUser = async (userObj) => {
    try {
        const data = await UserSchema(userObj).save()
        console.log(data)
        return data
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = {
    insertUser
}