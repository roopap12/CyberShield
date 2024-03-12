// backend/controllers/DDoSAttackController.js

const DDoSAttack = require('../models/DDoSAttack');
const Source = require('../models/Source');
const DestinationIP = require('../models/DestinationIP');

exports.addAttack = async (req, res) => {
    try {
        const { timestamp, detected, sourceIP, destinationIP } = req.body;

        // Find or create the Source IP
        let source = await Source.findOne({ ip: sourceIP });
        if (!source) {
            source = new Source({ ip: sourceIP });
            await source.save();
        }

        // Find or create the Destination IP
        let destination = await DestinationIP.findOne({ ip: destinationIP });
        if (!destination) {
            destination = new DestinationIP({ ip: destinationIP });
            await destination.save();
        }

        // Create the DDoS attack
        const newAttack = new DDoSAttack({ timestamp, detected, sourceIP: source._id, destinationIP: destination._id });
        await newAttack.save();

        res.status(201).send(newAttack);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAllAttacks = async (req, res) => {
    try {
        const attacks = await DDoSAttack.find({}).populate('sourceIP').populate('destinationIP');
        res.send(attacks);
    } catch (error) {
        res.status(500).send(error);
    }
};
