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
import Project from './Project';
import Application from './Application';
import ApplicationDetails from './ApplicationDetails';
import User from './User';
import Projects from './Projects';
import UpdateProject from './UpdateProject';
import Applications from './Applications';
import Professors from './Professors';
import Users from './Users';

export default [
  {
    name: 'Users',
    pathname: '/users',
    component: Users,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: 'Users'
  },
  {
    name: 'Professors',
    pathname: '/professors',
    component: Professors,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: 'Professors'
  },
  {
    name: 'Applications',
    pathname: '/applications',
    component: Applications,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: 'Applications'
  },
  {
    name: 'Application',
    pathname: '/application/:id',
    component: ApplicationDetails,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: true
  },
  {
    name: 'User',
    pathname: '/user/:id',
    component: User,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: true
  },
  {
    name: 'Projects',
    pathname: '/projects',
    component: Discover,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: 'Projects'
  },
  {
    name: 'UpdateProject',
    pathname: '/update-project',
    component: UpdateProject,
    access: [k.PROFESSOR, k.STUDENT],
    withAuth: true,
    withSidebar: true
  },
  {
    name: 'Projects',
    pathname: '/projects',
    component: Projects,
    access: [k.PROFESSOR],
    withAuth: true,
    withSidebar: 'My Projects'
  },
  {
    name: 'Application',
    pathname: '/application',
    component: Application,
    access: [k.STUDENT],
    withAuth: true,
    withSidebar: 'Application'
  },
  {
    name: 'Project',
    pathname: '/project/:id',
    component: Project,
    access: [k.PROFESSOR, k.STUDENT, k.ADMIN],
    withAuth: true,
    withSidebar: true
  },
  {
    name: 'CreateProject',
    pathname: '/create-project',
    component: CreateProject,
    access: [k.PROFESSOR],
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
