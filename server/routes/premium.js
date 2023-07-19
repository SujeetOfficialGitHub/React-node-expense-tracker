const express = require('express')
const router = express.Router();

const premiumController = require('../controller/premiumController');
const {authenticateToken} = require('../middleware/authMiddleware')

router.use(authenticateToken);
router.get('/leaderboard', premiumController.leaderboard)




module.exports = router