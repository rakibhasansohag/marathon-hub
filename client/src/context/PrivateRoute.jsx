import { useContext, useEffect, useRef } from 'react';

import { Navigate, useLocation } from 'react-router';

import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import GlobalLoader from '../components/shared/GlobalLoader';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	const location = useLocation();

	const ref = useRef(false);

	useEffect(() => {
		if (!loading && !user) {
			toast.error('You are not logged in');
			ref.current = true;
		}
	}, [loading, user]);

	if (loading) {
		return <GlobalLoader />;
	}

	if (!user) {
		return <Navigate to='/auth/login' state={{ from: location }} replace />;
	}

	return children;
};

export default PrivateRoute;
