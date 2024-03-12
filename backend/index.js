const express = require('express');
const mongoose = require('mongoose');
const ddosAttackRoutes = require('./routes/ddosAttackRoutes');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ddosDetection', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Use the DDoS attack routes
app.use('/api/attacks', ddosAttackRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Backend!');
});

app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
});
