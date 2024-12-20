require('dotenv').config();
const {createTransporterForEmail} = require('../../emailVerification/email') 
const {emailTemplate} = require('../../emailVerification/emailTemplate');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const Employee = require('../../models/Employee');
const Roles = require('../../models/Roles');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: '[Register User] Data not provided', data: {} });
        }

        //check for existing user
        const checkUser = await User.findOne({ $or: [{ username }, { email }] });
        if (checkUser)
            return res.json({
                success: false,
                message: "[Register User] User already exists with the same email or username! Please try again",
                data: null
            });

        //hash password
        const hashPassword = await bcrypt.hash(password, 12);

        //create new user
        const newUser = await new User({ username, email, password: hashPassword , role : 'frontend_user'}).save();

        //respond with success
        return res.status(201).json({ success: true, message: "[Register User] User added successfully", data: newUser });

    } catch (error) {
        res.status(401).json({ success: false, message: "[Register User] Some error occured", data: null })
    }
}

const createUserByAdmin = async (req, res) => {
    try {
        const { username, email, password, roleId } = req.body;
        if (!username || !email || !password || !roleId) {
            return res.json({ success: false, message: '[Create User] Data not provided', data: null });
        }

        //check for existing user
        const checkUser = await User.findOne({ $or: [{ username }, { email }] });
        if (checkUser)
            return res.json({
                success: false,
                message: "[Create User] User already exists with the same email or username! Please try again",
                data: null
            });

        //get the specific role
        const getRole = await Roles.findOne({ _id : roleId });
        if (!getRole)
            return res.json({
                success: false,
                message: "[Create User] Role does not exists! Please try again",
                data: null
        });

        //hash password
        const hashPassword = await bcrypt.hash(password, 12);

        //create new user
        const newUser = await new User({ username, email, password: hashPassword, role : getRole?.role ?? 'user' }).save();

        if (!newUser) res.status(201).json({ success: true, message: "[Create User] User added successfully", data: newUser });


        const { firstname, lastname, phonenumber, departmentId, status } = req.body;

        if (!firstname || !lastname || !phonenumber || !roleId || !departmentId || !status) return res.json({ success: false, message: '[Add Employee] Data not provided', data: {} });

        console.log(newUser,'newUser');
        //create new emp
        const newEmp = new Employee({ firstname, lastname, email, phonenumber, roleId, departmentId, status, userId: newUser?._id });
        
        console.log(newEmp,'newEmp');
        const saveEmp = await newEmp.save();

        //respond with success
        return res.status(201).json({ message: "[Add Employee] Added successfuly", data: saveEmp })
    } catch (error) {
        res.status(401).json({ success: false, message: "[Create User by admin] Some error occured", data: {} })
    }
}

const tokenVerification = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) return res.status(401).json({ success: false, message: 'No token', data: token });

        //check if token is valid
        const verified = jwt.verify(token, process.env.PASSWORD_SECRET);

        //add the verified token to request
        req.user = verified;

        //if token is verified
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token', data: token })
    }
}

const loginUser = async (req, res) => {
    try{
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) return res.status(400).json({ success: false, message: '[Login User] Data not provided', data: null });
    
        //check if user does not exists
        const checkUser = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!checkUser) {
            return res.json({
                success: false,
                message: "[Login User] User does not exist",
                data: null
            });
        }
    
        //check if password is correct
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.json({
                success: false,
                message: "[Login User] Incorrect password! Please try again",
                data: null
            });
        }
    
        //create token for the user
        const tokenData = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            username: checkUser.username
        }, process.env.PASSWORD_SECRET, { expiresIn: '300m' })
    
        //on successull login
        res.cookie('token', tokenData, { secure: false, httpOnly: true }).status(200).json({
            success: true,
            message: '[Login User] Logged in successfully',
            data: {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                username: checkUser.username
            }
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: '[Login User] Some Error Occured',
            data: null
        })
    }

}

const logoutUser = async (req, res) => {
    try{
        res.clearCookie('token').json({
            success : true,
            data : null,
            message : '[Logout User] Logged Out Successfully'
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: '[Logout User] Some Error Occured',
            data: null
        })
    }
}

const getAllUsers = async (req, res) => {
    try{
        const allUsers = await User.find();
        if(!allUsers) return res.json({
            success : false,
            data : null,
            message : '[Get All Users] Not Successfull'
        })

        res.status(201).json({
            success : true,
            data : allUsers,
            message : '[Get All Users] Retrieved Users Successfully'
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: '[Get All Users] Some Error Occured',
            data: null
        })
    }
}

const deleteUser = async (req, res) => {
    try{
        const {userId} = req.params;
        console.log(userId,'userId')
        const deleteUser = await User.findOneAndDelete({_id : userId});
        if(!deleteUser) return res.json({
            success : false,
            data : null,
            message : '[Delete User] Does not Exist'
        })

        res.status(200).json({
            success : true,
            data : deleteUser,
            message : '[Delete User] User Deleted Successfully'
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: '[Delete User] Some Error Occured',
            data: null
        })
    }
}

const checkUser = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        if (!token) return res.json({ success: false, message: '[Check Token] Unauthorized User', data: null });

        //check if token is valid
        const verified = jwt.verify(token, process.env.PASSWORD_SECRET);

        //add the verified token to request
        req.user = verified;

        //if token is verified
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: '[Check Token] User is not Authenticated', data: token })
    }

}

const sendEmailVerificationLink = async (req, res) => {
    try {
        const { email } = req.body;
        
        console.log('checkpoint 1')
        console.log(email,'email from verification')

        // send the verification link to the entered email
        const token = jwt.sign({ email }, process.env.EMAIL_SECRET, { expiresIn: '300m' })
        const verificationLink = `http://localhost:5173/verify-email/?token=${token}`;

        console.log('checkpoint 2')

        //emailOptions - who sends what to whom
        const sendEmail = async (emailOptions) => {
            let emailTransporter = await createTransporterForEmail();
            const response = await emailTransporter.sendMail(emailOptions);
            return response;
        };

        console.log('checkpoint 3')
        console.log(verificationLink,'verificationLink')

        sendEmail({
            subject: "Test",
            html: emailTemplate(`${verificationLink}`),
            // text: `${verificationLink}`,
            to: email,
            from: process.env.EMAIL
        }).then((data) => {
            console.log(data,'data');
            if(Object.keys(data).length > 0){
                return res.json({data : data, message : '[Email Verification] Verification Email Sent Successfully', success : true}).status(200);
            }else {
                return res.json({data : data, message : '[Email Verification] Verification Email Cannot be Sent! Try again Later', success : true}).status(200);
            }
        })
    }catch (error){
        res.json({data : error, message : '[Email Verification] Some Error occured', success : false}).status(200);
    }
}

const verifyEmail = async (req, res) => {
    try{
        const token = req.query.token;

        // verify the token that is received from the body, when the user click on the verification link
        const verifyTokenData = jwt.verify(token, process.env.EMAIL_SECRET);

        // if it fails to verify the token and it is empty
        if(!verifyTokenData){
            return res.json({success : false, message : '[Verify Email] Invalid token', data : null}).status(400);
            
        // if the token is not empty and data is being sent into the token
        }else{
            const { email } = verifyTokenData;
            console.log("checkpoint 2")

            // Check if already verified
            const findUserVerified = await User.findOne({ email }).select('verified');

            // chech if user is not in database
            if(!findUserVerified){
                return res.json({success : false, message : '[Verify Email] User is not in Database', data : null}).status(400);
            }

            // if user is already verified
            if(findUserVerified['verified'] === 'verified'){
                return res.json({success : true, message : '[Verify Email] Email is Already Verified', data : findUserVerified}).status(200);
            }

            // find user associated with this email and update
            const findUserAndUpdate = await User.findOneAndUpdate({ email }, {verified : 'verified'}, {new : true, runValidators : true});

            return res.json({success : true, message : '[Verify Email] Email Verified Successfully', data : findUserAndUpdate}).status(200);
        }
    }catch(error){
        return res.json({success : false, message : '[Verify Email] Token Invalid or Some Error Occured', data : null}).status(400);
    }
}


module.exports = { loginUser, tokenVerification, verifyEmail, registerUser, checkUser, createUserByAdmin, logoutUser, getAllUsers, deleteUser, sendEmailVerificationLink };
