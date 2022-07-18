const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const TicketSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
  },
  subject: {
    type: String,
    maxlength: 100,
    required: true,
    default: "",
  },

  updatedDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  updatedBy: {
    type: String,
    required:true,
    default:""
  },

  priority: {
    type:String,
    required:"true",
    default:"client"
  },

  issueDate:{
    type: Date,
    required: true,
    default: Date.now()
  },

  assignedTo: {
    type:String,
    maxlength: 30,
    default:'',
    required: false,
  },

  assignedDate: {
    type: Date,
    required: false,
    default: Date.now()
  },

  status: {
    type: String,
    maxlength: 30,
    required: true,
    default: "UnAssigned",
  },

  description: {
    type:String,
    maxlength: 1000,
    required: true,
    default: ""
  },

  conversations: [
    {
      sender: {
        type: String,
        maxlength: 50,
        required: true,
        default: "",
      },
      message: {
        type: String,
        maxlength: 1000,
        required: true,
        default: "",
      },
      msgAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  followers:[
    {
    follower: {
      type: String,
      maxlength: 50,
      required: true,
      default: "",
    },
    
    followedAt: {
      type: Date,
      default: Date.now(),
    }
  },
]

});
autoIncrement.initialize(mongoose.connection)
TicketSchema.plugin(autoIncrement.plugin, 'Ticket');
module.exports = {
  TicketSchema: mongoose.model("Ticket", TicketSchema),
};
