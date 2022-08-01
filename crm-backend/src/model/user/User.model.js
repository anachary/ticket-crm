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

const editUser = async (userObj) => {
  try {
      const data = await  UserSchema.findOneAndUpdate(
        { email:userObj.email, company:userObj.company },
        {
          ...userObj,
        },
        { new: false })
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
     const user = await UserSchema.findOne({email})          
     console.log(user);
     return user
    }
    catch(err){
      console.log(err)
      return null
    }
}

const getUserById = async _id =>{
    try {
     if(!_id){
         return false;
     }
     const user = await UserSchema.findOne({_id})
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

 const storeUserNotification= async(email, notification) =>{
    try{
        let user = await getUserByEmail(email)
        if(user){
        let _id = user._id
        let data = await UserSchema.findByIdAndUpdate(
            {_id},
            {
                $push:{notifications:{...notification}},
            },
            {
                new:true
            })
        return data
      }
    }
    catch (err) {
        throw err;
    }
}
  
const getCompanyUsers = async(company) => {
 
  if(!company) {
    return  []
  }

  if(company === "admin"){
    return await UserSchema.find()
  }

  return await UserSchema.find({company})

}

const saveUserNotifications= async(email) =>{
  try{
      let user = await getUserByEmail(email)
      if(user){
      let _id = user._id
      const newArray = []
      user.notifications.forEach(notification=>{
            notification.read = true;
            newArray.push(notification)
      })
      user.notifications = newArray
      UserSchema.findOneAndUpdate(
        {_id},
        {
          ...user,
        },
        { new: false })
      }
  }
  catch (err) {
      throw err;
  }
}

const deleteUser = async(email, company) =>{
  try{
   // await UserSchema.deleteOne({email,company})
   UserSchema.findOneAndDelete(
    { email: email, company: "company" },
 );
  }
  catch (err) {
      throw err;
  }
}

module.exports = {
    insertUser,
    getUserByEmail,
    getUserById,
    storeUserRefreshJWT,
    verifyUser,
    updatePassword,
    storeUserNotification,
    saveUserNotifications,
    getCompanyUsers,
    editUser,
    deleteUser
}