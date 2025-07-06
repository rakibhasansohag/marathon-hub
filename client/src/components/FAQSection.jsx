// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Lottie from 'lottie-react';
import runnerAnimation from '@/assets/home/runner.json';

const FAQSection = () => {
	const faqs = [
		{
			question: 'How can I join the Endurance Running Club?',
			answer:
				'To join the Endurance Running Club, visit our registration page, sign up with your details, and select your membership plan. Contact support if you need assistance!',
		},
		{
			question: 'Do I need to be experienced already?',
			answer:
				'No prior experience is required! Our programs cater to all levels, from beginners to advanced runners, with tailored training plans.',
		},
		{
			question: 'Are there any virtual training options?',
			answer:
				'Yes, we offer virtual training sessions via Zoom, including live coaching and recorded workouts accessible through our app.',
		},
		{
			question: 'What makes Endurance different from others?',
			answer:
				'Endurance stands out with personalized coaching, a supportive community, and advanced tracking tools to enhance your running journey.',
		},
		{
			question: 'How can I stay updated with news or events?',
			answer:
				'Subscribe to our newsletter or follow us on social media for the latest updates on events, tips, and community news.',
		},
	];

	return (
		<section className='py-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex items-center'>
			<div className='container mx-auto px-4 flex flex-col md:flex-row items-center gap-12'>
				{/* Lottie Animation on the Left */}
				<motion.div
					className='w-full md:w-1/2'
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
				>
					<Lottie
						animationData={runnerAnimation}
						loop={true}
						className='w-full h-auto'
					/>
				</motion.div>

				{/* FAQ Content on the Right */}
				<motion.div
					className='w-full md:w-1/2'
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<div className='text-center md:text-left mb-8'>
						<span className='text-primary text-xl font-semibold mb-2 inline-block'>
							|| COMMON QUESTIONS ||
						</span>
						<h2 className='text-5xl font-bold mb-4'>
							<span className='text-gray-200'>EVERYTHING YOU</span>
							<br />
							<span className='text-primary'>NEED TO KNOW</span>.
						</h2>
					</div>
					<Accordion type='single' collapsible className='w-full'>
						{faqs.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className='mb-2'
							>
								<AccordionTrigger className='text-left text-gray-300 hover:text-white bg-gray-800/50 rounded-lg p-4'>
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className='text-gray-400 bg-gray-700/50 rounded-b-lg p-4'>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</motion.div>
			</div>
		</section>
	);
};

export default FAQSection;
