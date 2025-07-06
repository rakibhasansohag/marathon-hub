import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { use } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStaticTitle } from '@/lib/utils';

const ForgotPassword = () => {
	useStaticTitle();
	const location = useLocation();
	const navigate = useNavigate();
	const { sendPasswordResetEmailHelper } = use(AuthContext);

	const [email, setEmail] = useState(location?.state?.email || '');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email) {
			toast.error('Please enter your email');
			return;
		}
		setLoading(true);
		try {
			await sendPasswordResetEmailHelper(email);
			toast.success('Password reset email sent!');
			setTimeout(() => {
				window.open('https://mail.google.com', '_blank');
				navigate('/auth/login');
			}, 1000);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex items-center justify-center bg-muted min-h-[90vh]  px-4'>
			<motion.div
				className='w-full max-w-md'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<Card className='p-6 pt-20 relative overflow-hidden shadow-xl'>
					{/* Icon at top center */}
					<motion.div
						className='absolute top-10 left-1/2 transform -translate-x-1/2'
						initial={{ y: -40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
					>
						<FaEnvelopeOpenText size={64} className='text-primary' />
					</motion.div>

					<h2 className='text-3xl font-bold text-center mt-8 mb-6'>
						Forgot Password
					</h2>

					<form onSubmit={handleSubmit} className='space-y-6'>
						<motion.div
							className='space-y-2'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							<label htmlFor='email' className='font-semibold text-lg'>
								Email
							</label>
							<Input
								id='email'
								type='email'
								placeholder='your-email@example.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</motion.div>

						<Button type='submit' disabled={loading} className='w-full'>
							{loading ? (
								<>
									<span className='animate-spin mr-2'>🔄</span> Sending...
								</>
							) : (
								'Reset Password'
							)}
						</Button>
					</form>

					<motion.div
						className='mt-6 text-center space-x-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
					>
						<Button
							variant={'ghost'}
							onClick={() => navigate(-1)}
							className='text-muted-foreground hover:text-primary hover:underline transition'
						>
							← Back to Login
						</Button>
						<Button
							variant={'ghost'}
							onClick={() => navigate('/auth/register')}
							className='text-muted-foreground hover:text-primary hover:underline transition'
						>
							Register →
						</Button>
					</motion.div>
				</Card>
			</motion.div>
		</div>
	);
};

export default ForgotPassword;
