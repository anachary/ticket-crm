const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment');

const CompanySchema = new Schema({
    "_id": {
        type: Schema.Types.ObjectId,
      },
    "name": {
        type: "String",
        maxlength: 50,
        required: true
    },
    "status": {
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
autoIncrement.initialize(mongoose.connection)
CompanySchema.plugin(autoIncrement.plugin, 'Company');

module.exports = {
    CompanySchema: mongoose.model("Company", CompanySchema)
}