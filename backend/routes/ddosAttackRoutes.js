// backend/routes/ddosAttackRoutes.js

const express = require('express');
const router = express.Router();
const DDoSAttackController = require('../controllers/DDoSAttackController');

router.post('/attack', DDoSAttackController.addAttack);
router.get('/attacks', DDoSAttackController.getAllAttacks);

module.exports = router;
