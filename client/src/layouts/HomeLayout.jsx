import React, { useEffect } from 'react';
import { Outlet, useNavigation, useLocation } from 'react-router';

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';
import GoToTopButton from '../components/shared/GoToTopButton';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const HomeLayout = () => {
	const navigation = useNavigation();
	const location = useLocation();

	const isLoading = navigation.state === 'loading';

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<section className='flex flex-col min-h-screen'>
			<header className='container mx-auto px-4 sm:px-2 lg:px-0 pt-4'>
				<Header />
			</header>

			{/* Loading overlay */}
			<AnimatePresence>
				{isLoading && (
					<motion.div
						className='absolute inset-0 flex items-center justify-center bg-base-100/75 z-50'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8 }}
					>
						<motion.span
							className='loading loading-spinner loading-lg'
							animate={{ rotate: 360 }}
							transition={{ repeat: Infinity, duration: 1 }}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<main className='flex-grow py-4'>
				<Outlet />
			</main>

			<footer className='container mx-auto px-4 sm:px-2 lg:px-0 py-4'>
				<Footer />
			</footer>
			<GoToTopButton />
		</section>
	);
};

export default HomeLayout;
