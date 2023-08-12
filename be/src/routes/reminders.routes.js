const router = require('express').Router();
const ReminderController = require('../controllers/reminders.controller');

router.get('/:id', ReminderController.findReminder);
router.get('/u/:id', ReminderController.findRemindersByUserId);
router.get('/', ReminderController.findReminders);
router.post('/', ReminderController.createReminder);
router.put('/:id', ReminderController.updateReminder);
router.delete('/:id', ReminderController.deleteReminder);

module.exports = router;
