import { Moon, Sun, Menu } from 'lucide-react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router';
import { use, useEffect, useState } from 'react';

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const navItems = [
	{ path: '/', label: 'Home' },
	{ path: '/marathons', label: 'Marathons' },
	{ path: '/dashboard', label: 'Dashboard', auth: true },
	{ path: '/auth/login', label: 'Login', guestOnly: true },
	{ path: '/auth/register', label: 'Register', guestOnly: true },
	{ path: '/auth/register-v1', label: 'AUth', guestOnly: true },
];

export default function Header() {
	const [theme, setTheme] = useState('light');
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const { user, logOut } = use(AuthContext);

	const handleLogOut = () => {
		logOut()
			.then(() => {
				toast.success('Successfully logged out');
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message || 'Something went wrong');
			});
	};

	useEffect(() => {
		const saved = localStorage.getItem('theme') || 'light';
		setTheme(saved);
		document.documentElement.classList.toggle('dark', saved === 'dark');
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
	};

	const NavLinks = () =>
		navItems
			.filter((item) => {
				if (item.auth && !user) return false;
				if (item.guestOnly && user) return false;
				return true;
			})
			.map((item) => (
				<NavLink
					to={item.path}
					key={item.label}
					className='transition-all duration-300 hover:text-primary text-sm font-medium '
				>
					{item.label}
				</NavLink>
			));

	return (
		<header className='border-b sticky top-0 z-50 bg-background shadow-sm'>
			<div className='section flex items-center justify-between py-4 relative'>
				{/* Left - Logo */}
				<Link to='/' className='text-xl font-bold text-primary'>
					MaraThon Hub
				</Link>

				{/* Center - Nav links (desktop only) */}
				<nav className='hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2'>
					<NavLinks />
				</nav>

				{/* Right - Theme + Auth */}
				<div className='flex items-center gap-3'>
					<Button variant='outline' size='icon' onClick={toggleTheme}>
						{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
					</Button>

					{user && (
						<div>
							<DropdownMenu>
								<Tooltip>
									<TooltipTrigger asChild>
										<DropdownMenuTrigger asChild>
											<img
												src={user?.avatar || user?.photoURL}
												alt='avatar'
												className='w-8 h-8 rounded-full object-cover ring-2 ring-primary cursor-pointer'
											/>
										</DropdownMenuTrigger>
									</TooltipTrigger>
									<TooltipContent>
										<p>Open Menu</p>
									</TooltipContent>
								</Tooltip>

								<DropdownMenuContent align='end'>
									<DropdownMenuLabel>Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => navigate('/dashboard/profile')}
										className='cursor-pointer'
									>
										View Profile
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={handleLogOut}
										className='text-red-600 cursor-pointer'
									>
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}

					{/* Mobile toggle */}
					<Button
						variant='ghost'
						size='icon'
						className='md:hidden'
						onClick={() => setOpen(!open)}
					>
						<Menu />
					</Button>
				</div>
			</div>

			{/* Mobile Nav */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='md:hidden px-6 pb-4 flex flex-col gap-3 text-sm'
					>
						<NavLinks />
						{user && (
							<Button
								variant='ghost'
								className='text-left text-sm w-fit'
								onClick={handleLogOut}
							>
								Logout
							</Button>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
