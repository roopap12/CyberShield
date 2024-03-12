const mongoose = require('mongoose');
const { Schema } = mongoose;

const DDoSAttackSchema = new Schema({
 timestamp: { type: Date, required: true },
 detected: { type: Boolean, required: true },
 sourceIP: { type: String, required: true }, // Assuming IPs are treated as strings
 destinationIP: { type: String, required: true }, // Assuming IPs are treated as strings
 attackType: { type: String, required: true }, // Type of DDoS attack
 trafficVolume: { type: Number, required: true }, // Volume of traffic in bytes
}, { collection: 'DDoSAttacks' }); // Specify the collection name here

module.exports = mongoose.model('DDoSAttack', DDoSAttackSchema);
