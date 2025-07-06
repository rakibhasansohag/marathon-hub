import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import {
	FaMapMarkerAlt,
	FaSave,
	FaTimes,
	FaUserEdit,
	FaVenusMars,
	FaRunning,
} from 'react-icons/fa';

// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import useAxiosSecure from '@/lib/useAxiosSecure';
import { AuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import GlobalLoader from '@/components/shared/GlobalLoader';
import { Badge } from '@/components/ui/badge';

const EditProfilePage = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();
	const [formData, setFormData] = useState({
		location: '',
		age: '',
		gender: '',
		phone: '',
		address: '',
		bio: '',
		experiences: [],
		photoURL: '',
		status: '',
	});
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [newExperience, setNewExperience] = useState('');

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axiosSecure.get(`/marathonUser/${user.uid}`);
				const data = response.data;
				console.log(data);
				if (data) {
					setFormData({
						location: data.location || '',
						age: data.age || '',
						gender: data.gender || '',
						phone: data.phone || '',
						address: data.address || '',
						bio: data.bio || '',
						experiences: data.experiences || [],
						status: data.status || '',
						photoURL: data.photoURL || '',
					});
				}
			} catch (error) {
				console.error('Error fetching profile:', error);
				toast.error('Error fetching profile Please try again');
			} finally {
				setLoading(false);
			}
		};

		if (user) fetchProfile();
	}, [user, axiosSecure]);

	useEffect(() => {
		document.title = user
			? `${user.displayName || 'Profile'} | Marathon Hub`
			: 'Profile | Marathon Hub';
	}, [user]);

	const handleAddExperience = () => {
		if (newExperience.trim()) {
			setFormData({
				...formData,
				experiences: [...formData.experiences, newExperience.trim()],
			});
			setNewExperience('');
		}
	};

	const handleRemoveExperience = (index) => {
		setFormData({
			...formData,
			experiences: formData.experiences.filter((_, i) => i !== index),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await axiosSecure.put(
				`/marathonUser/${user.uid}`,
				formData,
			);
			console.log(response);
			if (
				response.status === 200 ||
				response.data.result.modifiedCount > 0 ||
				response.data.result.acknowledged
			) {
				toast.success('Profile updated successfully');
				navigate('/dashboard/profile');
			}
		} catch (error) {
			console.error('Update error:', error);
			toast.error('Error updating profile');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleStatusChange = (value) => {
		setFormData({
			...formData,
			status: value,
		});
	};

	if (loading) return <GlobalLoader />;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className='max-w-7xl mx-auto py-6'
		>
			<Card className='bg-base-200 rounded-2xl shadow-xl pt-6'>
				<CardHeader className='flex items-center justify-between border-b border-base-300 pb-4'>
					<div className='flex items-center gap-4'>
						<FaUserEdit className='text-3xl text-primary' />
						<h1 className='text-3xl font-bold text-primary'>Edit Profile</h1>
					</div>
					<motion.button
						onClick={() => navigate('/dashboard/profile')}
						className='bg-primary text-white p-2 cursor-pointer hover:shadow-md hover:bg-base-300 rounded-full'
						initial={{ scale: 0.9 }}
						whileHover={{ scale: 1.1 }}
						transition={{ ease: 'easeInOut', duration: 0.3 }}
					>
						<motion.div
							initial={{ rotate: 0 }}
							whileTap={{ rotate: 45 }}
							transition={{ ease: 'easeInOut', duration: 0.3 }}
						>
							<FaTimes className='text-xl' />
						</motion.div>
					</motion.button>
				</CardHeader>
				<CardContent className='p-5 md:p-8'>
					<form onSubmit={handleSubmit} className='space-y-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{/* Left Column */}
							<div className='space-y-6'>
								{/* Read-only Section */}
								<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
									<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
										<span className='text-primary'>Account Info</span>
									</h3>
									<div className='space-y-4'>
										<div className='form-control'>
											<Label>Full Name</Label>
											<Input
												type='text'
												value={user.displayName || ''}
												className='input input-bordered w-full bg-base-200'
												readOnly
											/>
										</div>
										<div className='form-control'>
											<Label>Email</Label>
											<Input
												type='email'
												value={user.email || ''}
												className='input input-bordered w-full bg-base-200'
												readOnly
											/>
										</div>
										<div className='form-control'>
											<Label htmlFor='photoURL'>Profile Picture URL</Label>
											<Input
												type='text'
												name='photoURL'
												value={formData.photoURL}
												onChange={handleChange}
												className='input input-bordered w-full'
												placeholder='Enter profile picture URL'
												id='photoURL'
											/>
										</div>
									</div>
								</div>
								{/* Location Section */}
								<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
									<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
										<FaMapMarkerAlt className='text-primary' />
										<span className='text-primary'>Location Details</span>
									</h3>
									<div className='space-y-4'>
										<div className='form-control'>
											<Label>Location</Label>
											<Input
												type='text'
												name='location'
												value={formData.location}
												onChange={handleChange}
												className='input input-bordered w-full'
												placeholder='City, Country'
											/>
										</div>
										<div className='form-control'>
											<Label>Address</Label>
											<Input
												type='text'
												name='address'
												value={formData.address}
												onChange={handleChange}
												className='input input-bordered w-full'
												placeholder='Street address'
											/>
										</div>
									</div>
								</div>
								{/* Experiences Section */}
								<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
									<h3 className='text-lg font-semibold mb-4 text-primary flex items-center gap-2'>
										<FaRunning className='text-primary' />
										Marathon Experiences
									</h3>
									<div className='flex gap-2 mb-4'>
										<Input
											type='text'
											value={newExperience}
											onChange={(e) => setNewExperience(e.target.value)}
											placeholder="Add new experience (e.g., 'Completed Boston Marathon')"
											className='flex-1'
											onKeyPress={(e) =>
												e.key === 'Enter' && handleAddExperience()
											}
										/>
										<Button type='button' onClick={handleAddExperience}>
											Add
										</Button>
									</div>
									<div className='flex flex-wrap gap-2'>
										{formData.experiences.map((exp, index) => (
											<Badge
												key={index}
												variant='outline'
												className='p-3 flex items-center gap-2 text-base'
											>
												<span>{exp}</span>
												<Button
													variant={'ghost'}
													onClick={() => handleRemoveExperience(index)}
													className='!cursor-pointer text-error hover:text-error/70 w-0 h-0 text-[4px]'
												>
													<FaTimes aria-label={`Remove experience: ${exp}`} />
												</Button>
											</Badge>
										))}
									</div>
								</div>
							</div>

							{/* Right Column */}
							<div className='space-y-6'>
								{/* Personal Info */}
								<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
									<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
										<FaVenusMars className='text-primary' />
										<span className='text-primary'>Personal Details</span>
									</h3>
									<div className='space-y-4'>
										<div className='grid grid-cols-2 gap-4'>
											<div className='form-control '>
												<Label>Age</Label>
												<Input
													type='number'
													name='age'
													value={formData.age}
													onChange={handleChange}
													placeholder='Enter age'
												/>
											</div>
											<div className='form-control'>
												<Label>Gender</Label>
												<Select
													name='gender'
													value={formData.gender}
													onValueChange={(value) =>
														setFormData({ ...formData, gender: value })
													}
												>
													<SelectTrigger className={'w-full'}>
														<SelectValue placeholder='Select gender' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='Male'>Male</SelectItem>
														<SelectItem value='Female'>Female</SelectItem>
														<SelectItem value='Other'>Other</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className='form-control'>
											<Label>Status</Label>
											<Select
												name='status'
												value={formData.status}
												onValueChange={handleStatusChange}
											>
												<SelectTrigger className={'w-full'}>
													<SelectValue placeholder='Select status' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='active'>Active</SelectItem>
													<SelectItem value='inactive'>Inactive</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className='form-control'>
											<Label>Phone</Label>
											<Input
												type='tel'
												name='phone'
												value={formData.phone}
												onChange={handleChange}
												placeholder='Contact number'
											/>
										</div>
									</div>
								</div>

								{/* Bio Section */}
								<div className='bg-base-100 p-6 rounded-xl shadow-sm'>
									<h3 className='text-lg font-semibold mb-4 text-primary'>
										Runner Bio
									</h3>
									<Textarea
										name='bio'
										value={formData.bio}
										onChange={handleChange}
										className='w-full h-32'
										placeholder='Share your marathon story, experience, and specialties...'
									/>
								</div>
							</div>
						</div>

						{/* Submit Button */}
						<div className='flex justify-end gap-4 border-t border-base-300 pt-6'>
							<Button
								type='submit'
								disabled={isSubmitting}
								className='gap-2 hover:scale-105 transition-all duration-200'
								whileTap={{ scale: 0.95 }}
							>
								{isSubmitting ? (
									<>
										<span className='loading loading-spinner'></span>
										{'Saving...'}
									</>
								) : (
									<>
										<FaSave className='text-lg' />
										Save Changes
									</>
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default EditProfilePage;
