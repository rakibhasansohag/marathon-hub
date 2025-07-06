import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import useAxiosSecure from '@/lib/useAxiosSecure';

import { toast } from 'react-toastify';

function UpdateMarathonModal({ open, data, onClose, onSuccess }) {
	const axiosSecure = useAxiosSecure();
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		title: '',
		capacity: '',
		location: '',
		imageUrl: '',
		description: '',
		category: '',
		distance: '',
		time: '',
	});

	const [startRegDate, setStartRegDate] = useState(null);
	const [endRegDate, setEndRegDate] = useState(null);
	const [marathonStartDate, setMarathonStartDate] = useState(null);

	useEffect(() => {
		if (data) {
			setForm({
				title: data.title,
				capacity: data.capacity,
				location: data.location,
				imageUrl: data.imageUrl,
				description: data.description,
				category: data.category,
				distance: data.distance,
				time: data.time,
			});
			setStartRegDate(new Date(data.startRegDate));
			setEndRegDate(new Date(data.endRegDate));
			setMarathonStartDate(new Date(data.marathonStartDate));
		}
	}, [data]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleUpdate = async () => {
		setLoading(true);
		try {
			const updated = {
				...form,
				startRegDate,
				endRegDate,
				marathonStartDate,
			};

			const res = await axiosSecure.put(`/marathons/${data._id}`, updated);
			if (res.data.modifiedCount) {
				onSuccess({ ...updated, _id: data._id });
				toast.success('Marathon updated successfully');
				setTimeout(() => {
					onClose();
				}, 300);
			}
		} catch (err) {
			console.error('Update failed:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className={`!max-w-3xl overflow-y-auto max-h-[90vh] custom-scrollbar transition-all duration-300 ease-in-out transform ${
					open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
				}`}
			>
				<DialogTitle>Update Marathon</DialogTitle>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<Label>Title</Label>
						<Input
							name='title'
							value={form.title}
							onChange={handleChange}
							readOnly
						/>
					</div>
					<div>
						<Label>Capacity</Label>
						<Input
							name='capacity'
							value={form.capacity}
							onChange={handleChange}
						/>
					</div>
					<div>
						<Label>Location</Label>
						<Input
							name='location'
							value={form.location}
							onChange={handleChange}
						/>
					</div>
					<div>
						<Label>Image URL</Label>
						<Input
							name='imageUrl'
							value={form.imageUrl}
							onChange={handleChange}
						/>
					</div>
					<div>
						<Label>Distance</Label>
						<Select
							value={form.distance}
							onValueChange={(val) => setForm({ ...form, distance: val })}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Select distance' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='3k'>3k</SelectItem>
								<SelectItem value='10k'>10k</SelectItem>
								<SelectItem value='25k'>25k</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<Label>Time</Label>
						<Select
							value={form.time}
							onValueChange={(val) => setForm({ ...form, time: val })}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Select time' />
							</SelectTrigger>
							<SelectContent>
								{['1h', '2h', '3h', '5h', '7h', '10h', '15h'].map((t) => (
									<SelectItem key={t} value={t}>
										{t}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div>
						<Label>Category</Label>
						<Select
							value={form.category}
							onValueChange={(val) => setForm({ ...form, category: val })}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Select category' />
							</SelectTrigger>
							<SelectContent>
								{['Beginner', 'Intermediate', 'Advanced'].map((c) => (
									<SelectItem key={c} value={c}>
										{c}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className='flex flex-col gap-2'>
						<Label>Start Registration</Label>
						<DatePicker
							readOnly
							selected={startRegDate}
							onChange={setStartRegDate}
							className='w-full p-2 border rounded-md'
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<Label>End Registration</Label>
						<DatePicker
							selected={endRegDate}
							onChange={setEndRegDate}
							className='w-full !pl-7 border rounded-md'
							minDate={new Date()}
							showIcon
							toggleCalendarOnIconClick
							isClearable
							placeholderText='Please select a date for registration start'
							closeOnScroll={true}
							dateFormat={'dd/MM/yyyy'}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<Label>Marathon Start Date</Label>
						<DatePicker
							readOnly
							selected={marathonStartDate}
							onChange={setMarathonStartDate}
							className='w-full p-2 border rounded-md'
						/>
					</div>
					<div className='md:col-span-2'>
						<Label>Description</Label>
						<Textarea
							name='description'
							rows={4}
							value={form.description}
							onChange={handleChange}
						/>
					</div>
				</div>

				<Button onClick={handleUpdate} disabled={loading} className='mt-4'>
					{loading ? (
						<>
							<span className='loader'></span> 'Updating...'{' '}
						</>
					) : (
						'Update'
					)}
				</Button>
			</DialogContent>
		</Dialog>
	);
}

export default UpdateMarathonModal;
