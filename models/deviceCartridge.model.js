const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const deviceCartridgeSchema = new Schema(
  {
    deviceMacAddress: { type: String, required: true },
    cartridgeType: {
      type: Schema.Types.ObjectId,
      ref: 'cartridgeType',
      required: true,
    },
    slotInstalled: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    isReplaced: { type: Boolean, default: false },
    totalPumped: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
deviceCartridgeSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

deviceCartridgeSchema.plugin(mongoosePaginate);

const deviceCartridge = model('deviceCartridge', deviceCartridgeSchema);

module.exports = deviceCartridge;
