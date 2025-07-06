import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import moment from 'moment';
import { useNavigate } from 'react-router';

export default function RegistrationForm({
	marathon,
	user,
	onClose,
	onRegistered,
}) {
	const [formData, setFormData] = useState({
		firstName: user.displayName.split(' ')[0] || '',
		lastName: user.displayName.split(' ')[1] || '',
		contact: '',
		info: '',
		bloodGroup: '',
		address: '',
		age: '',
		bio: '',
	});

	const navigate = useNavigate();
	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSelectChange = (value) => {
		setFormData((prev) => ({ ...prev, bloodGroup: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// BD phone validation
		const phoneRegex = /^01[3-9]\d{8}$/;
		if (!phoneRegex.test(formData.contact)) {
			toast.error('Invalid Bangladeshi phone number');
			return;
		}

		try {
			await axios.post(`${import.meta.env.VITE_BASE_URL}/registration`, {
				email: user.email,
				marathonId: marathon._id,
				marathonTitle: marathon.title,
				marathonStartDate: marathon.marathonStartDate,
				uid: user?.uid,
				marathon: marathon,
				startRegDate: marathon?.startRegDate,
				endRegDate: marathon?.endRegDate,
				...formData,
			});
			toast.success('Registered successfully!');
			onRegistered();
			onClose();
			navigate('/dashboard/my-apply-list');
		} catch (err) {
			toast.error(err.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<Label>Email</Label>
					<Input
						value={user.email}
						readOnly
						className='bg-gray-700 text-white border-gray-600'
					/>
				</div>
				<div>
					<Label>Marathon Title</Label>
					<Input
						value={marathon.title}
						readOnly
						className='bg-gray-700 text-white border-gray-600'
					/>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<Label>Start Date</Label>
					<Input
						value={moment(marathon.marathonStartDate).format('LL')}
						readOnly
						className='bg-gray-700 text-white border-gray-600'
					/>
				</div>
				<div>
					<Label>Age</Label>
					<Input
						type='number'
						name='age'
						value={formData.age}
						onChange={handleChange}
						min='1'
						max='120'
						className='bg-gray-700 text-white border-gray-600'
						placeholder='Enter your age'
					/>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<Label>First Name</Label>
					<Input
						name='firstName'
						value={formData.firstName}
						onChange={handleChange}
						required
						className='bg-gray-700 text-white border-gray-600'
					/>
				</div>
				<div>
					<Label>Last Name</Label>
					<Input
						name='lastName'
						value={formData.lastName}
						onChange={handleChange}
						required
						className='bg-gray-700 text-white border-gray-600'
					/>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<Label>Contact Number</Label>
					<Input
						name='contact'
						placeholder='017xxxxxxxx'
						value={formData.contact}
						onChange={handleChange}
						required
						className='bg-gray-700 text-white border-gray-600'
					/>
				</div>
				<div>
					<Label>Blood Group</Label>
					<Select
						name='bloodGroup'
						value={formData.bloodGroup}
						onValueChange={handleSelectChange}
					>
						<SelectTrigger className='w-full bg-gray-700 text-white border-gray-600 rounded-md'>
							<SelectValue placeholder='Select Blood Group' />
						</SelectTrigger>
						<SelectContent className='bg-gray-700 text-white border-gray-600'>
							<SelectItem value='A+'>A+</SelectItem>
							<SelectItem value='A-'>A-</SelectItem>
							<SelectItem value='B+'>B+</SelectItem>
							<SelectItem value='B-'>B-</SelectItem>
							<SelectItem value='AB+'>AB+</SelectItem>
							<SelectItem value='AB-'>AB-</SelectItem>
							<SelectItem value='O+'>O+</SelectItem>
							<SelectItem value='O-'>O-</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<Label>Address</Label>
					<Input
						name='address'
						value={formData.address}
						onChange={handleChange}
						className='bg-gray-700 text-white border-gray-600'
						placeholder='Enter your address'
					/>
				</div>
				<div className='col-span-1 md:col-span-2'>
					<Label>Additional Info</Label>
					<Textarea
						name='info'
						value={formData.info}
						onChange={handleChange}
						className='w-full h-24 bg-gray-700 text-white border-gray-600 rounded-md'
						placeholder='Any special requests or notes...'
					/>
				</div>
			</div>
			<div className='col-span-1 md:col-span-2'>
				<Label>Bio</Label>
				<Textarea
					name='bio'
					value={formData.bio}
					onChange={handleChange}
					className='w-full h-24 bg-gray-700 text-white border-gray-600 rounded-md'
					placeholder='Write a short bio about yourself...'
				/>
			</div>
			<Button type='submit' className='w-full bg-primary text-white'>
				Submit
			</Button>
		</form>
	);
}
