const Department = require("../../models/Department");



const getAllDepartments = async(req, res) => {
    try{
        const departmentsList = await Department.find();
        if(!departmentsList) return res.json({success : false, message : '[Get All Department] No Departments, Please Create first'});

        res.status(200).json({
            success : true,
            message : '[Get All Department] Fetch all roles successfully',
            data : departmentsList,
        })
    }catch(error){
        res.status(400).json({
            success : false,
            message : '[Get All Departments] Error occured',
            data : {}
        })
    }
}

module.exports = {getAllDepartments}