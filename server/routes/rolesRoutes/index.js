const express = require('express');
const { checkUser } = require('../../controllers/auth_user');
const { addRole, getRole, deleteRole, updateRolePermissions, getAllRole } = require('../../controllers/manage_roles');
const router = express.Router()


router.post('/role/add',checkUser, addRole)
router.post('/role/get',checkUser, getRole)
router.get('/role/getall',checkUser, getAllRole)
router.delete('/role/delete',checkUser, deleteRole)
router.put('/role/add',checkUser, updateRolePermissions)


module.exports = router
