import { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AuthLogin from './components/auth/authLogin'
import AuthRegister from './components/auth/authRegister'
import AuthForm from './pages/auth/authform'
import { useDispatch } from 'react-redux'
import { checkUser } from './store/authslice'
import NotFound from './pages/not-found/notFound'
import { getRole } from './store/rolesSlice'
import ProtectedRoutes from './routes/protectedRoutes'
import AdminRoutes from './routes/adminRoutes'
import UserRoutes from './routes/userRoutes'
import EmailVerification from './pages/email-verification/emailVerification'
import ResetPasswordView from './pages/reset-password/resetPasswordView'
import ResetPasswordForm from './components/reset-password/resetPasswordForm'

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
        <Route path='/login' element={<ProtectedRoutes><AuthForm /></ProtectedRoutes>}>
          <Route path='' element={<AuthLogin />} />
        </Route>
        <Route path='/register' element={<ProtectedRoutes><AuthForm /></ProtectedRoutes>} >
          <Route path='' element={<AuthRegister />} />
        </Route>
        <Route path='/verify-email' element={<EmailVerification />} />
        <Route path='/reset-password' element={<ResetPasswordView />} >
          <Route path='' element={<ResetPasswordForm />} />
        </Route>
        <Route path='/panel/*' element={<AdminRoutes />} />
        <Route path='/user/*' element={<UserRoutes />} />
        <Route path='*' element={<ProtectedRoutes><NotFound /></ProtectedRoutes>} />
      </Routes>
    </div>
  )
}

export default App;
