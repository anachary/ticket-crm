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

const getUserByEmail = async (email, company) =>{
    try {
     if(!email||!company){
         return false;
     }
     const user =  await UserSchema.findOne({email,company});
     console.log(user);
     return user
    }
    catch(err){
      console.log(err)
      throw err
    }
}

const getUserById = async _id =>{
    try {
     if(!_id){
         return false;
     }
     const user = await UserSchema.findOne({_id});
     console.log(user);
     return user
    }
    catch(err){
      console.log(err)
      throw err
    }
}

const storeUserRefreshJWT= async (_id, token) =>{
    try{
        let data = await UserSchema.findByIdAndUpdate(
            {_id},
            {
                $set:{"refreshJWT.token":token,
                "refreshJWT.addedAt":Date.now()},
            },
            {
                new:true
            })
        return data
    }
    catch (err) {
        throw err;
    }
}

const verifyUser = (_id, email) => {
    return new Promise((resolve, reject) => {
      try {
        UserSchema.findOneAndUpdate(
          { _id, email, isVerified: false },
          {
            $set: { isVerified: true },
          },
          { new: true }
        )
          .then((data) => resolve(data))
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      } catch (error) {
        console.log(error.message);
        reject(error);
      }
    });
  };
  
  const updatePassword = (email, newhashedPass) => {
    return new Promise((resolve, reject) => {
      try {
        UserSchema.findOneAndUpdate(
          { email },
          {
            $set: { password: newhashedPass },
          },
          { new: true }
        )
          .then((data) => resolve(data))
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
  
module.exports = {
    insertUser,
    getUserByEmail,
    getUserById,
    storeUserRefreshJWT,
    verifyUser,
    updatePassword
}