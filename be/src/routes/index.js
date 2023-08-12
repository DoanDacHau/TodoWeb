const router = require('express').Router();


router.use('/',require('./signup_login.routes'))
router.use('/user', require('./users.routes'));
router.use('/role', require('./role.routes'));
router.use('/categories', require('./categories.routes'));
router.use('/reminders', require('./reminders.routes'));
router.use('/notifications', require('./notification.rotes'));


module.exports = router;

