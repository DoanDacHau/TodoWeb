const router = require('express').Router();
const UserController = require('../controllers/users.controller');

router.get('/', UserController.findUser);
router.get('/all', UserController.findAllUser);
router.put('/', UserController.updateStatusUser);

module.exports = router;
