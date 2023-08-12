const router = require('express').Router();
const UserController = require('../controllers/users.controller');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/verification', UserController.verification);

module.exports = router;
