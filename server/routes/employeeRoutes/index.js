const express = require('express');
const { addEmployee, deleteEmployee, getEmployeeData, editEmployeeData } = require('../../controllers/manage_employee');
const { tokenVerification } = require('../../controllers/auth_user');
const router = express.Router();

router.post('/employee/add', tokenVerification, addEmployee);
router.delete('/employee/delete/:employeeId', tokenVerification, deleteEmployee);
router.get('/employee/get/:employeeId', tokenVerification, getEmployeeData);
router.put('/employee/edit/:employeeId', tokenVerification, editEmployeeData);

module.exports = router;