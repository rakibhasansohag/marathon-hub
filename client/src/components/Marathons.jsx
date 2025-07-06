import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import moment from 'moment';
import { Card, CardContent } from '@/components/ui/card';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Button } from './ui/button';

const Marathons = () => {
	const [marathons, setMarathons] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMarathons = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/marathons?limit=6`,
				);
				setMarathons(res.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching marathons:', error);
				setLoading(false);
			}
		};
		fetchMarathons();
	}, []);

	if (loading) {
		return (
			<div className='mt-20 section grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>
				{[...Array(6)].map((_, index) => (
					<Card key={index} className='overflow-hidden rounded-2xl border pt-0'>
						<div className='relative'>
							<div className='absolute top-2 left-2 h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse' />
							<div className='h-48 w-full bg-gray-200 dark:bg-gray-800 animate-pulse' />
						</div>
						<CardContent className='p-4 space-y-2'>
							<div className='h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse' />
							<div className='h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse' />
							<div className='h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse' />
							<div className='h-4 w-24 mt-3 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse' />
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	return (
		<section className='bg-white dark:bg-gray-900'>
			<div className='px-4 py-16 section '>
				<h2 className='text-3xl font-bold mb-6 text-center'>
					Featured Marathons
				</h2>
				<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>
					{marathons.map((item, index) => (
						<motion.div
							key={item._id}
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className='overflow-hidden rounded-2xl border hover:shadow-xl transition-shadow pt-0 gap-0'>
								<div className='relative'>
									<div className='absolute top-2 left-2 bg-primary text-white text-xs px-3 py-1 rounded-full z-10'>
										{item.category}
									</div>
									<img
										src={item.imageUrl}
										alt={item.title}
										className='w-full h-48 object-cover bg-accent'
									/>
								</div>
								<CardContent className='p-4 space-y-2'>
									<h3 className='text-xl font-semibold'>{item.title}</h3>
									<p className='text-sm text-muted-foreground'>
										📍 {item.location}
									</p>
									<p className='text-sm text-muted-foreground'>
										🗓 {moment(item.startRegDate).format('Do MMM YYYY')} -{' '}
										{moment(item.endRegDate).format('Do MMM YYYY')}
									</p>
									<Link
										to={`/marathons/${item._id}`}
										className='inline-block mt-3 text-sm font-medium text-primary hover:underline'
									>
										See Details →
									</Link>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				<div className='text-center mt-10'>
					<Button>
						<Link to='/marathons' className=''>
							See All Marathons →
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Marathons;
