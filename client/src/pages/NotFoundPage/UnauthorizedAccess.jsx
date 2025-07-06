// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { FaLock, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const UnauthorizedAccess = () => {
	useEffect(() => {
		document.title = 'Unauthorized Access';
	}, []);

	const navigate = useNavigate();

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
				<div className='flex justify-center text-red-600 text-6xl'>
					<FaLock />
				</div>
				<h1 className='text-3xl md:text-5xl font-bold text-foreground'>
					Unauthorized Access
				</h1>
				<p className='text-muted-foreground'>
					You don’t have permission to view this page. Please login with the
					correct role or return to safety.
				</p>

				<div className='flex justify-center gap-4 flex-wrap'>
					<Button onClick={() => navigate('/')} className='gap-2'>
						<FaHome /> Home
					</Button>
					<Button
						variant='secondary'
						onClick={() => navigate(-1)}
						className='gap-2'
					>
						Back
					</Button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default UnauthorizedAccess;
