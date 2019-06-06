import Home from './Home';
import Register from './Register';
import SetPassword from './SetPassword';

export default [
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
    name: 'Home',
    pathname: '*',
    component: Home
  }
];
