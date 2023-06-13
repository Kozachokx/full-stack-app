const mongoose = require('mongoose'); // Erase if already required
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Declare the Schema of the Mongo model
const noteSchema = new mongoose.Schema(
  {
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'User',
    },
    text:{
      type:String,
      required:false,
    },
    completed:{
      type:Boolean,
      default: false,
      required:true,
    },
  }, {
    timestamps: true
  });

noteSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'noteNums',
  start_seq: 0,
});
  
//Export the model
module.exports = mongoose.model('Note', noteSchema);
