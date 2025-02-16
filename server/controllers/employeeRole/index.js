const EmployeeRole = require("../../models/EmployeeRole");

// ✅ 1. Create a new employee role
exports.createEmployeeRole = async (req, res) => {
  try {
    const { roleName, permissions } = req.body;

    // Check if role already exists
    const existingRole = await EmployeeRole.findOne({ roleName });
    if (existingRole) {
      return res.status(400).json({ success: false, message: "[EmployeeRole] Role already exists.", data: null });
    }

    const newRole = new EmployeeRole({
      roleName,
      permissions: permissions || [],
    });

    await newRole.save();

    res.status(201).json({ success: true, message: "[EmployeeRole] Role created successfully.", data: newRole });

  } catch (error) {
    res.status(500).json({ success: false, message: `[EmployeeRole] ${error.message}`, data: null });
  }
};

// ✅ 2. Get all employee roles
exports.getAllEmployeeRoles = async (req, res) => {
  try {
    const roles = await EmployeeRole.find();

    res.status(200).json({ success: true, message: "[EmployeeRole] Roles fetched successfully.", data: roles });

  } catch (error) {
    res.status(500).json({ success: false, message: `[EmployeeRole] ${error.message}`, data: null });
  }
};

// ✅ 3. Get a specific employee role by ID
exports.getEmployeeRoleById = async (req, res) => {
  try {
    const { roleId } = req.params;
    
    const role = await EmployeeRole.findById(roleId);

    if (!role) {
      return res.status(404).json({ success: false, message: "[EmployeeRole] Role not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[EmployeeRole] Role fetched successfully.", data: role });

  } catch (error) {
    res.status(500).json({ success: false, message: `[EmployeeRole] ${error.message}`, data: null });
  }
};

// ✅ 4. Update an employee role
exports.updateEmployeeRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { roleName, permissions } = req.body;

    const role = await EmployeeRole.findByIdAndUpdate(
      roleId,
      { roleName, permissions },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({ success: false, message: "[EmployeeRole] Role not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[EmployeeRole] Role updated successfully.", data: role });

  } catch (error) {
    res.status(500).json({ success: false, message: `[EmployeeRole] ${error.message}`, data: null });
  }
};

// ✅ 5. Delete an employee role
exports.deleteEmployeeRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const role = await EmployeeRole.findByIdAndDelete(roleId);

    if (!role) {
      return res.status(404).json({ success: false, message: "[EmployeeRole] Role not found.", data: null });
    }

    res.status(200).json({ success: true, message: "[EmployeeRole] Role deleted successfully.", data: null });

  } catch (error) {
    res.status(500).json({ success: false, message: `[EmployeeRole] ${error.message}`, data: null });
  }
};
