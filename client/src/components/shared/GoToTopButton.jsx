import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { FaChevronUp } from 'react-icons/fa';

const GoToTopButton = () => {
	const [visible, setVisible] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		setVisible(false);
	}, [location.pathname]);

	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<motion.button
			initial={{ opacity: 0, scale: 0.5 }}
			animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
			transition={{ duration: 0.3 }}
			onClick={handleClick}
			className='fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-white shadow-lg hover:scale-110 focus:outline-none cursor-pointer'
			aria-label='Scroll to top'
		>
			<FaChevronUp className='w-6 h-6' />
		</motion.button>
	);
};

export default GoToTopButton;
