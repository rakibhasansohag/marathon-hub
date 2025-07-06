import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const ProgramsAndMarathons = () => {
	const [activeTab, setActiveTab] = useState('programs');

	// Training programs data
	const trainingPrograms = [
		{
			id: 1,
			title: 'Starter Sprint Program',
			tagline:
				'Kickstart your running journey with steady progress, light intensity, and daily motivation designed just for new runners.',
			features: [
				'Weekly Running Schedule',
				'Personalized Training Plan',
				'Nutrition for Runners',
				'Group Coaching Access',
				'Progress Tracking Tools',
				'Motivation From Community',
			],
			price: '$49/month',
			duration: '8 weeks',
			intensity: 'Beginner',
			communitySize: '500+ runners',
		},
		{
			id: 2,
			title: 'Endurance Builder Program',
			tagline:
				'Build stamina and strength through progressive long runs, recovery tips, and consistent pace improvements over time.',
			features: [
				'Long Run Coaching',
				'Virtual Accountability Group',
				'Technique Video Tutorials',
				'Strength Training Integration',
				'Recovery Day Plans',
				'Mileage Goal Planning',
			],
			price: '$69/month',
			duration: '12 weeks',
			intensity: 'Intermediate',
			communitySize: '300+ runners',
		},
		{
			id: 3,
			title: 'Elite Performance Program',
			tagline:
				'For competitive runners seeking to maximize performance through advanced training techniques and personalized coaching.',
			features: [
				'1-on-1 Coaching Sessions',
				'Race Strategy Development',
				'Biomechanical Analysis',
				'Customized Nutrition Plan',
				'Mental Toughness Training',
				'Competition Preparation',
			],
			price: '$129/month',
			duration: '16 weeks',
			intensity: 'Advanced',
			communitySize: '150+ runners',
		},
	];

	// Upcoming marathons data
	const upcomingMarathons = [
		{
			id: 1,
			title: 'City Skyline Marathon',

			location: 'New York City, NY',
			distance: '42.2K',
			registrationStatus: 'Open',
			participants: 12000,
			elevation: '350m',
			organizer: 'NYC Runners Club',
			featured: true,
		},
		{
			id: 2,
			title: 'Coastal Challenge',

			location: 'San Diego, CA',
			distance: '21.1K',
			registrationStatus: 'Open',
			participants: 8000,
			elevation: '180m',
			organizer: 'California Running Association',
			featured: true,
		},
		{
			id: 3,
			title: 'Mountain Trail Run',

			location: 'Denver, CO',
			distance: '50K',
			registrationStatus: 'Opening Soon',
			participants: 3000,
			elevation: '1200m',
			organizer: 'Trail Runners Collective',
			featured: false,
		},
		{
			id: 4,
			title: 'Autumn Classic',

			location: 'Boston, MA',
			distance: '42.2K',
			registrationStatus: 'Limited Spots',
			participants: 10000,
			elevation: '250m',
			organizer: 'Boston Marathon Foundation',
			featured: true,
		},
		{
			id: 5,
			title: 'Lakeside Half Marathon',

			location: 'Chicago, IL',
			distance: '21.1K',
			registrationStatus: 'Open',
			participants: 7500,
			elevation: '120m',
			organizer: 'Midwest Running Group',
			featured: false,
		},
		{
			id: 6,
			title: 'Winter Wonder Run',

			location: 'Minneapolis, MN',
			distance: '10K',
			registrationStatus: 'Early Bird',
			participants: 5000,
			elevation: '80m',
			organizer: 'Northern Runners Alliance',
			featured: true,
		},
	];

	// Format date for display
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<section className='py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-12'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4'
					>
						Elevate Your Running Journey
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'
					>
						Discover our specialized training programs and upcoming marathons to
						achieve your running goals
					</motion.p>
				</div>

				{/* Tab Navigation */}
				<div className='flex justify-center mb-10'>
					<div className='inline-flex bg-gray-100 dark:bg-gray-800 rounded-full p-1'>
						<Button
							variant={activeTab === 'programs' ? 'default' : 'ghost'}
							className={`rounded-full ${
								activeTab === 'programs' ? 'shadow-md' : ''
							}`}
							onClick={() => setActiveTab('programs')}
						>
							Training Programs
						</Button>
						<Button
							variant={activeTab === 'marathons' ? 'default' : 'ghost'}
							className={`rounded-full ${
								activeTab === 'marathons' ? 'shadow-md' : ''
							}`}
							onClick={() => setActiveTab('marathons')}
						>
							Upcoming Marathons
						</Button>
					</div>
				</div>

				{/* Content Area */}
				{activeTab === 'programs' ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
					>
						{trainingPrograms.map((program) => (
							<motion.div
								key={program.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
								className='h-full'
							>
								<Card className='h-full pt-6 flex flex-col border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow'>
									<CardHeader>
										<CardTitle className='text-2xl font-bold'>
											{program.title}
										</CardTitle>
										<p className='text-gray-600 dark:text-gray-300 mt-2'>
											{program.tagline}
										</p>
									</CardHeader>

									<CardContent className='flex-grow'>
										<div className='grid grid-cols-2 gap-3 mt-4'>
											{program.features.map((feature, idx) => (
												<div key={idx} className='flex items-start'>
													<div className='flex-shrink-0 h-5 w-5 text-primary mt-0.5'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															stroke='currentColor'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M5 13l4 4L19 7'
															/>
														</svg>
													</div>
													<p className='ml-2 text-sm'>{feature}</p>
												</div>
											))}
										</div>

										<div className='mt-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-4 text-center '>
											<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-3'>
												<p className='text-sm text-gray-500'>Duration</p>
												<p className='font-medium'>{program.duration}</p>
											</div>
											<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-3'>
												<p className='text-sm text-gray-500'>Intensity</p>
												<p className='font-medium'>{program.intensity}</p>
											</div>
											<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-3'>
												<p className='text-sm text-gray-500'>Community</p>
												<p className='font-medium'>{program.communitySize}</p>
											</div>
										</div>
									</CardContent>

									<CardFooter className='mt-auto flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4'>
										<div className='text-xl font-bold'>{program.price}</div>
										<Button className='bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'>
											Join Program
										</Button>
									</CardFooter>
								</Card>
							</motion.div>
						))}
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
					>
						{upcomingMarathons.map((marathon) => (
							<motion.div
								key={marathon.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
								className='relative'
							>
								<Card
									className={`h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow pt-0 ${
										marathon.featured ? 'ring-2 ring-primary' : ''
									}`}
								>
									{marathon.featured && (
										<div className='absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full'>
											Featured
										</div>
									)}

									<div className='bg-gradient-to-r from-blue-500 to-purple-500 h-32 flex items-center justify-center'>
										<h3 className='text-2xl font-bold text-white text-center px-4'>
											{marathon.title}
										</h3>
									</div>

									<CardContent className='pt-6'>
										<div className='flex justify-between items-center mb-4'>
											<div className='bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm'>
												{marathon.distance}
											</div>
											<div
												className={`px-3 py-1 rounded-full text-sm ${
													marathon.registrationStatus === 'Open'
														? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
														: marathon.registrationStatus === 'Limited Spots'
														? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
														: marathon.registrationStatus === 'Early Bird'
														? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
														: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
												}`}
											>
												{marathon.registrationStatus}
											</div>
										</div>

										<div className='space-y-3'>
											<div className='flex items-center'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-5 w-5 text-primary mr-2'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
													/>
												</svg>
												<span>
													{formatDate(
														new Date(
															Date.now() +
																Math.floor(Math.random() * 10 + 1) *
																	24 *
																	60 *
																	60 *
																	1000,
														),
													)}
												</span>
											</div>

											<div className='flex items-center'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-5 w-5 text-primary mr-2'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
													/>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
													/>
												</svg>
												<span>{marathon.location}</span>
											</div>

											<div className='flex items-center'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-5 w-5 text-primary mr-2'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
													/>
												</svg>
												<span>
													{marathon.participants.toLocaleString()} participants
												</span>
											</div>

											<div className='flex items-center'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-5 w-5 text-primary mr-2'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11'
													/>
												</svg>
												<span>{marathon.elevation} elevation gain</span>
											</div>
										</div>

										<div className='mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-500'>
											Organized by: {marathon.organizer}
										</div>
									</CardContent>

									<CardFooter className='mt-auto'>
										<Button className='w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'>
											View Details
										</Button>
									</CardFooter>
								</Card>
							</motion.div>
						))}
					</motion.div>
				)}

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mt-16'
				>
					<Button
						variant='outline'
						className='border-2 border-primary text-primary hover:bg-primary hover:text-white'
					>
						View All{' '}
						{activeTab === 'programs'
							? 'Training Programs'
							: 'Upcoming Marathons'}
					</Button>
				</motion.div>
			</div>
		</section>
	);
};

export default ProgramsAndMarathons;
