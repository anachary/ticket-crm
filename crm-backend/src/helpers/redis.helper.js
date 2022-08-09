const redis = require("redis")
require('dotenv').config()

const REDIS_HOST = process.env.REDIS_HOST || '107.23.73.19'

const REDIS_PORT = process.env.REDIS_PORT || 6379
const client = redis.createClient({
    url:  process.env.REDIS_URL
    })

client.on('connect', function () {
    console.log("Redis Connected")
});

client.on('error', function (err) {
    console.log(err)
});

//redis://localhost:6397
const setJWT = async (key,value) =>{
    try {
        if(!client.isOpen){
            await client.connect()
        }
       await client.set(key,value)    
    } catch (error) {
       throw error; 
    }
    
}

const getJWT = async (key)=>{
    try {
        if(!client.isOpen){
            await client.connect()
        }
        return await client.get(key)    
    } 
    catch (error) {
       throw error; 
    }
}

const deleteJWT = async (key) => {
    try {
        if(!client.isOpen){
            await client.connect()
        }
      client.del(key);
    } catch (error) {
      console.log(error);
    }
  };

module.exports ={
    setJWT,
    getJWT,
    deleteJWT
}
