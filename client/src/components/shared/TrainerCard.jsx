const TrainerCard = ({ name, role, img }) => {
	return (
		<div className='relative overflow-hidden rounded-xl group w-full h-96'>
			<img
				src={img}
				alt={name}
				className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
			/>

			<div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-lg px-4 py-2 text-center shadow-md w-[85%]'>
				<h3 className='text-base font-bold italic group-hover:text-orange-600 dark:text-black'>
					{name}
				</h3>
				<p className='text-sm text-gray-600'>{role}</p>
			</div>
		</div>
	);
};

export default TrainerCard;
