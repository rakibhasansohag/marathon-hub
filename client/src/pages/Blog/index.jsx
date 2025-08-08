import { Button } from '@/components/ui/button';
import { ChevronLeft, CalendarDays, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Section = ({ title, children }) => (
	<div className='border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0 last:pb-0'>
		<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
			{title}
		</h2>
		<div className='text-gray-700 dark:text-gray-300'>{children}</div>
	</div>
);

const BlogCard = ({ title, date, excerpt, readTime, image }) => (
	<div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
		<div>
			<img src={image} alt={title} className='w-full h-48 object-cover' />
		</div>
		<div className='p-6'>
			<div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2'>
				<CalendarDays className='h-4 w-4 mr-1' />
				{date}
				<span className='mx-2'>•</span>
				<Clock className='h-4 w-4 mr-1' />
				{readTime} read
			</div>
			<h3 className='text-xl font-bold mb-2'>{title}</h3>
			<p className='text-gray-600 dark:text-gray-300 mb-4'>{excerpt}</p>
			<Button variant='outline'>Read More</Button>
		</div>
	</div>
);

const BlogPost = ({ title, date, content }) => (
	<article className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
		<div className='p-8'>
			<div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4'>
				<CalendarDays className='h-4 w-4 mr-1' />
				{date}
			</div>
			<h1 className='text-3xl font-bold mb-6'>{title}</h1>
			<div className='prose dark:prose-invert max-w-none'>{content}</div>
		</div>
	</article>
);

// Static blog data
const featuredPosts = [
	{
		id: 1,
		title: '5 Essential Training Tips for Your First Marathon',
		date: 'May 15, 2023',
		excerpt:
			'Preparing for your first marathon? Discover the key training strategies to cross the finish line strong.',
		readTime: '5 min',
		image:
			'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
	},
	{
		id: 2,
		title: 'Nutrition Guide for Marathon Runners',
		date: 'June 2, 2023',
		excerpt:
			'What to eat before, during, and after your race to optimize performance and recovery.ANd more',
		readTime: '7 min',
		image:
			'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
	},
	{
		id: 3,
		title: 'Choosing the Right Running Shoes',
		date: 'June 18, 2023',
		excerpt:
			'A comprehensive guide to finding the perfect pair of shoes for your running style and foot type.',
		readTime: '6 min',
		image:
			'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
	},
];

const fullBlogPosts = [
	{
		id: 1,
		title: '5 Essential Training Tips for Your First Marathon',
		date: 'May 15, 2023',
		content: (
			<>
				<Section title='Start With a Plan'>
					<p>
						Training for a marathon isn't something you can wing. Whether you're
						following a popular 16-week program or working with a coach, having
						a structured plan will help you build endurance safely and
						effectively.
					</p>
					<ul className='list-disc pl-6 space-y-2 mt-2'>
						<li>Begin with a base of 15-20 miles per week</li>
						<li>Increase weekly mileage by no more than 10%</li>
						<li>Include one long run per week</li>
						<li>Schedule regular rest days</li>
					</ul>
				</Section>

				<Section title='Mix Up Your Training'>
					<p>
						Variety isn't just the spice of life—it's key to marathon success.
						Incorporate these elements into your training:
					</p>
					<ul className='list-disc pl-6 space-y-2 mt-2'>
						<li>
							<strong>Long runs:</strong> Build endurance gradually
						</li>
						<li>
							<strong>Speed work:</strong> Improve running economy
						</li>
						<li>
							<strong>Hill repeats:</strong> Build strength
						</li>
						<li>
							<strong>Recovery runs:</strong> Maintain mileage without strain
						</li>
					</ul>
				</Section>

				<Section title='Listen to Your Body'>
					<p>
						Marathon training is demanding, and pushing through pain can lead to
						injury. Pay attention to these warning signs:
					</p>
					<ul className='list-disc pl-6 space-y-2 mt-2'>
						<li>Persistent joint pain</li>
						<li>Sharp pains (rather than general soreness)</li>
						<li>Fatigue that doesn't improve with rest</li>
						<li>Significant changes in resting heart rate</li>
					</ul>
				</Section>

				<Section title='Practice Race Day'>
					<p>
						Your long runs aren't just about building mileage—they're dress
						rehearsals for race day. Test out:
					</p>
					<ul className='list-disc pl-6 space-y-2 mt-2'>
						<li>Your race day outfit (avoid new clothes on race day)</li>
						<li>Nutrition and hydration strategies</li>
						<li>Pacing strategies</li>
						<li>Pre-run meal timing</li>
					</ul>
				</Section>

				<Section title='Trust the Taper'>
					<p>
						In the final 2-3 weeks before your marathon, you'll reduce mileage
						to allow your body to recover fully. Many runners feel anxious
						during this period, but trust the process—you've done the work!
					</p>
				</Section>
			</>
		),
	},
];

export default function BlogPage() {
	const navigate = useNavigate();
	const [viewingPost, setViewingPost] = useState(null);

	return (
		<div className='w-full section '>
			<div className='w-full mx-auto'>
				<div className='mb-8 flex justify-between flex-wrap gap-2'>
					<Button
						variant='ghost'
						onClick={() => (viewingPost ? setViewingPost(null) : navigate(-1))}
						className='flex items-center gap-1'
					>
						<ChevronLeft className='h-4 w-4' />
						{viewingPost ? 'Back to Blog' : 'Back'}
					</Button>
					<div className='text-center text-sm text-gray-500 mb-4'>
						This is a static page and does not update
						automatically/dynamically.And those button to go Read more doesn't
						work either.
					</div>
				</div>

				{viewingPost ? (
					<BlogPost
						title={viewingPost.title}
						date={viewingPost.date}
						content={viewingPost.content}
					/>
				) : (
					<>
						<div className='text-center mb-12'>
							<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
								MarathonHub Blog
							</h1>
							<p className='mt-3 text-gray-600 dark:text-gray-400'>
								Training tips, race guides, and inspiration for runners of all
								levels
							</p>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{featuredPosts.map((post) => (
								<BlogCard
									key={post.id}
									title={post.title}
									date={post.date}
									excerpt={post.excerpt}
									readTime={post.readTime}
									image={post.image}
									onClick={() =>
										setViewingPost(fullBlogPosts.find((p) => p.id === post.id))
									}
								/>
							))}
						</div>

						<div className='mt-16'>
							<Section title='Popular Topics'>
								<div className='flex flex-wrap gap-3'>
									{[
										'Beginner Tips',
										'Nutrition',
										'Injury Prevention',
										'Race Day',
										'Gear Reviews',
										'Training Plans',
									].map((topic) => (
										<Button variant='outline' key={topic}>
											{topic}
										</Button>
									))}
								</div>
							</Section>

							<Section title='Upcoming Race Guides'>
								<div className='space-y-4'>
									{[
										{
											name: 'Boston Marathon',
											date: 'April 15, 2024',
											location: 'Boston, MA',
										},
										{
											name: 'New York City Marathon',
											date: 'November 3, 2024',
											location: 'New York, NY',
										},
										{
											name: 'Chicago Marathon',
											date: 'October 8, 2024',
											location: 'Chicago, IL',
										},
									].map((race) => (
										<div
											key={race.name}
											className='flex items-start p-4 border rounded-lg dark:border-gray-700'
										>
											<div className='flex-1'>
												<h3 className='font-semibold'>{race.name}</h3>
												<div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1'>
													<CalendarDays className='h-4 w-4 mr-1' />
													{race.date}
													<span className='mx-2'>•</span>
													<MapPin className='h-4 w-4 mr-1' />
													{race.location}
												</div>
											</div>
											<Button variant='link' className='text-primary'>
												View Guide
											</Button>
										</div>
									))}
								</div>
							</Section>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
