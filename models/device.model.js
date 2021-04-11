const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const deviceSchema = new Schema(
  {
    _id: String,
    deviceName: String,
    companyName: String,
    deviceDefaultLanguage: String,
    responsiblePerson: String,
    phoneNumber: String,
    email: String,
    wifi: {
      ssid: String,
      psk: String,
    },
    cartridges: {
      dPumpZero: { type: Schema.Types.ObjectId, default: null },
      dPumpOne: { type: Schema.Types.ObjectId, default: null },
      dPumpTwo: { type: Schema.Types.ObjectId, default: null },
      dPumpThree: { type: Schema.Types.ObjectId, default: null },
      dPumpFour: { type: Schema.Types.ObjectId, default: null },
      dPumpFive: { type: Schema.Types.ObjectId, default: null },
      dPumpSix: { type: Schema.Types.ObjectId, default: null },
      dPumpSeven: { type: Schema.Types.ObjectId, default: null },
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
deviceSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

deviceSchema.plugin(mongoosePaginate);

const devices = model('devices', deviceSchema);

module.exports = devices;
