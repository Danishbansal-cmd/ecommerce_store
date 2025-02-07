const express = require('express');
const { addRole, getRole, deleteRole, updateRolePermissions, getAllRole } = require('../../controllers/manage_roles');
const { tokenVerification } = require('../../controllers/auth_user');
const router = express.Router()


router.post('/role/add',tokenVerification, addRole)
router.post('/role/get', getRole)
router.get('/role/getall',tokenVerification, getAllRole)
router.delete('/role/delete',tokenVerification, deleteRole)
router.put('/role/add',tokenVerification, updateRolePermissions)


module.exports = router
