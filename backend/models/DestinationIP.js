const mongoose = require('mongoose');
const { Schema } = mongoose;

const DestinationIPSchema = new Schema({
 ip: { type: String, required: true },
 attacks: [{ type: Schema.Types.ObjectId, ref: 'DDoSAttack' }],
 isMalicious: { type: Boolean, default: false }, // Flag for known malicious IPs
});

module.exports = mongoose.model('DestinationIP', DestinationIPSchema);

