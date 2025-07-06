import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';

import { Button } from '@/components/ui/button';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from '@/components/ui/dialog';
import RegistrationForm from './RegistrationForm';

import {
	daySeconds,
	getTimeDays,
	getTimeHours,
	getTimeMinutes,
	getTimeSeconds,
	hourSeconds,
	minuteSeconds,
	timerProps,
} from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import GoBackButton from '@/components/shared/GoBackButton';
import GlobalLoader from '../../components/shared/GlobalLoader';


export default function MarathonDetailsPage() {
	const { id } = useParams();
	const { user, loading: authLoading } = useContext(AuthContext);

	const [marathon, setMarathon] = useState(null);
	const [registered, setRegistered] = useState(false);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (marathon && user?.uid) {
			checkRegistration();
		}
	}, [marathon, user?.uid]);

	useEffect(() => {
		fetchData();
	}, [id]);

	const fetchData = async () => {
		try {
			setLoading(true);
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/marathons/${id}`,
			);
			if (res.data && res.data._id) {
				setMarathon(res.data);
			} else {
				throw new Error('Invalid marathon data');
			}
		} catch (err) {
			toast.error('Could not load marathon');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const checkRegistration = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/registration/check`,
				{
					params: {
						uid: user?.uid,
						marathonId: id,
						email: user?.email || null,
					},
				},
			);
			setRegistered(res?.data?.registered);
		} catch (err) {
			console.error('Check registration error:', err);
		}
	};

	// to get the title name of the page

	if (loading || authLoading) return <GlobalLoader />;

	if (!marathon)
		return (
			<div className=' text-center py-10 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-blue-950 rounded-lg shadow-lg p-6'>
				<h2 className='text-4xl font-extrabold text-red-600 mb-4 animate-pulse'>
					Marathon Not Found
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
					Oops! The marathon you’re looking for doesn’t exist or may have been
					removed.
				</p>
				<ul className='text-left max-w-md mx-auto space-y-2 text-gray-600 dark:text-gray-400'>
					<li className='flex items-center'>
						<svg
							className='w-5 h-5 mr-2 text-green-500'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M5 13l4 4L19 7'
							/>
						</svg>
						Check the marathon ID or try a different event.
					</li>
					<li className='flex items-center'>
						<svg
							className='w-5 h-5 mr-2 text-green-500'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M5 13l4 4L19 7'
							/>
						</svg>
						Explore our full list of marathons on the homepage.
					</li>
					<li className='flex items-center'>
						<svg
							className='w-5 h-5 mr-2 text-green-500'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M5 13l4 4L19 7'
							/>
						</svg>
						Contact support if you think this is a mistake.
					</li>
				</ul>
				<a
					href='/marathons'
					className='mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300'
				>
					Back to Marathon List
				</a>
			</div>
		);

	const now = new Date();
	const regStart = new Date(marathon.startRegDate);
	const regEnd = new Date(marathon.endRegDate);
	const isOpen = now >= regStart && now <= regEnd;

	const remainingTime = Math.max(
		0,
		(regStart.getTime() - now.getTime()) / 1000,
	);
	const days = Math.ceil(remainingTime / daySeconds);
	const daysDuration = days * daySeconds;

	return (
		<section className='bg-gray-100 dark:bg-gray-900'>
			<div className='section py-8 max-w-3xl mx-auto space-y-6'>
				<GoBackButton />
				<img
					src={
						marathon.imageUrl ||
						'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fimage-not-found&psig=AOvVaw3sFGIEUA5f1TLMiqUpSZjw&ust=1749736582875000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiv-vDC6Y0DFQAAAAAdAAAAABAL'
					}
					className='rounded-xl w-full h-80 object-cover bg-gray-400 dark:bg-gray-800 '
					alt={marathon.title}
				/>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<Card className={'pt-6'}>
						<CardContent className={'space-y-2'}>
							<h1 className='text-3xl font-bold'>{marathon.title}</h1>
							<p className='max-w-2xl'>{marathon.description}</p>
							<p>
								<strong>Location:</strong> {marathon.location}
							</p>
							<p>
								<strong>Registration Date:</strong>{' '}
								{moment(regStart).format('LLL')} -{' '}
								{moment(regEnd).format('LLL')}
							</p>
							<p>
								<strong>Total Registered:</strong> {marathon.totalRegistration}
							</p>
						</CardContent>
					</Card>
					<Card></Card>
				</div>

				{/* Countdown if not open */}
				{!registered && (
					<>
						{now < regStart && (
							<div className='flex flex-col flex-wrap justify-center items-center gap-4 my-8'>
								<div className='mb-4'>
									<h3 className=' text-2xl md:text-6xl font-bold text-primary uppercase'>
										Registration starts in
									</h3>
								</div>
								<div className='flex flex-wrap justify-center items-center gap-4 my-4'>
									<CountdownCircleTimer
										{...timerProps}
										colors='#7E2E84'
										duration={daysDuration}
										initialRemainingTime={remainingTime}
									>
										{({ elapsedTime }) => (
											<span>
												{renderTime(
													'days',
													getTimeDays(daysDuration - elapsedTime),
												)}
											</span>
										)}
									</CountdownCircleTimer>

									<CountdownCircleTimer
										{...timerProps}
										colors='#D14081'
										duration={daySeconds}
										initialRemainingTime={remainingTime % daySeconds}
										onComplete={(totalElapsedTime) => ({
											shouldRepeat:
												remainingTime - totalElapsedTime > hourSeconds,
										})}
									>
										{({ elapsedTime }) => (
											<span>
												{renderTime(
													'hours',
													getTimeHours(daySeconds - elapsedTime),
												)}
											</span>
										)}
									</CountdownCircleTimer>

									<CountdownCircleTimer
										{...timerProps}
										colors='#EF798A'
										duration={hourSeconds}
										initialRemainingTime={remainingTime % hourSeconds}
										onComplete={(totalElapsedTime) => ({
											shouldRepeat:
												remainingTime - totalElapsedTime > minuteSeconds,
										})}
									>
										{({ elapsedTime }) => (
											<span>
												{renderTime(
													'minutes',
													getTimeMinutes(hourSeconds - elapsedTime),
												)}
											</span>
										)}
									</CountdownCircleTimer>

									<CountdownCircleTimer
										{...timerProps}
										colors='#218380'
										duration={minuteSeconds}
										initialRemainingTime={remainingTime % minuteSeconds}
										onComplete={(totalElapsedTime) => ({
											shouldRepeat: remainingTime - totalElapsedTime > 0,
										})}
									>
										{({ elapsedTime }) => (
											<span>
												{renderTime('seconds', getTimeSeconds(elapsedTime))}
											</span>
										)}
									</CountdownCircleTimer>
								</div>
							</div>
						)}
						{/* Registration Ended */}
						{now > regEnd && (
							<p className=' my-10 text-2xl md:text-6xl font-bold text-red-600 uppercase text-center'>
								Registration is closed
							</p>
						)}
					</>
				)}

				{/* Register Button or status */}
				{registered ? (
					<p className='text-green-600 font-semibold'>
						You are already registered.
					</p>
				) : isOpen ? (
					<Dialog open={modalOpen} onOpenChange={setModalOpen}>
						<DialogTrigger asChild>
							<Button className='w-full'>Register</Button>
						</DialogTrigger>
						<DialogContent
							description='Register for the marathon'
							className={
								'!max-w-2xl bg-gray-800 text-white border-teal-500 !overflow-y-auto !max-h-[80vh] p-6 custom-scrollbar'
							}
						>
							<DialogTitle className='text-center text-2xl text-primary capitalize'>
								Register for {marathon.title}
							</DialogTitle>
							<RegistrationForm
								marathon={marathon}
								user={user}
								onClose={() => setModalOpen(false)}
								onRegistered={() => setRegistered(true)}
							/>
						</DialogContent>
					</Dialog>
				) : (
					<></>
				)}
			</div>
		</section>
	);
}

export const renderTime = (dimension, time) => {
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='text-3xl font-bold'>{time}</div>
			<div className='text-sm opacity-80'>{dimension}</div>
		</div>
	);
};
