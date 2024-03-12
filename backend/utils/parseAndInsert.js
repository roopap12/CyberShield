const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const DDoSAttack = require('../models/DDoSAttack'); // Adjust the path as necessary

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://PatelR:Roopa1234@cybershieldcluster.eew7cit.mongodb.net/test')
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Could not connect to MongoDB', err));

// Path to the JSON file
const dataPath = path.join(__dirname, '../utils/loopback_data.json');

// Function to validate and clean data
function validateAndCleanData(data) {
    // Example validation rules
    const rules = {
        sourceIP: { required: true, type: 'string' },
        destinationIP: { required: true, type: 'string' },
        trafficVolume: { required: true, type: 'number' },
        detected: { required: true, type: 'boolean' },
    };

    for (const [key, rule] of Object.entries(rules)) {
        if (rule.required && !data.hasOwnProperty(key)) {
            console.error(`Missing required field: ${key}`);
            return false;
        }

        if (data.hasOwnProperty(key)) {
            // Convert trafficVolume to a number if it's a string that represents a number
            if (key === 'trafficVolume') {
                if (data[key] === 'N/A') {
                    // Set a default value for trafficVolume if it's 'N/A'
                    data[key] = 0; // Or any other default value you prefer
                } else if (typeof data[key] === 'string' && !isNaN(data[key])) {
                    data[key] = parseFloat(data[key]);
                }
            }

            if (typeof data[key] !== rule.type) {
                console.error(`Invalid type for field ${key}: expected ${rule.type}, got ${typeof data[key]}`);
                return false;
            }
        }
    }

    // Cleaning: Remove unwanted characters from IP addresses
    if (data.sourceIP) {
        data.sourceIP = data.sourceIP.replace(/\s+/g, ''); // Remove spaces
    }
    if (data.destinationIP) {
        data.destinationIP = data.destinationIP.replace(/\s+/g, ''); // Remove spaces
    }

    return true;
}

// Read the JSON file
fs.readFile(dataPath, 'utf8', (err, data) => {
 if (err) {
    console.error('Error reading file:', err);
    return;
 }

 // Parse the JSON data
 const records = JSON.parse(data);

 // Iterate over each record
 records.forEach(record => {
    // Validate and clean the data
    if (validateAndCleanData(record)) {
        // Create a new DDoSAttack document with only the necessary data
        const attack = new DDoSAttack({
           timestamp: new Date(), // Use the current timestamp
           detected: record.detected,
           sourceIP: record.sourceIP,
           destinationIP: record.destinationIP,
           attackType: 'Unknown', // Placeholder, adjust as necessary
           trafficVolume: record.trafficVolume,
        });

        // Save the document to MongoDB
        attack.save()
         .then(doc => console.log('Inserted document:', doc))
         .catch(err => console.error('Error inserting document:', err));
    } else {
        console.error('Data validation failed for record:', record);
    }
 });
});
