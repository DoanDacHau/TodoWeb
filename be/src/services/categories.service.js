const { Op } = require('sequelize');
// @ts-ignore
const { Users, Categories, Reminders } = require('../models');
const { ErrorResponse, errorResponse, successResponse } = require('../utils/response');
const sendMail = require('../utils/send-mail');
class CategoriesService {
    async fncFindOne(req) {
        const { id } = req.params;

        return Categories.findOne({
            where: { category_id: id },
            include: [
                {
                    model: Reminders,
                },
            ],
        });
    }
    async fncFindAll() {
        return Categories.findAndCountAll();
    }

    async fncFindAllByUserId(req, res) {
        const { id } = req.params;
        return Categories.findAndCountAll({
            where: { user_id: id },
            include: [{
                model: Users
            }, {
                model: Reminders
            }]
        })
    }
    async fncScheduleReminder() {
        const getAllReminderInCategories = await Categories.findAll({
            include: [
                {
                    model: Users,
                },
                {
                    model: Reminders,
                    where: { status: "Pending" },
                },
            ],
        });

        getAllReminderInCategories.forEach(async (category) => {
            const getEmailUser = category.User.email;
            const reminders = category.Reminders;
            reminders.forEach(async (reminder) => {
                let getIdReminder = reminder.reminder_id;
                console.log(reminder.due_date);
                // const reminderTime = new Date(reminder.due_date);
                // const subject = "Test";
                // const content = "Test";
                // schedule.scheduleJob(reminderTime, () => {
                //     sendMail(getEmailUser, subject, content);
                // });
                // const updateReminder = await Reminders.update({ data: { status: "Completed" } }, { where: { reminder_id: getIdReminder } })
            });
        });

    }

    async fncCreateOne(req) {
        return await Categories.create({ ...req.body });
    }



    async fncUpdateOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) {
            return next(new ErrorResponse(404, 'Categories not found'));
        } else {
            return Categories.update(
                { ...req.body },
                {
                    where: { category_id: id },
                }
            );
        }
    }

    async fncDeleteOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) return next(new ErrorResponse(404, 'Categories not found'));

        const deleteAllReminderInCategories = await Reminders.destroy({
            where: { category_id: id }
        })

        return Categories.destroy(
            {
                where: { category_id: id },
            }
        );
    }
}

module.exports = new CategoriesService();
