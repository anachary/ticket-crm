const redis = require("redis")
const client = redis.createClient()
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
        await client.get(key)    
    } 
    catch (error) {
       throw error; 
    }
}

module.exports ={
    setJWT,
    getJWT
}