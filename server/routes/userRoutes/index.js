const express = require('express');
const { resetPassword, sendPasswordResetEmail, sendEmailVerificationLink, verifyEmail, registerUser, logoutUser, getAllUsers, loginUser, checkUser, createUserByAdmin, deleteUser } = require('../../controllers/auth_user');
const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/createuser', createUserByAdmin);
router.post('/user/sendemailverificationlink', sendEmailVerificationLink);
router.get('/user/verifyemail', verifyEmail);
router.post('/user/sendpasswordresetemail', sendPasswordResetEmail);
router.post('/user/resetpassword/:userId/:token', resetPassword);
router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);
router.delete('/user/:userId', deleteUser);
router.get('/user/getallusers', getAllUsers);
router.get('/user/checkuser', checkUser, (req, res) => {
        const user = req.user;
        return res.status(200).json({success : true, data : user, message : '[Check User] User is authenticated'})
});

module.exports = router;