const mongoose = require("mongoose");

const employeeRoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      type: [String], // List of permissions (e.g., "view_users", "edit_orders")
      default: [],
    },
  },
  { timestamps: true }
);

const EmployeeRole = mongoose.model("EmployeeRole", employeeRoleSchema);

module.exports = EmployeeRole;
