import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import HomeLayout from '../layouts/HomeLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthPage from '../pages/AuthPage';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard/Index';
import AddMarathon from '../pages/Dashboard/AddMarathon';
import MarathonsList from '../pages/MarathonList';
import MarathonDetailsPage from '../pages/MarathonDetail';
import MyMarathonsListPage from '../pages/Dashboard/MyMarathonsList';
import MyApplyList from '../pages/Dashboard/MyapplyList';
import NotFound from '../pages/NotFoundPage';
import ProfilePage from '../pages/Dashboard/Profile';
import EditProfilePage from '../pages/Dashboard/Profile/EditProfilePage';
import ForgotPassword from '../pages/ForgotPassword';
import PrivateRoute from '../context/PrivateRoute';
import TermsAndConditionsPage from '../pages/TermsAndCondition';
import PrivacyPolicyPage from '../pages/PrivacyPlicy';
import BlogPage from '../pages/Blog';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		children: [
			{
				path: '',
				Component: Home,
				index: true,
			},

			{
				path: '/auth/login',
				Component: Login,
			},
			{
				path: '/auth/register',
				Component: Register,
			},
			{
				path: '/auth/register-v1',
				Component: AuthPage,
			},
			{
				path: '/auth/forget-password',
				Component: ForgotPassword,
			},
			{
				path: '/marathons',
				Component: MarathonsList,
				loader: async () => fetch(`${import.meta.env.VITE_BASE_URL}/marathons`),
			},
			{
				path: '/marathons/:id',
				element: (
					<PrivateRoute>
						<MarathonDetailsPage />,
					</PrivateRoute>
				),
			},
			{
				path: '/terms-and-conditions',
				Component: TermsAndConditionsPage,
			},
			{
				path: '/privacy-policy',
				Component: PrivacyPolicyPage,
			},
			{
				path: '/blog',
				Component: BlogPage,
			},
		],
	},
	{
		path: '/dashboard',
		element: <DashboardLayout />,
		children: [
			{
				path: '',
				element: (
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				),
			},
			{
				path: 'add-marathon',
				element: (
					<PrivateRoute>
						<AddMarathon />
					</PrivateRoute>
				),
			},
			{
				path: 'my-marathons',
				element: (
					<PrivateRoute>
						<MyMarathonsListPage />
					</PrivateRoute>
				),
			},
			{
				path: 'my-apply-list',
				element: (
					<PrivateRoute>
						<MyApplyList />
					</PrivateRoute>
				),
			},
			{
				path: 'profile',
				element: (
					<PrivateRoute>
						<ProfilePage />
					</PrivateRoute>
				),
			},
			{
				path: 'profile/edit',
				element: (
					<PrivateRoute>
						<EditProfilePage />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: '/*',
		Component: NotFound,
	},
]);

export default router;
