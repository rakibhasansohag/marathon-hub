// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FaRunning } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Loading = () => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
		}, 500);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 z-50'>
			<Card className='bg-white dark:bg-gray-800 border-none shadow-lg'>
				<CardContent className='p-8 text-center'>
					{/* Running Silhouette Animation */}
					<motion.div
						className='text-blue-600 dark:text-blue-400 mb-6'
						animate={{
							x: [-20, 20, -20],
							rotate: [0, 5, -5, 0],
						}}
						transition={{
							repeat: Infinity,
							duration: 1.5,
							ease: 'easeInOut',
						}}
					>
						<FaRunning size={48} />
					</motion.div>

					{/* Loading Text */}
					<motion.h2
						className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						Get Ready to Run!
					</motion.h2>

					{/* Motivational Message */}
					<motion.p
						className='text-md md:text-lg text-gray-600 dark:text-gray-300 mb-6'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.8 }}
					>
						Loading your marathon journey...
					</motion.p>

					{/* Progress Bar */}
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.6 }}
					>
						<Progress
							value={progress}
							className='w-64 md:w-80 h-2 bg-gray-200 dark:bg-gray-700'
							indicatorClassName='bg-blue-600 dark:bg-blue-400'
						/>
					</motion.div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Loading;
