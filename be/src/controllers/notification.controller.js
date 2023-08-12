const asyncHandler = require('../utils/async-handler');
const NotificationService = require('../services/notification.service');
const { errorResponse, successResponse } = require('../utils/response');

module.exports = {

    findAllByUserId: asyncHandler(async (req, res, next) => {
        const  notification= await NotificationService.fncFindAllByUserId(req,res);

        return res.json(
            successResponse(200, {
                notification,
            })
        );
    }),
    updateBulkNoti: asyncHandler(async (req, res, next) => {
        const  notification= await NotificationService.fncUpdateBulkNoti(req,res);

        if (notification) return res.status(204).json(successResponse(204));
        return res.status(500).json(errorResponse());
    }),

    createBulkNoti: asyncHandler(async (req,res,next)=>{
        const notification =await NotificationService.fncCreateNotification(req,res);
        if (notification) return res.status(201).json(successResponse(200, notification));
        return res.status(500).json(errorResponse());
    })
    
};
