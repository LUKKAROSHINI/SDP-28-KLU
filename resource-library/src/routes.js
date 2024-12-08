import UserRegister from './pages/UserRegister';
import AdminRegister from './pages/AdminRegister';
import LandingPage from './components/LandingPage';
import Login from './pages/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import UploadedBooks from './components/UploadedBooks';  // Ensure correct import
import Feedback from './components/Feedback';  // Import the Feedback component (to be created)

const routes = [
  { path: '/', component: LandingPage, exact: true },
  { path: '/user-register', component: UserRegister, exact: true },
  { path: '/admin-register', component: AdminRegister, exact: true },
  { path: '/login', component: Login, exact: true },
  { path: '/user-dashboard', component: UserDashboard, exact: true },
  { path: '/admin-dashboard', component: AdminDashboard, exact: true },
  { path: '/uploaded-books', component: UploadedBooks, exact: true },  // Added route for UploadedBooks
  { path: '/feedback/:id', component: Feedback, exact: true },  // New route for Feedback
];

export default routes;
