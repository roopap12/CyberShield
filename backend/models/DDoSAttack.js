const mongoose = require('mongoose');
const { Schema } = mongoose;

const DDoSAttackSchema = new Schema({
 timestamp: { type: Date, required: true },
 detected: { type: Boolean, required: true },
 sourceIP: { type: Schema.Types.ObjectId, ref: 'SourceIP', required: true },
 destinationIP: { type: Schema.Types.ObjectId, ref: 'DestinationIP', required: true },
});

module.exports = mongoose.model('DDoSAttack', DDoSAttackSchema);
