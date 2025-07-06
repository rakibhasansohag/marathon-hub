// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

export default function AbsoluteLoader() {
	return (
		<div className='flex items-center justify-center h-full w-full  absolute z-50 top-0 left-0 transform -translate-x-0 -translate-y-0'>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: [1, 1.2, 1] }}
				transition={{
					duration: 1.2,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
				className='relative h-16 w-16 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-lime-400 shadow-lg shadow-green-400/30'
			>
				{/* Glow ring effect */}
				<motion.div
					initial={{ scale: 1 }}
					animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
					transition={{
						duration: 1.2,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
					className='absolute inset-0 rounded-full bg-primary blur-2xl opacity-60'
				/>
			</motion.div>
		</div>
	);
}
