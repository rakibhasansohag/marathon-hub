import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import Loading from '@/components/Loading';
import { useStaticTitle } from '@/lib/utils';

const Login = () => {
	useStaticTitle();

	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const {
		user,
		setUser,
		signIn,
		loading: isLoading,
		googleLogin,
	} = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const email = form.email.value.trim();
		const password = form.password.value.trim();
		signIn(email, password)
			.then((result) => {
				toast.success('Successfully logged in');
				const loggedUser = result.user;
				setUser(loggedUser);
				navigate(`${location.state || '/'}`);
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.message || 'Something went wrong');
				setError(err.code);
			})
			.finally(() => setLoading(false));
	};

	const handleGoogleLogin = () => {
		setLoading(true);
		googleLogin()
			.then((result) => {
				toast.success('Successfully logged in');
				const loggedUser = result.user;
				setUser(loggedUser);
				navigate(`${location.state || '/'}`);
			})
			.catch((err) => {
				setLoading(false);
				setError(err.code);
				toast.error(err.message || 'Something went wrong');
			})
			.finally(() => setLoading(false));
	};

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	useEffect(() => {
		if (!isLoading && user) {
			toast.success(
				'You are already logged in as ' +
					user.displayName +
					' You should logged out first',
			);
			navigate(location.state?.from?.pathname || '/', { replace: true });
		}
	}, [user, navigate, location.state, isLoading]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='flex justify-center items-center min-h-screen bg-blue-50 dark:bg-gray-900 py-12'>
			<Card className='w-full max-w-md shadow-lg border-0 bg-white dark:bg-gray-800 pt-0 rounded-xl gap-0'>
				<div className='rounded-t-xl bg-green-600 dark:bg-green-700 text-white p-8 flex flex-col justify-center'>
					<h2 className='text-3xl font-bold'>Login Your Account</h2>
					<p className='mt-4 text-lg'>
						What's stopping you from joining our community and start your
						running journey with our community!
					</p>
				</div>

				<CardContent className={'mt-8'}>
					<form onSubmit={handleLogin} className='space-y-4'>
						<div>
							<Label
								htmlFor='email'
								className='text-gray-700 dark:text-gray-200'
							>
								Email
							</Label>
							<Input
								id='email'
								type='email'
								name='email'
								placeholder='Email'
								required
								autoComplete='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='mt-1 dark:bg-gray-700 dark:text-white'
							/>
						</div>
						<div className='relative'>
							<Label
								htmlFor='password'
								className='text-gray-700 dark:text-gray-200'
							>
								Password
							</Label>
							<Input
								id='password'
								name='password'
								type={showPassword ? 'text' : 'password'}
								placeholder='Password'
								required
								className='mt-1 dark:bg-gray-700 dark:text-white'
							/>
							<button
								type='button'
								onClick={handleTogglePassword}
								className='absolute right-3 top-7 text-gray-500 dark:text-gray-400'
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
						<div className='flex justify-end'>
							<Link
								to='/auth/forget-password'
								state={{ email: email || '' }}
								className='text-sm text-blue-600 hover:underline dark:text-blue-400'
							>
								Forgot password?
							</Link>
						</div>
						{error && <p className='text-red-500 text-sm'>{error}</p>}
						<Button
							type='submit'
							className='w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white'
							disabled={loading}
						>
							{loading ? 'Logging...' : 'Login'}
						</Button>
					</form>
					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t border-gray-300 dark:border-gray-600'></span>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400'>
									Or Continue With
								</span>
							</div>
						</div>
						<Button
							variant='outline'
							className='mt-4 w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
							onClick={handleGoogleLogin}
							disabled={loading}
						>
							<svg
								aria-label='Google logo'
								width='16'
								height='16'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 512 512'
								className='mr-2'
							>
								<g>
									<path d='m0 0H512V512H0' fill='#fff'></path>
									<path
										fill='#34a853'
										d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341'
									></path>
									<path
										fill='#4285f4'
										d='m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57'
									></path>
									<path
										fill='#fbbc02'
										d='m90 341a208 200 0 010-171l63 49q-12 37 0 73'
									></path>
									<path
										fill='#ea4335'
										d='m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55'
									></path>
								</g>
							</svg>
							{loading ? 'Logging...' : 'Login With Google'}
						</Button>
					</div>
					<p className='mt-4 text-center text-sm text-gray-600 dark:text-gray-400'>
						Don't Have An Account?{' '}
						<Link
							to='/auth/register'
							className='text-blue-600 hover:underline dark:text-blue-400'
						>
							Register
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
