const asyncHandler = require('../utils/async-handler');
const CategoriesService = require('../services/categories.service');
const { errorResponse, successResponse } = require('../utils/response');

module.exports = {


    findCategories: asyncHandler(async (req, res, next) => {
        const  categories= await CategoriesService.fncFindAll();

        return res.json(
            successResponse(200, {
                categories,
            })
        );
    }),
    findAllByUserId: asyncHandler(async (req, res, next) => {
        const  categories= await CategoriesService.fncFindAllByUserId(req,res);

        return res.json(
            successResponse(200, {
                categories,
            })
        );
    }),

    findCategory: asyncHandler(async (req, res, next) => {
        const categories = await CategoriesService.fncFindOne(req);

        if (categories) return res.json(successResponse(200, categories));
        return res.status(404).json(errorResponse(404));
    }),

    createCategory: asyncHandler(async (req, res, next) => {
        const categories = await CategoriesService.fncCreateOne(req);

        if (categories) return res.status(201).json(successResponse(201, categories));
        return res.status(500).json(errorResponse());
    }),

    updateCategory: asyncHandler(async (req, res, next) => {
        const categories = await CategoriesService.fncUpdateOne(req, next);

        if (categories) return res.status(204).json(successResponse(204));
        return res.status(500).json(errorResponse());
    }),

    deleteCategory: asyncHandler(async (req, res, next) => {
        const categories = await CategoriesService.fncDeleteOne(req, next);

        if (categories) return res.status(204).json(successResponse(204));
        return res.status(500).json(errorResponse());
    }),
};
