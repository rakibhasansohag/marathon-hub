import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Parallax } from 'swiper/modules';
import { useEffect, useState } from 'react';
import 'swiper/css';
import slide1 from '@/assets/home/slider-1.jpg';
import slide2 from '@/assets/home/slider-2.jpg';
import slide3 from '@/assets/home/slider-3.jpg';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// TODO : AFter the assingment we will remove the hero slider and added a hero section with mini slider on the right side of the  bottom page and left side some content no slider changes will be added on background image

const Hero = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const eventTemplates = [
			{
				title: 'Run the Skyline Sprint',
				location: 'Dhaka City Center',
				description: 'Challenge the heights and conquer the city skyline!',
				image: slide1,
			},
			{
				title: 'Twilight Trail Marathon',
				location: 'Sundarbans Edge Park',
				description: 'Race through golden trails under a twilight sky.',
				image: slide2,
			},
			{
				title: 'Marathon of Legends',
				location: 'Cox’s Bazar Coastline',
				description: 'A legendary run along the world’s longest beach.',
				image: slide3,
			},
		];

		const withDates = eventTemplates.map((event) => ({
			...event,
			date: new Date(
				Date.now() + Math.floor(Math.random() * 30 + 1) * 86400000,
			),
		}));

		setEvents(withDates);
	}, []);

	return (
		<section className='relative w-full h-[90vh]'>
			<Swiper
				modules={[Autoplay, Parallax]}
				autoplay={{ delay: 4500, disableOnInteraction: false }}
				loop={true}
				parallax={true}
				grabCursor={true}
				speed={1000}
				slidesPerView={1}
				className='h-full w-full  overflow-hidden shadow-2xl'
			>
				{events.map((event, index) => (
					<SwiperSlide key={index}>
						<SlideContent event={event} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Hero;

const SlideContent = ({ event }) => {
	return (
		<div
			className='relative h-full w-full bg-cover bg-center'
			style={{ backgroundImage: `url(${event.image})` }}
		>
			<div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent' />
			<div className='relative h-full flex items-center px-4 md:px-20'>
				<Card
					className={cn(
						'bg-background/80 dark:bg-background/90 backdrop-blur-sm text-foreground max-w-2xl sm:p-8 rounded-2xl shadow-xl pt-8',
					)}
				>
					<CardContent className='flex flex-col gap-4'>
						<h2
							data-swiper-parallax='-300'
							data-swiper-parallax-duration='1500'
							className='text-3xl md:text-5xl font-bold tracking-tight'
						>
							{event.title}
						</h2>
						<p
							data-swiper-parallax='-300'
							data-swiper-parallax-duration='1500'
							className='text-lg text-muted-foreground'
						>
							📍 {event.location}{' '}
						</p>
						<p
							className='text-base font-medium'
							data-swiper-parallax='-300'
							data-swiper-parallax-duration='1500'
						>
							📅{' '}
							{event.date.toLocaleDateString('en-US', {
								weekday: 'short',
								month: 'long',
								day: 'numeric',
							})}
						</p>
						<p
							data-swiper-parallax='-300'
							data-swiper-parallax-duration='1500'
							className='italic text-sm md:text-base'
						>
							{event.description}
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
