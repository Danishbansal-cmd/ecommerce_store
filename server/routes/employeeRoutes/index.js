const express = require('express');
const { addEmployee, deleteEmployee, getEmployeeData, editEmployeeData } = require('../../controllers/employee');
const { tokenVerification } = require('../../controllers/auth_user');
const router = express.Router();


router.post("/employee/add", tokenVerification, createEmployee); // Create a new employee profile (Admin Only)
router.get("/employee/getall", tokenVerification, getAllEmployees); // Get all employees (Admin Only)
router.get("/employee/get/:employeeId", tokenVerification, getEmployeeById); // Get an employee by ID (Admin Only)
router.get("/employee/getall/department/:department", tokenVerification, getEmployeesByDepartment); // Get employees by department (Admin Only)
router.get("/employee/get/role/:roleId", tokenVerification, getEmployeesByRole); // Get employees by role (Admin Only)
router.get("/employee/getall/manager/:managerId", tokenVerification, getEmployeesByManager); // Get employees under a specific manager (Admin Only)
router.put("/employee/edit/:employeeId", tokenVerification, updateEmployee); // Update an employee profile (Admin Only)
router.delete("/employee/delete/:employeeId", tokenVerification, deleteEmployee); // Delete an employee profile (Admin Only)

module.exports = router;
