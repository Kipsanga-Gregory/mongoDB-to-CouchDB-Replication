const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    wellnessProgram: {
      type: Schema.Types.ObjectId,
      ref: 'welnessProgram',
      required: true,
    },
    activeWellnessDay: {
      type: Schema.Types.ObjectId,
    },
    lastDosage: {
      type: Date,
      default: Date.now,
    },
    loggedInDevices: [String],
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
userSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

userSchema.plugin(mongoosePaginate);

const users = model('users', userSchema);

module.exports = users;
