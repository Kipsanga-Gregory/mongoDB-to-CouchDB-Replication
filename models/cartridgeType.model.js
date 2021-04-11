const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cartridgeTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    volume: { type: Number, required: true },
    dosingSpeed: { type: Number, required: true },
    servingSize: { type: Number, required: true },
    flowRate: { type: Number, required: true },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'cartridgeIngredients',
        },
        quantity: { type: Number, required: true },
      },
    ],
    wellnessProgram: [
      {
        type: Schema.Types.ObjectId,
        ref: 'welnessProgram',
      },
    ],
    deviceCartridge: {
      type: Schema.Types.ObjectId,
      ref: 'deviceCartridge',
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
cartridgeTypeSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

cartridgeTypeSchema.plugin(mongoosePaginate);

const cartridgeType = model('cartridgeType', cartridgeTypeSchema);

module.exports = cartridgeType;
