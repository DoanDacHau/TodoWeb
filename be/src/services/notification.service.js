const { Op } = require('sequelize');
// @ts-ignore
const { Users, Categories,Reminders,Notification } = require('../models');
const { ErrorResponse,errorResponse, successResponse } = require('../utils/response');
class NotificationService {

    async fncFindAllByUserId(req,res){
        const {id}=req.params;

        return await Notification.findAndCountAll({
            where:{user_id:id},
        })
    }
    async fncUpdateBulkNoti(req,res){
        const {id}=req.body;
        return await Notification.update({status:2},{where:{user_id:id,status:1}})
    }
    
    async fncCreateNotification(req,res){
        const {content}=req.body;
        let allData=[];
        const getAllIdUser=await Users.findAll({where:{role_id:2}})
        getAllIdUser.map((gu)=>{
            let data={
                user_id:gu.user_id,
                content:content,
                status:1
            }
            allData.push(data)
        })
        const result=await Notification.bulkCreate(allData);
        return result;
    }

    
}

module.exports = new NotificationService();
