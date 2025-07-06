import TrainerCard from './shared/TrainerCard';
import trainer1 from '@/assets/home/trainer-1.jpg';
import trainer2 from '@/assets/home/trainer-2.jpg';
import trainer3 from '@/assets/home/trainer-3.jpg';
import trainer4 from '@/assets/home/trainer-4.jpg';

const trainers = [
	{
		name: 'EVAN STONE',
		role: 'Lead Trainer',
		img: trainer1,
	},
	{
		name: 'CHLOE BLAKE',
		role: 'Performance Coach',
		img: trainer2,
	},
	{
		name: 'NOAH KING',
		role: 'Trail Running Expert',
		img: trainer3,
	},
	{
		name: 'EMMA SNOW',
		role: 'Wellness Trainer',
		img: trainer4,
	},
];

const TrainersSection = () => {
	return (
		<section className='py-16 bg-base-200'>
			<div className='max-w-7xl mx-auto px-4 text-center md:text-left'>
				<h2 className='text-xl font-semibold text-primary uppercase mb-2'>
					|| Marathon Hub Trainers ||
				</h2>
				<div className='flex justify-between items-end gap-4 sm:gap-10 flex-wrap mb-10'>
					<h3 className='text-3xl md:text-4xl font-black italic leading-tight text-gray-800 dark:text-white'>
						PROFESSIONAL TRAINERS <br />
						FOR <span className='text-primary'>EVERY RUNNER.</span>
					</h3>
					<p className='max-w-2xl text-gray-600 text-xl sm:text-2xl dark:text-white'>
						At Marathon Hub, we believe in personalized training for every
						runner. Our expert trainers are here to provide the guidance and
						motivation you need.
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
					{trainers.map((t, i) => (
						<TrainerCard key={i} {...t} />
					))}
				</div>
			</div>
		</section>
	);
};

export default TrainersSection;
