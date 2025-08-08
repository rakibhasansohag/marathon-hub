import { Link, NavLink } from 'react-router';
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
	const contactUs = [
		{
			name: 'rakibhasansohag133@gmail.com',
			to: 'mailto:info@tbgardening.com',
		},
		{ name: '01760169982', to: 'tel:+8801760169982' },
		{ name: 'Wa - 01760169982', to: 'https://wa.me/8801760169982' },
	];

	const terms = ['terms-and-conditions', 'privacy-policy'];

	return (
		<footer className='bg-background text-foreground py-12 border-t border-muted'>
			<div className='section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
				<Card className='shadow-none bg-transparent border-none p-0'>
					<CardContent className='p-0'>
						<Link to='/' className='inline-flex items-center gap-2'>
							<span className='text-2xl font-bold text-primary'>
								MarathonHub
							</span>
						</Link>
						<p className='mt-4 text-muted-foreground'>
							Your ultimate marathon companion. Track your progress, connect
							with runners, explore tips & guides, and stay motivated through
							every step of your journey.
						</p>
					</CardContent>
				</Card>

				<Card className='shadow-none bg-transparent border-none p-0'>
					<CardContent className='p-0'>
						<h4 className='font-semibold text-lg text-primary mb-2'>
							Quick Links
						</h4>
						<ul className='space-y-1'>
							{['Home', 'Marathon', 'Blog'].map((page) => (
								<li key={page}>
									<NavLink
										to={
											page === 'Home'
												? '/'
												: `/${page.toLowerCase().replace(' ', '-')}`
										}
										className={({ isActive }) =>
											`block text-sm transition-colors hover:text-secondary ${
												isActive ? 'text-secondary font-semibold' : ''
											}`
										}
									>
										{page}
									</NavLink>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				<Card className='shadow-none bg-transparent border-none p-0'>
					<CardContent className='p-0'>
						<h4 className='font-semibold text-lg text-primary mb-2'>
							Contact Us
						</h4>
						<ul className='space-y-1'>
							{contactUs.map((info, index) => (
								<li key={index}>
									<Link
										to={info.to}
										className='block text-sm transition-transform hover:scale-105 hover:text-secondary'
									>
										{info.name}
									</Link>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>

				<Card className='shadow-none bg-transparent border-none p-0'>
					<CardContent className='p-0'>
						<h4 className='font-semibold text-lg text-primary mb-2'>
							Terms & Policies
						</h4>
						<ul className='space-y-1'>
							{terms.map((topic, index) => (
								<li key={index}>
									<Link
										to={`/${topic.toLowerCase()}`}
										className='block text-sm transition-transform hover:scale-105 hover:text-secondary'
									>
										{topic}
									</Link>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>

			<Separator className='my-8' />

			<div className='flex flex-col items-center gap-4'>
				<div className='flex gap-6 text-primary'>
					<Link
						to='https://www.facebook.com/rakibhasansohag133/'
						target='_blank'
					>
						<FaFacebook
							size={22}
							className='hover:scale-110 transition-transform'
						/>
					</Link>
					<Link
						to='https://www.instagram.com/rakibhasansohag133'
						target='_blank'
					>
						<BsInstagram
							size={22}
							className='hover:scale-110 transition-transform'
						/>
					</Link>
					<Link
						to='https://www.linkedin.com/in/rakib-hasan-sohag/'
						target='_blank'
					>
						<BsLinkedin
							size={22}
							className='hover:scale-110 transition-transform'
						/>
					</Link>
					<Link to='https://github.com/rakibhasansohag' target='_blank'>
						<BsGithub
							size={22}
							className='hover:scale-110 transition-transform'
						/>
					</Link>
				</div>

				<div className='text-sm text-muted-foreground text-center'>
					© {new Date().getFullYear()} MarathonHub. All rights reserved.
					<br />
					Made with ❤️ by{' '}
					<Link
						to='https://github.com/rakibhasansohag'
						target='_blank'
						className='text-secondary font-semibold underline-offset-4 hover:underline'
					>
						Rakib Hasan Sohag
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
