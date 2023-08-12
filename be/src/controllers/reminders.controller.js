const asyncHandler = require('../utils/async-handler');
const ReminderService = require('../services/reminders.service');
const { errorResponse, successResponse } = require('../utils/response');

module.exports = {
    findReminders: asyncHandler(async (req, res, next) => {
        const  reminder= await ReminderService.fncFindAll();

        return res.json(
            successResponse(200, {
                reminder,
            })
        );
    }),
    findRemindersByUserId: asyncHandler(async (req, res, next) => {
        const  reminder= await ReminderService.fncFindAllByUserId(req,res);

        return res.json(
            successResponse(200, {
                reminder,
            })
        );
    }),

    findReminder: asyncHandler(async (req, res, next) => {
        const reminder = await ReminderService.fncFindOne(req);

        if (reminder) return res.json(successResponse(200, reminder));
        return res.status(404).json(errorResponse(404));
    }),

    createReminder: asyncHandler(async (req, res, next) => {
        const reminder = await ReminderService.fncCreateOne(req);

        if (reminder) return res.status(201).json(successResponse(201, reminder));
        return res.status(500).json(errorResponse());
    }),

    updateReminder: asyncHandler(async (req, res, next) => {
        const reminder = await ReminderService.fncUpdateOne(req, next);

        if (reminder) return res.status(204).json(successResponse(204));
        return res.status(500).json(errorResponse());
    }),

    deleteReminder: asyncHandler(async (req, res, next) => {
        const reminder = await ReminderService.fncDeleteOne(req, next);

        if (reminder) return res.status(204).json(successResponse(204));
        return res.status(500).json(errorResponse());
    }),
};
