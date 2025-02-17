const express = require('express');
const { getAllDepartments } = require('../../controllers/departments');
const { tokenVerification } = require('../../controllers/auth_user');
const router = express.Router();


router.get('/department/getall', tokenVerification, getAllDepartments)

module.exports = router;