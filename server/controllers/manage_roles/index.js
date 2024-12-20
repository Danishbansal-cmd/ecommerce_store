const Roles = require("../../models/Roles");
const User = require("../../models/User");

const addRole = async (req, res) => {
    try{
        const {userId, roleToBeAdded, permissionsToBeAdded, descriptionOfRole} = req.body;
        if(!userId) return res.status(400).json({success:false, message : "user not provided"});

        const findUser = await User.findOne({_id : userId});
        if(!findUser) return res.status(400).json({success:false, message : "user not found"});

        console.log(findUser, 'findUser');

        const findUserRole = await Roles.findOne({_id : findUser['role']});
        if(!findUserRole) return res.status(400).json({success:false, message : "user is not authorized to add the role"});

        let addNewRole;
        if(findUserRole['permissions'].indexOf('addRole') !== -1){
            addNewRole = await new Roles({role : roleToBeAdded, permissions : [permissionsToBeAdded], description : descriptionOfRole}).save();
        }
        if(!addNewRole) {
            return res.status(400).json({success:false, message : "Role not added", data : addNewRole});
        }else{
            return res.status(400).json({success:false, message : "Role added successfully", data : addNewRole});
        }
    }catch (error){
        res.status(400).json({
            success : false,
            message : 'Error occured'
        })
    }
}

const deleteRole = async (req, res) => {
    try{

    }catch (error){
        res.status(400).json({
            success : false,
            message : 'Error occured'
        })
    }
}


const getRole = async (req, res) => {
    try{
        //get the role from the body
        const {role} = req.body;

        if(!role) return res.json({success : false, message : '[Get Role] Role not provided.', data : null});

        const findRole = await Roles.findOne({role});
        if (!findRole)
            return res.json({
                success: false,
                message: "[Get Role] Role does not exist!",
                data: null
        });

        return res.status(200).json({
            success : true,
            message : '[Get Role] Role received successfully',
            data : findRole
        })
    }catch (error){
        res.status(400).json({
            success : false,
            message : '[Get Role] Error occured',
            data : null
        })
    }
}

const getAllRole = async (req, res) => {
    try{
        const roleList = await Roles.find();
        if(!roleList) return res.json({success : false, message : '[Get All Role] No roles, Please Create first'});

        return res.status(200).json({
            success : true,
            message : '[Get All Role] Fetch all roles successfully',
            data : roleList,
        })
    }catch (error){
         res.status(400).json({
            success : false,
            message : '[Get All Role] Error occured',
            data : {}
        })
    }
}

const updateRolePermissions = async (req, res) => {
    try{

    }catch (error){
        res.status(400).json({
            success : false,
            message : 'Error occured'
        })
    }
}


module.exports = {addRole, deleteRole, updateRolePermissions, getRole, getAllRole};

