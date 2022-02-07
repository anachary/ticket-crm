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

const getUserByEmail = async email =>{
    try {
     if(!email){
         return false;
     }
     const user = await UserSchema.findOne({email});
     console.log(user);
     return user
    }
    catch(err){
      console.log(err)
      throw err
    }
}

module.exports = {
    insertUser,
    getUserByEmail
}