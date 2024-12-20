const Employee = require('../../models/Employee');

const addEmployee = async (req, res) => {
    const toBeAdded = req.body;

    const isValid = Object.keys(toBeAdded).map(item => typeof(toBeAdded[item]) === 'string' ? toBeAdded[item].trim() !== '' : toBeAdded[item] !== '').every(item => item);
    if(!isValid) return res.status(401).json({message : '[Add Employee] Data not provided'});
    
    try {
        const newEmp = new Employee({firstname, lastname , phonenumber});
        const saveEmp = await newEmp.save();
        res.status(201).json({message : "[Add Employee] Added successfuly", data : saveEmp})
    }catch (error){
        console.log(error)
        res.status(401).json({message : "Some error", error: error})
    }
};

const deleteEmployee = async (req, res) => {
    const { employeeId } = req.params;

    console.log(employeeId,"[Delete Employee] employeeId")

    if(!employeeId) return res.status(401).json({message : '[Delete Employee] Data not provided'});
    
    try {
        const findEmployee = await Employee.findOneAndDelete({_id : employeeId});
        if(!findEmployee){
            return res.status(401).json({
                message : "Empolyee does not exists"
            })
        }
        
        res.status(201).json({message : "[Delete Employee] Deleted Duccessfuly", data : findEmployee})
    }catch (error){
        console.log(error)
        res.status(401).json({message : "Some Error", error: error})
    }
};


const getEmployeeData = async (req, res) => {
    const { employeeId } = req.params;

    console.log(employeeId,"[Get Employee] employeeId")

    if(!employeeId) return res.status(401).json({message : '[Get Employee] Data not provided'});
    
    try {
        const findEmployee = await Employee.findOne({_id : employeeId});
        console.log(findEmployee,'findEmployee get');
        if(!findEmployee){
            return res.status(401).json({
                message : "[Get Employee] Empolyee does not exists"
            })
        }
        res.status(201).json({message : "[Get Employee] Retreived data successfully", data : findEmployee})
    }catch (error){
        console.log(error)
        res.status(401).json({message : "Some Error", error: error})
    }
};

const getAllEmployeeData = async (req, res) => {
    const { employeeId } = req.params;

    console.log(employeeId,"[Get Employee] employeeId")

    if(!employeeId) return res.status(401).json({message : '[Get Employee] Data not provided'});
    
    try {
        const findEmployee = await Employee.findOne({_id : employeeId});
        console.log(findEmployee,'findEmployee get');
        if(!findEmployee){
            return res.status(401).json({
                message : "[Get Employee] Empolyee does not exists"
            })
        }
        res.status(201).json({message : "[Get Employee] Retreived data successfully", data : findEmployee})
    }catch (error){
        console.log(error)
        res.status(401).json({message : "Some Error", error: error})
    }
};


const editEmployeeData = async (req, res) => {
    const { employeeId } = req.params;
    const toBeEdited = req.body;

    const isValid = Object.keys(toBeEdited).map(item => typeof(toBeEdited[item]) === 'string' ? toBeEdited[item].trim() !== '' : toBeEdited[item] !== '').every(item => item);
    if(!isValid) return res.status(401).json({message : '[Edit Employee] Data not provided'});
   
    try {
        const findEmployee = await Employee.findOneAndUpdate({_id : employeeId}, toBeEdited, {new : true, runValidators: true});
        if(!findEmployee){
            return res.status(401).json({
                message : "[Edit Employee] Empolyee does not exists"
            })
        }
        res.status(201).json({message : "[Edit Employee] Edited data successfully", data : findEmployee})
    }catch (error){
        console.log(error)
        res.status(401).json({message : "Some Error", error: error})
    }
};

module.exports = {addEmployee, deleteEmployee, getEmployeeData, editEmployeeData, getAllEmployeeData};




