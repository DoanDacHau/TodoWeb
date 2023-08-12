const asyncHandler = require('../utils/async-handler');
const UserService = require('../services/user.service');
const { errorResponse, successResponse } = require('../utils/response');

module.exports = {

    findUser: asyncHandler(async (req, res, next) => {
        const user = await UserService.fncGetUser(req);

        if (user) return res.json(successResponse(200, user));
        return res.status(404).json(errorResponse(404));
    }),
    findAllUser: asyncHandler(async (req,res,next)=>{
        const user=await UserService.fncGetAllUser();
        
        if (user) return res.json(successResponse(200, user));
        return res.status(404).json(errorResponse(404));
    }),
    
    updateStatusUser: asyncHandler(async (req,res,next)=>{
        const user =await UserService.fncUpdateStatusUser(req,res);
        if (user) return res.status(204).json(successResponse(204));
        return res.status(500).json(errorResponse());
    }),
    
    registerUser:asyncHandler(async (req,res,next) =>{
        console.log(req.body)
        const user=await UserService.fncRegister(req,res);
        if(user) return res.status(200).json(user);
        return res.status(500).json(errorResponse());
    }),
    
    loginUser:asyncHandler(async (req,res,next)=>{
        const user=await UserService.fncLogin(req,res);
        if(user) return res.status(200).json(successResponse(200,user));
        return res.status(404).json(errorResponse(404));
    }),

    verification:asyncHandler(async (req,res,next)=>{
        const verify=await UserService.fncVerification(req,res);
        if(verify) return res.status(204).json(verify);
        return res.status(500).json(errorResponse());
    })
    
};
