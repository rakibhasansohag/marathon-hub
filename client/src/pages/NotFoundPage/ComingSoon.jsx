// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const ComingSoon = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Coming Soon';
	});

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
				<div className='flex justify-center text-green-600 text-6xl'>
					<FaTools />
				</div>
				<h1 className='text-3xl md:text-5xl font-bold text-foreground'>
					Coming Soon
				</h1>
				<p className='text-muted-foreground'>
					This feature is under construction. We’re working hard to bring it to
					you soon. Stay tuned!
				</p>

				<div className='flex justify-center'>
					<Button onClick={() => navigate('/')} className='gap-2'>
						Go to Home
					</Button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default ComingSoon;
