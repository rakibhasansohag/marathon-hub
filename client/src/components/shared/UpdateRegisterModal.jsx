import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
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
import useAxiosSecure from '@/lib/useAxiosSecure';

function UpdateRegisterModal({ open, data, onClose, onSuccess }) {
	const axiosSecure = useAxiosSecure();
	const [loading, setLoading] = useState(false);

	// Initialize formData with existing data or empty strings
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		contact: '',
		info: '',
		bloodGroup: '',
		address: '',
		age: '',
		bio: '',

		email: '',
		marathonId: '',
		title: '',
		marathonStartDate: '',
	});

	// Populate form fields when the modal opens or data changes
	useEffect(() => {
		if (data) {
			setFormData({
				firstName: data.firstName || '',
				lastName: data.lastName || '',
				contact: data.contact || '',
				info: data.info || '',
				bloodGroup: data.bloodGroup || '',
				address: data.address || '',
				age: data.age || '',
				bio: data.bio || '',
				email: data.email || '',
				marathonId: data.marathonId || '',
				title: data.title || '',
				marathonStartDate: data.marathonStartDate || '',
			});
		}
	}, [data]);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSelectChange = (value) => {
		setFormData((prev) => ({ ...prev, bloodGroup: value }));
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		// BD phone validation
		const phoneRegex = /^01[3-9]\d{8}$/;
		if (!phoneRegex.test(formData.contact)) {
			toast.error('Invalid Bangladeshi phone number');
			return;
		}

		setLoading(true);
		try {
			const res = await axiosSecure.put(`/my-apply-marathons/${data._id}`, {
				...formData,
			});

			if (res.data.modifiedCount > 0 || res.data.acknowledged) {
				toast.success('Registration updated successfully!');

				onSuccess({ ...data, ...formData });
				onClose();
			} else {
				toast.info('No changes detected or update not applied.');
				onClose();
			}
		} catch (err) {
			console.error(
				'Update failed:',
				err.response?.data?.message || err.message,
			);
			toast.error(
				err.response?.data?.message || 'Failed to update registration',
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className={`!max-w-2xl bg-gray-800 text-white border-teal-500 !overflow-y-auto !max-h-[80vh] p-6 custom-scrollbar transition-all duration-300 ease-in-out transform  ${
					open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
				}`}
			>
				<DialogHeader>
					<DialogTitle
						className={'text-center text-2xl text-primary capitalize'}
					>
						Update Your Registration
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleUpdate} className='space-y-6 p-4'>
					{' '}
					{/* Added padding */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Read-only fields */}
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								value={formData.email}
								readOnly
								className='bg-gray-700 text-white border-gray-600'
							/>
						</div>
						<div>
							<Label htmlFor='marathonTitle'>Marathon Title</Label>
							<Input
								id='marathonTitle'
								value={formData.title}
								readOnly
								className='bg-gray-700 text-white border-gray-600'
							/>
						</div>
						<div>
							<Label htmlFor='marathonStartDate'>Marathon Start Date</Label>
							<Input
								id='marathonStartDate'
								value={new Date(
									formData.marathonStartDate,
								).toLocaleDateString()}
								readOnly
								className='bg-gray-700 text-white border-gray-600'
							/>
						</div>
						<div>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								id='firstName'
								name='firstName'
								value={formData.firstName}
								onChange={handleChange}
								required
								className='bg-gray-700 text-white border-gray-600'
								placeholder='Enter your first name'
								readOnly
							/>
						</div>
						{/* Editable fields */}
						<div>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								id='lastName'
								name='lastName'
								value={formData.lastName}
								onChange={handleChange}
								required
								className='bg-gray-700 text-white border-gray-600'
								placeholder='Enter your last name'
							/>
						</div>
						<div>
							<Label htmlFor='contact'>Contact Number</Label>
							<Input
								id='contact'
								name='contact'
								placeholder='017xxxxxxxx'
								value={formData.contact}
								onChange={handleChange}
								required
								className='bg-gray-700 text-white border-gray-600'
							/>
						</div>
						<div>
							<Label htmlFor='age'>Age</Label>
							<Input
								id='age'
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
						<div>
							<Label htmlFor='bloodGroup'>Blood Group</Label>
							<Select
								name='bloodGroup'
								value={formData.bloodGroup}
								onValueChange={handleSelectChange}
							>
								<SelectTrigger
									id='bloodGroup'
									className='w-full bg-gray-700 text-white border-gray-600 rounded-md'
								>
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
						<div>
							<Label htmlFor='address'>Address</Label>
							<Input
								id='address'
								name='address'
								value={formData.address}
								onChange={handleChange}
								className='bg-gray-700 text-white border-gray-600'
								placeholder='Enter your address'
							/>
						</div>
					</div>
					{/* Textareas */}
					<div className='grid grid-cols-1 gap-4'>
						<div>
							<Label htmlFor='info'>Additional Info</Label>
							<Textarea
								id='info'
								name='info'
								value={formData.info}
								onChange={handleChange}
								className='w-full h-24 bg-gray-700 text-white border-gray-600 rounded-md'
								placeholder='Any special requests or notes...'
							/>
						</div>
						<div>
							<Label htmlFor='bio'>Bio</Label>
							<Textarea
								id='bio'
								name='bio'
								value={formData.bio}
								onChange={handleChange}
								className='w-full h-24 bg-gray-700 text-white border-gray-600 rounded-md'
								placeholder='Write a short bio about yourself...'
							/>
						</div>
					</div>
					<Button
						type='submit'
						className='w-full bg-primary text-white'
						disabled={loading}
					>
						{loading ? 'Updating...' : 'Update Registration'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default UpdateRegisterModal;
