const mongoose = require('mongoose');
const { Schema } = mongoose;

const SourceIPSchema = new Schema({
 ip: { type: String, required: true },
 attacks: [{ type: Schema.Types.ObjectId, ref: 'DDoSAttack' }],
});

module.exports = mongoose.model('SourceIP', SourceIPSchema);
