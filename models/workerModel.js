const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  ID: { type: String, unique: true },
  Vorname: String,
  Nachname: String,
  Email: { type: String, unique: true, required: true, validate: { validator: isEmailValid, message: 'Invalid email format' } },
  GebrachtVonLvl1: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
  Supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },
  Lvl2: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }, // this is a calculated field
  Lvl3: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }, // this is also a calculated field
  SuperProvBerechtigt: Boolean,
  Strasse: String,
  Ort: String,
  IBAN: String,
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;

function isEmailValid(email) {

  return /\S+@\S+\.\S+/.test(email);
}
