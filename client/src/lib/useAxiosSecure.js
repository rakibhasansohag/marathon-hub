import axios from 'axios';
import useAuth from './useAuth';

const URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
	baseURL: URL,
});

function useAxiosSecure() {
	const { user, logOut } = useAuth();

	axiosInstance.interceptors.request.use(async (config) => {
		if (user) {
			const token = await user?.getIdToken();
			config.headers.authorization = `Bearer ${token}`;
		}
		return config;
	});

	// response interceptor
	axiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			console.log('error in interceptor', error);
			if (
				error.response &&
				(error.response.status === 401 || error.response.status === 403)
			) {
				console.log('Token expired or unauthorized');
				logOut()
					.then(() => console.log('Signed out due to 401/403'))
					.catch((err) => console.log(err));
			}
			return Promise.reject(error);
		},
	);

	return axiosInstance;
}

export default useAxiosSecure;
