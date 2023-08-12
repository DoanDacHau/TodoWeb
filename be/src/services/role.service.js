const { Op } = require('sequelize');
// @ts-ignore
const { Role } = require('../models');
class RoleService {
    async fncFindOne(req) {
        const { id } = req.params;

        return Role.findOne({
            where: { role_id: id },
            include: [
                {
                    model: UserMaster,
                },
            ],
        });
    }

    async fncCreateOne(req) {
        const newData = req.body;
        return Role.create(newData);
    }

    async fncFindAll(req) {
        return Role.findAndCountAll();
    }

    async fncUpdateOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) {
            return next(new ErrorResponse(404, 'Role not found'));
        } else {
            return Role.update(
                { ...req.body },
                {
                    where: { ID: id },
                }
            );
        }
    }

    async fncDeleteOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) return next(new ErrorResponse(404, 'Role not found'));

        return Role.update(
            { Status: 2 },
            {
                where: { ID: id },
            }
        );
    }
}

module.exports = new RoleService();
