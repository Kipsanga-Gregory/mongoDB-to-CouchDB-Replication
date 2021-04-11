const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const adminSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
adminSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

adminSchema.plugin(mongoosePaginate);

const admins = model('admins', adminSchema);

module.exports = admins;
