const mongoose = require('mongoose'); // Erase if already required
const {v4: uuid } = require('uuid');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
    unique: true,
    default: uuid(),
    index: true,
  },
  isAdmin: {  // Better - Create another table with Admins or With Roles.
    type: Boolean,
    required: true,
    default: false,
  },
  username: {
    type:String,
    required:true,
    unique:true,
    index:true,
  },
  firstName: {
    type:String,
    required:false,
    unique:false,
    index:false,
  },
  lastName: {
    type:String,
    required:false,
    unique:false,
    index:false,
  },
  email: {
    type:String,
    required:false,
    unique:true,
  },
  password: {
    type:String,
    required:true,
  },
});

//Export the model
module.exports = mongoose.model('User', userSchema);