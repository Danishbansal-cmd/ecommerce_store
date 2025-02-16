const express = require("express");
const { createEmployeeRole, getAllEmployeeRoles, getEmployeeRoleById, updateEmployeeRole, deleteEmployeeRole } = require("../../controllers/employeeRole");
const { tokenVerification } = require("../../controllers/auth_user");
const router = express.Router();

router.post("/employeeRole/add", tokenVerification, createEmployeeRole); // Create a new employee role (Admin Only)
router.get("/employeeRole/getall", tokenVerification, getAllEmployeeRoles); // Get all employee roles (Admin Only)
router.get("/employeeRole/get/:roleId", tokenVerification, getEmployeeRoleById); // Get a specific employee role by ID (Admin Only)
router.put("/employeeRole/edit/:roleId", tokenVerification, updateEmployeeRole); // Update an employee role (Admin Only)
router.delete("/employeeRole/delete/:roleId", tokenVerification, deleteEmployeeRole); // Delete an employee role (Admin Only)

module.exports = router;
