const  { Schema, model } = require('mongoose');
const  mongoosePaginate = require('mongoose-paginate-v2');

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, required: true },
    cartridge: [
      {
        type: Schema.Types.ObjectId,
        ref: 'cartridgeType',
      },
    ],
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
ingredientSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

ingredientSchema.plugin(mongoosePaginate);

const cartridgeIngredients = model('cartridgeIngredients', ingredientSchema);

module.exports = cartridgeIngredients;
