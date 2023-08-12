const router = require('express').Router();
const CategoriesController = require('../controllers/categories.controller');

router.get('/:id', CategoriesController.findCategory);
router.get('/', CategoriesController.findCategories);
router.get('/my-reminder/:id', CategoriesController.findAllByUserId);
router.post('/', CategoriesController.createCategory);
router.put('/:id', CategoriesController.updateCategory);
router.delete('/:id', CategoriesController.deleteCategory);

module.exports = router;
