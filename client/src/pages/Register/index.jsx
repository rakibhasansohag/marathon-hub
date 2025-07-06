import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading';
import { useStaticTitle } from '@/lib/utils';

const Register = () => {
	useStaticTitle();

	const [nameError, setNameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const {
		createUser,
		setUser,
		updateUser,
		user,
		loading: isLoading,
		googleLogin,
	} = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const passwordRegex = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})',
	);

	const handleNameChange = (e) => {
		const val = e.target.value.trim();
		if (nameError && val.length >= 3) setNameError('');
	};

	const handlePasswordChange = (e) => {
		const val = e.target.value;
		if (passwordError && passwordRegex.test(val)) setPasswordError('');
	};

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleRegister = (e) => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const name = form.name.value.trim();
		if (name.length < 3) {
			setLoading(false);
			setNameError('Name must be at least 3 characters');
			return;
		}
		const photo = form.photo.value.trim();
		const email = form.email.value.trim();
		const password = form.password.value.trim();
		if (!passwordRegex.test(password)) {
			setLoading(false);
			setPasswordError(
				'Password must be at least 6 characters and contain at least one lowercase letter, one uppercase letter, one number',
			);
			return;
		}
		createUser(email, password)
			.then((result) => {
				const createdUser = result.user;
				updateUser({ displayName: name, photoURL: photo })
					.then(() => {
						setUser({ ...createdUser, displayName: name, photoURL: photo });
						axios
							.post(`${import.meta.env.VITE_BASE_URL}/marathonUser`, {
								name,
								email,
								photoURL: photo,
								age: null,
								gender: null,
								status: 'inactive',
								experiences: [],
								totalMarathonEventShared: 0,
								creationTime: result.user?.metadata?.creationTime,
								lastSignInTime: result.user?.metadata?.lastSignInTime,
								loginMethod: result.user?.providerData[0]?.providerId,
								uid: result.user?.uid,
								phoneNumber: null,
							})
							.then((response) => {
								console.log(response);
								if (
									response?.data?.data?.insertedId ||
									response?.data?.acknowledged === true ||
									response?.data?.upsertedId
								) {
									toast.success(`User registered successfully ${name}`);
								}
							})
							.catch((error) => {
								console.error('Error registering user:', error);
							});
						navigate(`${location.state || '/'}`);
					})
					.catch((error) => {
						setLoading(false);
						toast.error(error.message || 'Something went wrong');
						setUser(createdUser);
						navigate(`${location.state || '/'}`);
					})
					.finally(() => setLoading(false));
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.message || 'Something went wrong');
			});
	};

	const handleGoogleLogin = () => {
		setLoading(true);
		googleLogin()
			.then(({ user: gUser }) => {
				const loggedUser = gUser;
				setUser(loggedUser);
				const payload = {
					name: gUser.displayName,
					email: gUser.email,
					photoURL: gUser.photoURL,
					age: null,
					gender: null,
					status: 'inactive',
					experiences: [],
					totalMarathonEventShared: 0,
					uid: gUser.uid,
					creationTime: gUser.metadata.creationTime,
					lastLoginTime: gUser.metadata.lastSignInTime,
					loginMethod: gUser?.providerData[0]?.providerId,
				};
				axios
					.post(`${import.meta.env.VITE_BASE_URL}/marathonUser`, payload)
					.then((response) => {
						console.log(response);
						if (
							response?.data?.acknowledged === true ||
							response?.data?.upsertedId
						) {
							toast.success(
								`User registered successfully ${gUser?.displayName}`,
							);
						}
					})
					.catch((error) => {
						console.error('Error registering user:', error);
					});
				navigate(`${location.state || '/'}`);
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.message || 'Something went wrong');
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (!isLoading && user) {
			toast.success('Your Are already logged in! Please logged out first.');
			navigate(location.state?.from?.pathname || '/', { replace: true });
		}
	}, [user, navigate, location.state, isLoading]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12'>
			<Card className='w-full max-w-md flex shadow-xl border-0 overflow-hidden pt-0 gap-0 '>
				<div className=' bg-green-600 dark:bg-green-700 text-white p-8 flex flex-col justify-center'>
					<h2 className='text-3xl font-bold'>Join MarathonHub</h2>
					<p className='mt-4 text-lg'>
						Create an account and start your running journey with our community!
					</p>
				</div>
				<CardContent className='p-8 bg-white dark:bg-gray-800'>
					<form onSubmit={handleRegister} className='space-y-4'>
						<div>
							<Label
								htmlFor='name'
								className='text-gray-700 dark:text-gray-200'
							>
								Name
							</Label>
							<Input
								id='name'
								name='name'
								type='text'
								placeholder='Name'
								required
								onChange={handleNameChange}
								className='mt-1 dark:bg-gray-700 dark:text-white'
							/>
							{nameError && (
								<p className='text-red-500 text-sm mt-1'>{nameError}</p>
							)}
						</div>
						<div>
							<Label
								htmlFor='photo'
								className='text-gray-700 dark:text-gray-200'
							>
								Photo URL
							</Label>
							<Input
								id='photo'
								type='text'
								name='photo'
								placeholder='Photo URL'
								className='mt-1 dark:bg-gray-700 dark:text-white'
							/>
						</div>
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
								onChange={handlePasswordChange}
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
						{passwordError && (
							<p className='text-red-500 text-sm mt-1'>{passwordError}</p>
						)}
						<Button
							type='submit'
							className='w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white'
							disabled={loading}
						>
							{loading ? 'Registering...' : 'Register'}
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
						Already Have An Account?{' '}
						<Link
							to='/auth/login'
							className='text-green-600 hover:underline dark:text-green-400'
						>
							Login
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default Register;
