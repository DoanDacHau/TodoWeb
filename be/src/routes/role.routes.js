const router = require('express').Router();
const RoleController = require('../controllers/role.controller');
// const { validatePOST, validatePUT } = require('../validations/role');

router.get('/', RoleController.findRoles);
// router.post('/', validatePOST, RoleController.createRole);
router.get('/:id', RoleController.findRole);
// router.put('/:id', validatePUT, RoleController.updateRole);
// router.delete('/:id', RoleController.deleteRole);

module.exports = router;
