const Employee = require('../../models/Employee');
const Employee = require("../../models/Employee");
const User = require("../../models/User");
const Role = require("../../models/Role");

// ✅ 1. Create a new employee profile
exports.createEmployee = async (req, res) => {
  try {
    const { user, roleId, jobTitle, department, salary, reportsTo, employeeRole, profile } = req.body;

    const newEmployee = new Employee({
      user,
      roleId,
      jobTitle,
      department,
      salary,
      reportsTo: reportsTo || null,
      employeeRole,
      profile: profile || null,
    });

    await newEmployee.save();

    res.status(201).json({ success: true, message: "[Employee] Employee profile created successfully.", data: newEmployee });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Employee] ${error.message}`, data: null });
  }
};

// ✅ 2. Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("user", "name email")
      .populate("roleId", "name")
      .populate("employeeRole", "roleName")
      .populate("reportsTo", "jobTitle");

    res.status(200).json({ success: true, message: "[Employee] Employees fetched successfully.", data: employees });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Employee] ${error.message}`, data: null });
  }
};

// ✅ 3. Get an employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const employee = await Employee.findById(employeeId)
      .populate("user", "name email")
      .populate("roleId", "name")
      .populate("employeeRole", "roleName")
      .populate("reportsTo", "jobTitle");

    if (!employee) {
      return res.status(404).json({ success: false, message: "[Employee] Employee not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[Employee] Employee fetched successfully.", data: employee });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Employee] ${error.message}`, data: null });
  }
};

// ✅ 4. Get employees by department
exports.getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    const employees = await Employee.find({ department })
      .populate("user", "name email")
      .populate("employeeRole", "roleName");

    res.status(200).json({ success: true, message: "[Employee] Employees fetched successfully by department.", data: employees });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Employee] ${error.message}`, data: null });
  }
};

// ✅ 5. Get employees by role
exports.getEmployeesByRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const employees = await Employee.find({ roleId })
      .populate("user", "name email")
      .populate("employeeRole", "roleName");

    res.status(200).json({ success: true, message: "[Employee] Employees fetched successfully by role.", data: employees });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Employee] ${error.message}`, data: null });
  }
};

// ✅ 6. Get employees under a manager
exports.getEmployeesByManager = async (req, res) => {
  try {
    const { managerId } = req.params;

    const employees = await Employee.find({ reportsTo: managerId })
      .populate("user", "name email")
      .populate("employeeRole", "roleName");

    res.status(200).json({ success: true, message: "[Employee] Employees fetched successfully under manager.", data: employees });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Employee] ${error.message}`, data: null });
  }
};

// ✅ 7. Update an employee profile
exports.updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const updateData = req.body;

    const employee = await Employee.findByIdAndUpdate(employeeId, updateData, { new: true });

    if (!employee) {
      return res.status(404).json({ success: false, message: "[Employee] Employee not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[Employee] Employee updated successfully.", data: employee });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Employee] ${error.message}`, data: null });
  }
};

// ✅ 8. Delete an employee profile
exports.deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findByIdAndDelete(employeeId);

    if (!employee) {
      return res.status(404).json({ success: false, message: "[Employee] Employee not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[Employee] Employee deleted successfully.", data: null });

  } catch (error) {
    res.status(500).json({ success: false, message: `[Employee] ${error.message}`, data: null });
  }
};
