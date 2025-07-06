// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { FaRegCalendarTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const RegistrationClosed = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Registration Closed';
	}, []);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='min-h-[90vh] flex items-center justify-center px-4'
		>
			<motion.div
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				className='max-w-xl text-center space-y-6'
			>
				<div className='flex justify-center text-yellow-500 text-6xl'>
					<FaRegCalendarTimes />
				</div>
				<h1 className='text-3xl md:text-5xl font-bold text-foreground'>
					Registration Closed
				</h1>
				<p className='text-muted-foreground'>
					Sorry, registration for this marathon is currently closed. Please
					check back during the official registration period.
				</p>

				<div className='flex justify-center'>
					<Button onClick={() => navigate('/')} className='gap-2'>
						Back to Home
					</Button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default RegistrationClosed;
