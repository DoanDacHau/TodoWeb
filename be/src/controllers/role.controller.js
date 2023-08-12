const asyncHandler = require('../utils/async-handler');
const RoleService = require('../services/role.service');
const { errorResponse, successResponse } = require('../utils/response');

module.exports = {
    findRoles: asyncHandler(async (req, res, next) => {
        const result=await RoleService.fncFindAll(req);
        return res.json(
            successResponse(200, {
                result
            })
        );
    }),
    // findRoles: asyncHandler(async (req, res, next) => {
    //     const { page, size } = req.query;
    //     const { rows: roles, count: total } = await RoleService.fncFindAll(req);

    //     return res.json(
    //         successResponse(200, {
    //             total,
    //             roles,
    //             currentPage: +page || 1,
    //             pageSize: +size || roles.length,
    //         })
    //     );
    // }),

    findRole: asyncHandler(async (req, res, next) => {
        const role = await RoleService.fncFindOne(req);

        if (role) return res.json(successResponse(200, role));
        return res.status(404).json(errorResponse(404));
    }),

    createRole: asyncHandler(async (req, res, next) => {
        const role = await RoleService.fncCreateOne(req);

        if (role) return res.status(201).json(successResponse(201, role));
        return res.status(500).json(errorResponse());
    }),

    updateRole: asyncHandler(async (req, res, next) => {
        const role = await RoleService.fncUpdateOne(req, next);

        if (role) return res.status(204).json(successResponse(204));
        return res.status(500).json(errorResponse());
    }),

    deleteRole: asyncHandler(async (req, res, next) => {
        const role = await RoleService.fncDeleteOne(req, next);

        if (role) return res.status(204).json(successResponse(204));
        return res.status(500).json(errorResponse());
    }),
};
