const express = require('express');
const mongoose = require('mongoose');
const DDoSAttack = require('./models/DDoSAttack');
const SourceIP = require('./models/SourceIP');
const DestinationIP = require('./models/DestinationIP');
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ddosDetection', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
 res.send('Hello from Backend!');
});

// Route to Add a DDoS Attack: This route will accept POST requests with the attack data and save it to the database.
app.post('/attack', async (req, res) => {
  try {
    const { timestamp, detected, sourceIP, destinationIP } = req.body;
    const newAttack = new DDoSAttack({ timestamp, detected, sourceIP, destinationIP });
    await newAttack.save();
    res.status(201).send(newAttack);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route to Retrieve All DDoS Attacks: This route will accept GET requests and return all DDoS attack data from the database.
app.get('/attacks', async (req, res) => {
  try {
    const attacks = await DDoSAttack.find({});
    res.send(attacks);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, () => {
 console.log(`Backend app listening at http://localhost:${port}`);
});
