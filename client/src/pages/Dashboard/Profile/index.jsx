import { Suspense, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
	FaEdit,
	FaMapMarkerAlt,
	FaClock,
	FaVenusMars,
	FaThumbsUp,
	FaPhone,
	FaHome,
	FaInfoCircle,
	FaUserCheck,
	FaRunning,
	FaTree,
} from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import moment from 'moment';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GlobalLoader from '@/components/shared/GlobalLoader';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';

export default function ProfilePage() {
	const { user, loading: authLoading } = useContext(AuthContext);
	const [profile, setProfile] = useState(null);
	const [dbLoading, setDbLoading] = useState(true);

	useEffect(() => {
		if (!user) return;

		const fetchProfile = async () => {
			try {
				const token = await user?.accessToken;
				const response = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/marathonUser/${user.uid}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				setProfile(response.data);
			} catch (error) {
				console.error('Error fetching profile:', error);
			} finally {
				setDbLoading(false);
			}
		};
		fetchProfile();
	}, [user]);

	useEffect(() => {
		document.title = user
			? `${user.displayName || 'Profile'} | Marathon Hub`
			: 'Profile | Marathon Hub';
	}, [user]);

	if (authLoading || dbLoading) return <GlobalLoader />;

	if (!user)
		return (
			<div className='flex items-center justify-center h-screen'>
				<p className='text-lg'>No user logged in.</p>
			</div>
		);

	// Extract email handle
	const emailHandle = user.email?.split('@')[0] || 'runner';

	// Firebase data
	const firebaseData = [
		{
			icon: <FaClock />,
			label: 'Joined',
			value: moment(user.metadata.creationTime).format('LL'),
		},
		{
			icon: <FaUserCheck />,
			label: 'Last Login',
			value: moment(user.metadata.lastSignInTime).format('LLL'),
		},
		{
			icon: <FaInfoCircle />,
			label: 'Status',
			value: profile?.status ? 'Active ✅' : 'Inactive ❌',
		},
		{
			icon: <FaRunning />,
			label: 'Sign-in Method',
			value: user.providerData[0].providerId.replace('.com', ''),
		},
	];

	// Database data (personal info and marathon stats)
	const personalInfo = [
		{ icon: <FaMapMarkerAlt />, label: 'Location', value: profile?.location },
		{ icon: <FaVenusMars />, label: 'Gender', value: profile?.gender },
		{
			icon: <FaClock />,
			label: 'Age',
			value: profile?.age ? `${profile.age} years` : null,
		},
		{ icon: <FaPhone />, label: 'Phone', value: profile?.phone },
		{ icon: <FaHome />, label: 'Address', value: profile?.address },
		{
			icon: <MdBloodtype size={19} />,
			label: 'Blood Group',
			value: profile?.bloodGroup,
		},
	];

	const marathonStats = [
		{
			icon: <FaThumbsUp />,
			label: 'Total Marathons',
			value: profile?.totalMarathons,
		},
		{
			icon: <FaRunning size={18} />,
			label: 'Best Time',
			value: profile?.bestTime,
		},
		{
			icon: <FaThumbsUp />,
			label: 'Total Runs',
			value: profile?.totalRuns,
		},
		{
			icon: <FaTree />,
			label: 'Total Marathon event host',
			value: profile?.totalMarathonEventShared,
		},
	];

	console.log(profile);

	return (
		<Suspense
			fallback={
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='fixed inset-0 flex items-center justify-center bg-base-100 z-50'
				>
					<motion.span
						className='loading loading-spinner loading-lg'
						animate={{ rotate: 360 }}
						transition={{ repeat: Infinity, duration: 1 }}
					/>
				</motion.div>
			}
		>
			<div className='max-w-[1000px] w-full mx-auto  py-6 space-y-8'>
				{/* User Information Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Card className='bg-base-200 rounded-2xl shadow-lg'>
						<CardContent className='p-6 flex flex-col lg:flex-row sm:items-center gap-6'>
							<img
								src={user.photoURL || '/user.png'}
								alt='Avatar'
								className='w-32 h-32 rounded-full object-cover ring-4 ring-primary/20'
							/>
							<div className='flex-1 space-y-2'>
								<h1 className='text-3xl font-bold text-primary'>
									{profile?.name || user.displayName || 'Marathon Runner'}
								</h1>
								<p className='text-sm'>@{emailHandle}</p>
								<div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
									{firebaseData.concat(personalInfo).map((item, i) => (
										<div key={i} className='flex items-center gap-2 text-sm'>
											<span className='text-primary'>{item.icon}</span>
											<span className='font-medium'>{item.label}:</span>
											<span>{item.value || 'N/A'}</span>
										</div>
									))}
								</div>
								{profile?.lastUpdated && (
									<p className='text-sm mt-4'>
										<strong>Last Updated:</strong>{' '}
										{profile?.lastUpdated
											? moment(profile.lastUpdated).format(
													'MMMM Do YYYY, h:mm a',
											  )
											: 'Never'}
									</p>
								)}
							</div>
							<Button asChild>
								<Link to='/dashboard/profile/edit'>
									<FaEdit className='mr-2' /> Edit Profile
								</Link>
							</Button>
						</CardContent>
					</Card>
				</motion.div>

				{/* Marathon Profile Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<Card className='bg-base-200 rounded-2xl shadow-md py-6'>
						<CardHeader>
							<h2 className='text-2xl font-semibold text-primary flex items-center gap-2'>
								<FaRunning className='text-primary' />
								Marathon Profile
							</h2>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div>
								<h3 className='text-xl font-medium'>Bio</h3>
								<p className='text-gray-600'>
									{profile?.bio ||
										'No bio added yet. Share your marathon story!'}
								</p>
							</div>
							<div>
								<h3 className='text-xl font-medium'>Experiences</h3>
								<p className='text-gray-600'>
									{[...new Set(profile?.experiences || [])].join(', ') || 'N/A'}
								</p>
							</div>
							<div>
								<h3 className='text-xl font-medium mb-2'>Achievements</h3>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									{marathonStats.map((item, i) => (
										<div key={i} className='flex items-center gap-2 text-sm'>
											<span className='text-primary'>{item.icon}</span>
											<span className='font-medium'>{item.label}:</span>
											<span>{item.value || 'N/A'}</span>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</Suspense>
	);
}
