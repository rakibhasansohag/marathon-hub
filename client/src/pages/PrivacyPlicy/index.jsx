import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function PrivacyPolicyPage() {
	const navigate = useNavigate();

	return (
		<div className='w-full section py-12 px-4 sm:px-6 lg:px-8'>
			<div className='w-full  mx-auto'>
				<div className='mb-8'>
					<Button
						variant='ghost'
						onClick={() => navigate(-1)}
						className='flex items-center gap-1'
					>
						<ChevronLeft className='h-4 w-4' />
						Back
					</Button>
				</div>

				<div className='w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
					<div className='p-8 sm:p-10'>
						<div className='text-center mb-10'>
							<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
								MarathonHub Privacy Policy
							</h1>
							<p className='mt-3 text-gray-600 dark:text-gray-400'>
								Last updated:{' '}
								{new Date().toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</p>
						</div>

						<div className='prose dark:prose-invert '>
							<Section title='Your Privacy Matters'>
								<p>
									At MarathonHub, we take your privacy seriously. This policy
									explains what information we collect, how we use it, and your
									rights regarding your personal data. We've written this in
									plain language to make it easy to understand.
								</p>
							</Section>

							<Section title='1. Information We Collect'>
								<p>We only collect what's necessary to provide our services:</p>

								<h3 className='font-semibold mt-4'>Account Information</h3>
								<ul className='list-disc pl-6 space-y-1 mt-2'>
									<li>Your name and contact details when you register</li>
									<li>Profile information you choose to share</li>
									<li>Account preferences and settings</li>
								</ul>

								<h3 className='font-semibold mt-4'>Event Participation</h3>
								<ul className='list-disc pl-6 space-y-1 mt-2'>
									<li>Events you register for or organize</li>
									<li>Participation history and results</li>
									<li>Emergency contact information (for event safety)</li>
								</ul>

								<h3 className='font-semibold mt-4'>Technical Data</h3>
								<ul className='list-disc pl-6 space-y-1 mt-2'>
									<li>Device and browser information</li>
									<li>IP address and approximate location</li>
									<li>Usage patterns through cookies (you can manage these)</li>
								</ul>
							</Section>

							<Section title='2. How We Use Your Information'>
								<p>We use your data responsibly to:</p>
								<ul className='list-disc pl-6 space-y-1 mt-2'>
									<li>Provide and improve our services</li>
									<li>Process event registrations and payments</li>
									<li>Communicate important service updates</li>
									<li>Ensure event safety and security</li>
									<li>Analyze usage to enhance your experience</li>
									<li>Prevent fraud and unauthorized access</li>
								</ul>
								<p className='mt-3'>
									We <strong>never</strong> sell your personal information to
									third parties.
								</p>
							</Section>

							<Section title='3. Data Sharing'>
								<p>We only share data when necessary:</p>
								<ul className='list-disc pl-6 space-y-1 mt-2'>
									<li>
										<strong>With event organizers:</strong> Basic participant
										information needed for event management
									</li>
									<li>
										<strong>With service providers:</strong> Trusted partners
										who help us operate (payment processors, hosting services)
									</li>
									<li>
										<strong>For legal reasons:</strong> When required by law or
										to protect our rights
									</li>
								</ul>
							</Section>

							<Section title='4. Your Rights & Choices'>
								<p>You have control over your data:</p>
								<ul className='list-disc pl-6 space-y-1 mt-2'>
									<li>Access and download your personal data</li>
									<li>Update or correct inaccurate information</li>
									<li>
										Delete your account (some data may be retained for legal
										reasons)
									</li>
									<li>Opt-out of marketing communications</li>
									<li>Manage cookie preferences in your browser</li>
								</ul>
								<p className='mt-3'>
									To exercise these rights, contact us at{' '}
									<span className='font-medium'>privacy@marathonhub.com</span>.
								</p>
							</Section>

							<Section title='5. Data Security'>
								<p>
									We implement industry-standard security measures to protect
									your information, including encryption, secure servers, and
									regular audits. However, no online service is 100% secure, so
									we can't guarantee absolute security.
								</p>
							</Section>

							<Section title='6. International Data Transfers'>
								<p>
									As a global platform, your data may be processed outside your
									home country. We ensure such transfers comply with applicable
									data protection laws.
								</p>
							</Section>

							<Section title="7. Children's Privacy">
								<p>
									Our services are not directed at children under 16. We don't
									knowingly collect personal information from children without
									parental consent.
								</p>
							</Section>

							<Section title='8. Policy Updates'>
								<p>
									We may update this policy occasionally. We'll notify you of
									significant changes through email or prominent notices on our
									platform.
								</p>
							</Section>

							<Section title='Contact Us'>
								<p>
									Have questions about your privacy? Our team is happy to help:
									<br />
									<span className='font-medium'>privacy@marathonhub.com</span>
								</p>
								<p className='mt-2'>
									For formal requests, please include "Privacy Request" in your
									subject line.
								</p>
							</Section>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Section({ title, children }) {
	return (
		<div className='border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0 last:pb-0'>
			<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
				{title}
			</h2>
			<div className='text-gray-700 dark:text-gray-300'>{children}</div>
		</div>
	);
}
