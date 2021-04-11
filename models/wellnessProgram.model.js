const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const welnessProgramSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    schedule: [
      {
        title: String,
        cartridgeTypes: [
          {
            // cartridge type id
            id: {
              type: Schema.Types.ObjectId,
              ref: 'cartridgeType',
            },
            dose: { type: Number, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
welnessProgramSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

welnessProgramSchema.plugin(mongoosePaginate);

const welnessPrograms = model('welnessProgram', welnessProgramSchema);

module.exports = welnessPrograms;
