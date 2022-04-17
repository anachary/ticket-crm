const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    "name": {
        type: "String",
        maxlength: 50,
        required: true
    },
    "Status": {
        type: "String",
        maxlength: 50,
        required: true
    },
    "updatedDate": {
        type: Date,
        required: true,
        default: Date.now(),
      },
    
      "updatedBy": {
        type: String,
        required:true,
        default:""
      },
      

})

module.exports = {
    CompanySchema: mongoose.model("Company", CompanySchema)
}