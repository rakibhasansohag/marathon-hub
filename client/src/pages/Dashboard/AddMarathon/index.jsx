import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Textarea } from '@/components/ui/textarea';
import { useStaticTitle } from '@/lib/utils';
import { useNavigate } from 'react-router';

const AddMarathon = () => {
	useStaticTitle();
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);
	const [startRegDate, setStartRegDate] = useState(new Date());
	const [endRegDate, setEndRegDate] = useState(new Date());
	const [marathonStartDate, setMarathonStartDate] = useState(new Date());
	const navigate = useNavigate();

	useEffect(() => {
		const form = formRef.current;
		const handleInput = () => setIsFormValid(form.checkValidity());
		form.addEventListener('input', handleInput);
		setIsFormValid(form.checkValidity());
		return () => form.removeEventListener('input', handleInput);
	}, []);

	const handleAddMarathon = (event) => {
		event.preventDefault();
		if (!isFormValid) {
			event.target.reportValidity();
			return;
		}

		setLoading(true);
		const formData = new FormData(event.target);
		const marathon = Object.fromEntries(formData.entries());
		marathon.userId = user?.uid;
		marathon.userName = user?.displayName;
		marathon.userEmail = user?.email;
		marathon.startRegDate = startRegDate;
		marathon.endRegDate = endRegDate;
		marathon.marathonStartDate = marathonStartDate;
		marathon.totalRegistration = 0;
		marathon.createdAt = new Date();

		axios
			.post(`${import.meta.env.VITE_BASE_URL}/marathons`, marathon)
			.then((response) => {
				if (response.data.insertedId) {
					toast.success('Marathon event added successfully');
					event.target.reset();
					setStartRegDate(null);
					setEndRegDate(null);
					setMarathonStartDate(null);
					setIsFormValid(false);
					navigate('/dashboard/my-marathons');
				}
			})
			.catch((error) => {
				toast.error('Failed to add marathon event');
				console.error(error);
			})
			.finally(() => setLoading(false));
	};

	return (
		<section className='py-6 w-full lg:pr-10 px-2'>
			<Card className=' w-full mx-auto bg-white dark:bg-gray-800 md:p-8 rounded-2xl shadow-lg'>
				<CardHeader>
					<CardTitle className='text-4xl font-bold text-center text-primary'>
						Add a Marathon Event
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-center mb-8 text-gray-600 dark:text-gray-300'>
						Unleash your passion for marathons and inspire fellow enthusiasts!
						Complete the form below to share your unique marathon event details.
					</p>
					<form
						ref={formRef}
						onSubmit={handleAddMarathon}
						className='grid grid-cols-1 md:grid-cols-2 gap-6'
					>
						{/* Marathon Title */}
						<div className='w-full flex gap-2 flex-col'>
							<Label htmlFor='title'>Marathon Title</Label>
							<Input
								id='title'
								name='title'
								required
								placeholder='Enter marathon title'
							/>
						</div>
						{/* Marathon Capacity */}
						<div className='w-full flex gap-2 flex-col'>
							<Label htmlFor='capacity'>Capacity</Label>
							<Input
								id='capacity'
								name='capacity'
								type='number'
								required
								min={1}
								max={10000}
								step={1}
								defaultValue={1}
							/>
						</div>

						<div className='md:col-span-2 grid md:grid-cols-3 gap-6'>
							{/* Start Registration Date */}
							<div className='w-full flex gap-2 flex-col'>
								<Label>Start Registration Date</Label>
								<DatePicker
									selected={startRegDate}
									onChange={(date) => setStartRegDate(date)}
									className='w-full p-2 !pl-8 border rounded'
									required
									minDate={new Date()}
									showIcon
									toggleCalendarOnIconClick
									isClearable
									placeholderText='Please select a date for registration start'
									closeOnScroll={true}
									dateFormat={'dd/MM/yyyy'}
								/>
							</div>

							{/* End Registration Date */}
							<div className='w-full flex gap-2 flex-col'>
								<Label>End Registration Date</Label>
								<DatePicker
									selected={endRegDate}
									onChange={(date) => setEndRegDate(date)}
									className='w-full p-2 !pl-8 border rounded'
									required
									minDate={new Date()}
									showIcon
									toggleCalendarOnIconClick
									isClearable
									placeholderText='Please select a date for registration start'
									closeOnScroll={true}
									dateFormat={'dd/MM/yyyy'}
								/>
							</div>

							{/* Marathon Start Date */}
							<div className='w-full flex gap-2 flex-col'>
								<Label>Marathon Start Date</Label>
								<DatePicker
									selected={marathonStartDate}
									onChange={(date) => setMarathonStartDate(date)}
									className='w-full p-2 !pl-8 border rounded'
									required
									minDate={new Date()}
									showIcon
									toggleCalendarOnIconClick
									isClearable
									placeholderText='Please select a date for registration start'
									closeOnScroll={true}
									dateFormat={'dd/MM/yyyy'}
								/>
							</div>
						</div>
						<div className='md:col-span-2 grid md:grid-cols-3 gap-6'>
							{/* Location */}
							<div className='w-full flex gap-2 flex-col'>
								<Label htmlFor='location'>Location</Label>
								<Input
									id='location'
									name='location'
									required
									placeholder='Enter location'
								/>
							</div>

							{/* Running Distance */}
							<div className='w-full flex gap-2 flex-col'>
								<Label htmlFor='distance'>Running Distance</Label>
								<Select name='distance' required>
									<SelectTrigger className={'w-full'}>
										<SelectValue placeholder='Select distance' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='3k'>3k</SelectItem>
										<SelectItem value='10k'>10k</SelectItem>
										<SelectItem value='25k'>25k</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Running Time */}
							<div className='w-full flex gap-2 flex-col'>
								<Label htmlFor='time'>Running Time</Label>
								<Select name='time' required>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select time' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='1h'>1h</SelectItem>
										<SelectItem value='2h'>2h</SelectItem>
										<SelectItem value='3h'>3h</SelectItem>
										<SelectItem value='5h'>5h</SelectItem>
										<SelectItem value='7h'>7h</SelectItem>
										<SelectItem value='10h'>10h</SelectItem>
										<SelectItem value='15h'>15h</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Description */}
						<div className='w-full flex gap-2 flex-col md:col-span-2'>
							<Label htmlFor='description'>Description</Label>
							<Textarea
								id='description'
								name='description'
								required
								rows={8}
								className='w-full p-2 border rounded'
								placeholder='Describe the marathon event...'
							></Textarea>
						</div>

						{/* Marathon Image */}
						<div className='w-full flex gap-2 flex-col'>
							<Label htmlFor='imageUrl'>Marathon Image URL</Label>
							<Input
								id='imageUrl'
								name='imageUrl'
								required
								placeholder='https://...'
							/>
						</div>
						{/* Marathon category */}
						<div className='w-full flex gap-2 flex-col'>
							<Label htmlFor='category'>Category</Label>
							<Select name='category' required>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select category' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='Beginner'>Beginner</SelectItem>
									<SelectItem value='Intermediate'>Intermediate</SelectItem>
									<SelectItem value='Advanced'>Advanced</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* User Info */}
						<div className='md:col-span-2 grid grid-cols-2 gap-4'>
							<div className='w-full flex gap-2 flex-col'>
								<Label>Your Name</Label>
								<Input
									type='text'
									value={user?.displayName || ''}
									readOnly
									className='bg-gray-100 dark:bg-gray-700'
								/>
							</div>
							<div className='w-full flex gap-2 flex-col'>
								<Label>Your Email</Label>
								<Input
									type='email'
									value={user?.email || ''}
									readOnly
									className='bg-gray-100 dark:bg-gray-700'
								/>
							</div>
						</div>

						{/* Submit Button */}
						<Button
							type='submit'
							disabled={!isFormValid || loading}
							className='md:col-span-2 mt-4 bg-primary text-white cursor-pointer'
						>
							{loading ? 'Adding Marathon...' : 'Add Marathon'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	);
};

export default AddMarathon;
