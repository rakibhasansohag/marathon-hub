import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

const GoBackButton = () => {
	const navigate = useNavigate();

	const buttonVariants = {
		initial: { opacity: 0, y: 20, scale: 0.9 },
		animate: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.8, ease: 'easeOut' },
		},
		hover: { scale: 1.15, transition: { duration: 0.2 } },
		tap: { scale: 0.95, transition: { duration: 0.1 } },
	};

	return (
		<motion.div
			variants={buttonVariants}
			initial='initial'
			animate='animate'
			whileHover='hover'
			whileTap='tap'
			className='inline-block'
		>
			<Button
				variant='outline'
				className='flex items-center gap-2 bg-gray-800 text-white border-teal-500 hover:bg-teal-500 hover:text-white'
				onClick={() => navigate(-1)}
			>
				<ArrowLeft className='h-4 w-4' />
				Go Back
			</Button>
		</motion.div>
	);
};

export default GoBackButton;
