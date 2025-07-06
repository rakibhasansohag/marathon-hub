import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import Lottie from 'lottie-react';
import runnerAnimation from '@/assets/running-marathon.json';
import { FaRunning, FaHome, FaArrowLeft } from 'react-icons/fa';
import Header from '@/components/shared/Header';

const suggestions = [
	{
		name: 'Upcoming Marathons',
		path: '/marathons',
		description: 'Explore available marathon events near you.',
	},
	{
		name: 'Register History',
		path: '/dashboard/my-apply-list',
		description: 'View your previous marathon registrations.',
	},
	{
		name: 'My Marathons',
		path: '/my-marathons',
		description: 'why not seeing your marathon event list?',
	},
];

const NotFound = () => {
	return (
		<section className='min-h-screen '>
			<Header />
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className='min-h-screen flex flex-col items-center justify-center px-6  text-center bg-[#FFFFFF] dark:bg-[#1A1A1A] pb-10'
			>
				<motion.div
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.8, ease: 'easeInOut' }}
					className='w-full max-w-md mb-6 dark:hidden'
				>
					<Lottie animationData={runnerAnimation} loop={true} />
				</motion.div>

				<motion.h1
					initial={{ y: -10 }}
					animate={{ y: 0 }}
					transition={{ duration: 1, ease: 'easeInOut' }}
					className='text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-3'
				>
					<FaRunning className='text-primary' /> 404 - Page Not Found
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.9 }}
					className='text-muted-foreground mt-4 text-lg'
				>
					Looks like you’ve taken a wrong turn in the race. Let’s help you get
					back on track!
				</motion.p>

				<motion.div
					className='flex gap-4 mt-6 flex-wrap justify-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.9 }}
				>
					<Link to='/'>
						<Button>
							<FaHome className='mr-2' /> Go to Homepage
						</Button>
					</Link>
					<Button variant='secondary' onClick={() => window.history.back()}>
						<FaArrowLeft className='mr-2' /> Go Back
					</Button>
				</motion.div>

				{suggestions.length > 0 && (
					<motion.div
						className='mt-12 w-full max-w-5xl'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1 }}
					>
						<h2 className='text-2xl font-semibold mb-6'>
							Explore these instead:
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{suggestions.map((item, i) => (
								<motion.div
									key={i}
									whileHover={{ y: -5 }}
									transition={{ type: 'spring' }}
								>
									<Card className='h-full pb-0'>
										<CardContent className='py-6 flex flex-col items-center text-center'>
											<CardTitle className='text-green-600 mb-2'>
												{item.name}
											</CardTitle>
											<p className='text-sm text-muted-foreground mb-4'>
												{item.description}
											</p>
											<Link to={item.path}>
												<Button size='sm' variant='outline'>
													Explore
												</Button>
											</Link>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</motion.div>
		</section>
	);
};

export default NotFound;
