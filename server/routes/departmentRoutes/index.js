const express = require('express');
const { checkUser } = require('../../controllers/auth_user');
const { getAllDepartments } = require('../../controllers/manage_departments');
const router = express.Router();


router.get('/department/getall', checkUser, getAllDepartments)

module.exports = router;