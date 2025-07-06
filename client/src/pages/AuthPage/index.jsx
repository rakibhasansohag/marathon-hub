import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaEye, FaEyeSlash, FaRunning } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading';
import { useStaticTitle } from '@/lib/utils';

const AuthPage = () => {
	useStaticTitle();

	const [activeTab, setActiveTab] = useState('login');
	const [showPassword, setShowPassword] = useState(false);
	const [nameError, setNameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');

	const {
		createUser,
		setUser,
		updateUser,
		user,
		loading: isLoading,
		googleLogin,
		signIn,
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
			})
			.finally(() => setLoading(false));
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
			toast.success('You are already logged in! Please log out first.');
			navigate(location.state?.from?.pathname || '/', { replace: true });
		}
	}, [user, navigate, location.state, isLoading]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='w-full max-w-md'
			>
				<Card className='shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90'>
					<CardHeader className='text-center'>
						<CardTitle className='text-3xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-2'>
							<FaRunning className='text-blue-600 dark:text-blue-400' />
							MarathonHub
						</CardTitle>
						<p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
							Join the race to connect and grow!
						</p>
					</CardHeader>
					<CardContent>
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className='w-full'
						>
							<TabsList className='grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1'>
								<TabsTrigger
									value='login'
									className='rounded-md data-[state=active]:bg-white data-[state=active]:dark:bg-gray-600 data-[state=active]:shadow-sm'
								>
									Login
								</TabsTrigger>
								<TabsTrigger
									value='register'
									className='rounded-md data-[state=active]:bg-white data-[state=active]:dark:bg-gray-600 data-[state=active]:shadow-sm'
								>
									Register
								</TabsTrigger>
							</TabsList>
							<motion.div
								key={activeTab}
								initial={{ opacity: 0, x: activeTab === 'login' ? 50 : -50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: activeTab === 'login' ? -50 : 50 }}
								transition={{ duration: 0.4, ease: 'easeInOut' }}
							>
								<TabsContent value='login' className='mt-6'>
									<form onSubmit={handleLogin} className='space-y-6'>
										<div>
											<label
												htmlFor='email'
												className='block text-sm font-medium text-gray-700 dark:text-gray-200'
											>
												Email
											</label>
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
											<label
												htmlFor='password'
												className='block text-sm font-medium text-gray-700 dark:text-gray-200'
											>
												Password
											</label>
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
												className='absolute right-3 top-8 text-gray-500 dark:text-gray-400'
											>
												{showPassword ? <FaEyeSlash /> : <FaEye />}
											</button>
										</div>
										<div>
											<Link
												to='/auth/forget-password'
												state={{ email: email || '' }}
												className='text-sm text-blue-600 hover:underline dark:text-blue-400'
											>
												Forgot password?
											</Link>
										</div>
										<Button
											type='submit'
											className='w-full bg-primary hover:bg-green-700 dark:bg-green-500 dark:hover:bg-primary'
											disabled={loading}
										>
											{loading ? 'Logging in...' : 'Login'}
										</Button>
									</form>
								</TabsContent>
								<TabsContent value='register' className='mt-6'>
									<form onSubmit={handleRegister} className='space-y-6'>
										<div>
											<label
												htmlFor='name'
												className='block text-sm font-medium text-gray-700 dark:text-gray-200'
											>
												Name
											</label>
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
											<label
												htmlFor='photo'
												className='block text-sm font-medium text-gray-700 dark:text-gray-200'
											>
												Photo URL
											</label>
											<Input
												id='photo'
												type='text'
												name='photo'
												placeholder='Photo URL'
												className='mt-1 dark:bg-gray-700 dark:text-white'
											/>
										</div>
										<div>
											<label
												htmlFor='email'
												className='block text-sm font-medium text-gray-700 dark:text-gray-200'
											>
												Email
											</label>
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
											<label
												htmlFor='password'
												className='block text-sm font-medium text-gray-700 dark:text-gray-200'
											>
												Password
											</label>
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
												className='absolute right-3 top-8 text-gray-500 dark:text-gray-400'
											>
												{showPassword ? <FaEyeSlash /> : <FaEye />}
											</button>
										</div>
										{passwordError && (
											<p className='text-red-500 text-sm mt-1'>
												{passwordError}
											</p>
										)}
										<Button
											type='submit'
											className='w-full bg-primary hover:bg-green-700 dark:bg-green-500 dark:hover:bg-primary'
											disabled={loading}
										>
											{loading ? 'Registering...' : 'Register'}
										</Button>
									</form>
								</TabsContent>
							</motion.div>
						</Tabs>
						<div className='mt-6 text-center'>
							<h3 className='text-sm font-medium text-gray-700 dark:text-gray-200'>
								Or continue with
							</h3>
							<Button
								variant='outline'
								className='mt-2 w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
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
								{loading ? 'Logging in...' : 'Google'}
							</Button>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};

export default AuthPage;
