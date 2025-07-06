import React from 'react';
import Hero from '@/components/Hero';
import Marathons from '@/components/Marathons';
import UpcomingMarathons from '@/components/UpcomingMarathons';
import TrainersSection from '@/components/TrainersSection';
import FAQSection from '@/components/FAQSection';
import { useStaticTitle } from '@/lib/utils';

function Home() {
	useStaticTitle();

	return (
		<section>
			<Hero />
			<Marathons />
			<UpcomingMarathons />
			<TrainersSection />
			<FAQSection />
		</section>
	);
}

export default Home;
