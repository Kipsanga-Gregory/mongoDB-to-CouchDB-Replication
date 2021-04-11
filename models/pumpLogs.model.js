const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const pumpSchema = new Schema(
  {
    device: {
      type: Schema.Types.String,
      ref: 'devices',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    pump: { type: String },
    duration: { type: Number },
    deviceCartridgeId: {
      type: Schema.Types.ObjectId,
      ref: 'deviceCartridge',
    },
    cartridgeTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'cartridgeType',
    },
    time: { type: Date },
    volumeDispensed: { type: Number },
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
pumpSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

pumpSchema.plugin(mongoosePaginate);

const pumpLogs = model('pumpLogs', pumpSchema);

module.exports = pumpLogs;
