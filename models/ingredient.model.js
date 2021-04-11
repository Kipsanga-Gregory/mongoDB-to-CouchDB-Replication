const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ingredientSchema = new Schema(
  {
    name: String,
    unit: String,
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

const ingredients = model('ingredients', ingredientSchema);

module.exports = ingredients;
