const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cartridgeSchema = new Schema(
  {
    tempId: String,
    name: String,
    volume: Number,
    dosingSpeed: Number,
    servingSize: Number,
    flowRate: Number,
    ingredients: [
      {
        ingredient: String,
        quantity: String,
      },
    ],
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
cartridgeSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

cartridgeSchema.plugin(mongoosePaginate);

const cartridges = model('cartridges', cartridgeSchema);

module.exports = cartridges;
