// @ts-ignore
const { Users, Categories, Reminders,Notification } = require('../models');
const schedule = require('node-schedule');
const sendMail = require('../utils/send-mail')
const moment = require('moment');
const cronParser = require('cron-parser');

const { ErrorResponse, errorResponse, successResponse } = require('../utils/response');
let scheduledJob;
class ReminderService {

    async fncFindOne(req) {
        const { id } = req.params;

        return Reminders.findOne({
            where: { reminder_id: id },
            include: [
                {
                    model: Categories,
                },
            ],
        });
    }
    async fncFindAll() {
        return Reminders.findAndCountAll();
    }
    async fncFindAllByUserId(req, res) {
        const { id } = req.params;
        return Reminders.findAndCountAll({
            where: { user_id: id }
        });
    }

    async fncCreateOne(req) {
        const createOne = await Reminders.create({ ...req.body });

        const getReminder = await Reminders.findOne({
            where: { reminder_id: createOne.reminder_id },
            include: {
                model: Categories,
                include: {
                    model: Users
                }
            }
        });
        const getEmailUser = getReminder.Category.User.email;
        const reminderTime = moment(new Date(getReminder.due_date)).format('DD-MM-YYYY HH:mm');
        const [day, month, year, hour, minute] = reminderTime.split(/[- :]/);
        const cronExpression = `${minute} ${hour} ${day} ${month} *`;
        const contentNoti=`Task ${getReminder.title} completed`;

        const subject = "Test";
        const content = "Test";
        scheduledJob = await schedule.scheduleJob(cronExpression, async () => {
            await sendMail(getEmailUser, subject, content);
            await Reminders.update(
                { status: "Completed" },
                {
                    where: { reminder_id: getReminder.reminder_id }
                });
            await Notification.create({user_id:getReminder.Category.User.user_id,content:contentNoti,status:2})
        });
        
        return createOne;

    }




    async fncUpdateOne(req, next) {
        const { id } = req.params;
        const { user_id } = req.body;
        const found = await this.fncFindOne(req);

        if (!found) {
            return next(new ErrorResponse(404, 'Reminder not found'));
        } else {
            if (scheduledJob) {
                scheduledJob.cancel();
            }
            const update = await Reminders.update(
                { ...req.body },
                {
                    where: { user_id: user_id, reminder_id: id, status: "Pending" },
                }
            );
            const getReminder = await Reminders.findOne({
                where: { reminder_id: id },
                include: {
                    model: Categories,
                    include: {
                        model: Users
                    }
                }
            });
            const getEmailUser = getReminder.Category.User.email;
            const reminderTime = moment(new Date(getReminder.due_date)).format('DD-MM-YYYY HH:mm');
            const [day, month, year, hour, minute] = reminderTime.split(/[- :]/);
            const cronExpression = `${minute} ${hour} ${day} ${month} *`;
            const contentNoti=`Task ${getReminder.title} completed`;

            const subject = "Test";
            const content = "Test";
            scheduledJob = await schedule.scheduleJob(cronExpression, async () => {
                await sendMail(getEmailUser, subject, content);
                await Reminders.update(
                    { status: "Completed" },
                    {
                        where: { reminder_id: getReminder.reminder_id }
                    }
                );
                await Notification.create({user_id:getReminder.Category.User.user_id,content:contentNoti,status:2})
            });

            return update;


        }
    }

    async fncDeleteOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) return next(new ErrorResponse(404, 'Reminder not found'));

        return Reminders.destroy(
            {
                where: { reminder_id: id },
            }
        );
    }

}

module.exports = new ReminderService();
