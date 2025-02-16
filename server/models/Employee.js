const mongoose = require('mongoose');

const employeeProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roleId : {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Role',
    },
    jobTitle: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    status : { 
        type : String,
        enum : ['active', 'passive', 'on_leave'],
        default : 'active'
    },
    salary: {
      type: Number,
      required: true,
    },
    hireDate: {
      type: Date,
      default: Date.now,
    },
    reportsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeProfile",
      default: null, // Direct supervisor (if any)
    },
    employeeRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeRole", // Reference to EmployeeRole model
      required: true,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile", // Link to general profile
        default: null,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeProfileSchema);


