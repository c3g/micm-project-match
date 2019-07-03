import * as k from 'Src/constants/values';
import Home from './Home';
import Register from './Register';
import SetPassword from './SetPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Setup from './Setup';
import VerifyEmail from './VerifyEmail';
import Profile from './Profile';
import ProfessorSetup from './ProfessorSetup';
import CVSetup from './CVSetup';
import CreateProject from './CreateProject';
import Discover from './Discover';

export default [
  {
    name: 'Discover',
    pathname: '/discover',
    component: Discover,
    access: [k.PROFESSOR, k.STUDENT, k.ADMIN],
    withAuth: true,
    withSidebar: 'Discover Projects'
  },
  {
    name: 'CreateProject',
    pathname: '/create-project',
    component: CreateProject,
    access: [k.PROFESSOR, k.ADMIN],
    withAuth: true,
    withSidebar: 'Create Project'
  },
  {
    name: 'CVSetup',
    pathname: '/cv-setup',
    component: CVSetup,
    access: [k.PROFESSOR, k.STUDENT],
    withAuth: true
  },
  {
    name: 'ProfessorSetup',
    pathname: '/professor-setup',
    component: ProfessorSetup,
    access: [k.PROFESSOR],
    withAuth: true
  },
  {
    name: 'VerifyEmail',
    pathname: '/verify',
    component: VerifyEmail
  },
  {
    name: 'Setup',
    pathname: '/setup',
    component: Setup,
    access: [k.ADMIN, k.PROFESSOR, k.STUDENT, k.UNSET],
    withAuth: true
  },
  {
    name: 'Login',
    pathname: '/signin',
    component: Login,
    withAuth: false
  },
  {
    name: 'Register',
    pathname: '/signup',
    component: Register,
    withAuth: false
  },
  {
    name: 'SetPassword',
    pathname: '/set-password',
    component: SetPassword,
    withAuth: false
  },
  {
    name: 'ForgotPassword',
    pathname: '/forgot-password',
    component: ForgotPassword,
    withAuth: false
  },
  {
    name: 'Home',
    pathname: '/home',
    component: Home
  },
  {
    name: 'Profile',
    pathname: '/',
    component: Profile,
    access: [k.PROFESSOR, k.STUDENT, k.ADMIN, k.UNSET],
    withAuth: true,
    withSidebar: 'Profile'
  }
];
