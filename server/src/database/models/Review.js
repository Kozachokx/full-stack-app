const mongoose = require('mongoose'); // Erase if already required
const AutoIncrement = require('mongoose-sequence')(mongoose);

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    author: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imageUrl: {
      type:String,
      require: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  }, {
    timestamps: true
  });

reviewSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'reviewNums',
  start_seq: 0,
});
  
module.exports = mongoose.model('Review', reviewSchema);
