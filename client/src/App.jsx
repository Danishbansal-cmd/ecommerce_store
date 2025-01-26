import { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AuthLogin from './components/auth/authLogin'
import AuthRegister from './components/auth/authRegister'
import { useDispatch } from 'react-redux'
import { checkUser } from './store/authslice'
import NotFound from './pages/not-found/notFound'
import { getRole } from './store/rolesSlice'
import ProtectedRoutes from './routes/protectedRoutes'
import AdminRoutes from './routes/adminRoutes'
import UserRoutes from './routes/userRoutes'
import EmailVerification from './pages/email-verification/emailVerification'
import ResetPasswordView from './pages/reset-password/resetPasswordView'
import SendResetPasswordEmailForm from './components/reset-password/sendResetPasswordEmailForm'
import ResetPasswordForm from './components/reset-password/resetPasswordForm'
import Home from './pages/frontend-user-view/home'
import MainForm from './pages/auth/mainform'
import TermsOfUse from './pages/legal/termsOfUse'
import ShippingPolicy from './pages/legal/shippingPolicy'
import PrivacyPolicy from './pages/legal/privacyPolicy'
import CancellationPolicy from './pages/legal/cancellationPolicy'
import SentEmailVerificationLink from './components/email-verification/sentEmailVerificationLink'
import SentResetPasswordEmail from './components/reset-password/sentResetPasswordEmail'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser()).then((data) => {
      // if user is logged in, then will also get the specific role
      if (data?.payload?.success) {
        // get the role and its permissions
        // and store it in redux store(specificRole)
        dispatch(getRole({ role: data?.payload?.data.role }));
      }
    });
  }, [dispatch])

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* for home page or main page */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<ProtectedRoutes><MainForm /></ProtectedRoutes>}>
          <Route path='' element={<AuthLogin />} />
        </Route>
        <Route path='/register' element={<ProtectedRoutes><MainForm /></ProtectedRoutes>} >
          <Route path='' element={<AuthRegister />} />
        </Route>
        <Route path='/sent-email-verification-link' element={<MainForm />} >
          <Route path='' element={<SentEmailVerificationLink />} />
        </Route>
        <Route path='/verify-email' element={<EmailVerification />} />
        <Route path='/sent-reset-password-email' element={<MainForm />} >
          <Route path='' element={<SentResetPasswordEmail />} />
        </Route>
        <Route path='/send-reset-password-email' element={<ResetPasswordView />} >
          <Route path='' element={<SendResetPasswordEmailForm />} />
        </Route>
        <Route path='/reset-password/:userId/:token' element={<ResetPasswordView />} >
          <Route path='' element={<ResetPasswordForm />} />
        </Route>
        <Route path='/terms-of-use' element={<TermsOfUse />} />
        <Route path='/shipping-policy' element={<ShippingPolicy />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/cancellation-policy' element={<CancellationPolicy />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/user/*' element={<UserRoutes />} />
        <Route path='*' element={<ProtectedRoutes><NotFound /></ProtectedRoutes>} />
      </Routes>
    </div>
  )
}

export default App;
