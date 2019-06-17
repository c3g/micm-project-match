import Home from './Home';
import Register from './Register';
import SetPassword from './SetPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';

export default [
  {
    name: 'Login',
    pathname: '/signin',
    component: Login
  },
  {
    name: 'Register',
    pathname: '/signup',
    component: Register
  },
  {
    name: 'SetPassword',
    pathname: '/setpassword',
    component: SetPassword
  },
  {
    name: 'ForgotPassword',
    pathname: '/forgotpassword',
    component: ForgotPassword
  },
  {
    name: 'Home',
    pathname: '*',
    component: Home
  }
];
