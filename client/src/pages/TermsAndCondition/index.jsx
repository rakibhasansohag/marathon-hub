import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function TermsAndConditionsPage() {
	const navigate = useNavigate();

	return (
		<section className='bg-gray-100 dark:bg-gray-900 min-h-screen'>
			<div className='container mx-auto px-4 py-8 '>
				<Button variant='ghost' onClick={() => navigate(-1)} className='mb-6'>
					<ChevronLeft className='mr-2 h-4 w-4' />
					Back
				</Button>

				<Card className='border-primary pt-10'>
					<CardHeader>
						<CardTitle className='text-3xl font-bold text-center'>
							MarathonHub Terms and Conditions
						</CardTitle>
						<p className='text-center text-muted-foreground'>
							Last Updated: {new Date().toLocaleDateString()}
						</p>
					</CardHeader>

					<CardContent>
						<ScrollArea className='h-[calc(100vh-250px)] pr-4'>
							<div className='space-y-6'>
								<div>
									<h2 className='text-xl font-semibold mb-2'>
										1. Acceptance of Terms
									</h2>
									<p className='text-muted-foreground'>
										By using MarathonHub, you agree to comply with these Terms.
										If you do not agree, please refrain from using our services.
									</p>
								</div>

								<Separator />

								<div>
									<h2 className='text-xl font-semibold mb-2'>
										2. User Responsibilities
									</h2>
									<div className='space-y-4'>
										<div>
											<h3 className='font-medium'>For All Users:</h3>
											<ul className='list-disc pl-6 text-muted-foreground space-y-1 mt-2'>
												<li>
													You must provide accurate information during
													registration
												</li>
												<li>
													Maintain confidentiality of your account credentials
												</li>
												<li>
													Any fraudulent activity will result in account
													termination
												</li>
											</ul>
										</div>

										<div>
											<h3 className='font-medium'>For Organizers:</h3>
											<ul className='list-disc pl-6 text-muted-foreground space-y-1 mt-2'>
												<li>Provide accurate event details</li>
												<li>Ensure compliance with local laws</li>
												<li>MarathonHub is not liable for event issues</li>
											</ul>
										</div>

										<div>
											<h3 className='font-medium'>For Participants:</h3>
											<ul className='list-disc pl-6 text-muted-foreground space-y-1 mt-2'>
												<li>Meet eligibility criteria set by organizers</li>
												<li>
													Registration fees are non-refundable unless stated
												</li>
												<li>Participate at your own risk</li>
											</ul>
										</div>
									</div>
								</div>

								<Separator />

								<div>
									<h2 className='text-xl font-semibold mb-2'>
										3. Registration & Payments
									</h2>
									<ul className='list-disc pl-6 text-muted-foreground space-y-1'>
										<li>Payments processed via secure third-party providers</li>
										<li>
											MarathonHub doesn't handle refunds - contact organizers
										</li>
										<li>Chargebacks must be resolved with the organizer</li>
									</ul>
								</div>

								<Separator />

								<div>
									<h2 className='text-xl font-semibold mb-2'>
										4. Content & Conduct
									</h2>
									<ul className='list-disc pl-6 text-muted-foreground space-y-1'>
										<li>No false, misleading, or harmful content</li>
										<li>Hate speech or harassment will result in suspension</li>
										<li>MarathonHub may remove violating content</li>
									</ul>
								</div>

								<Separator />

								<div>
									<h2 className='text-xl font-semibold mb-2'>5. Liability</h2>
									<p className='text-muted-foreground'>
										MarathonHub is a platform connecting organizers and
										participants. We are not responsible for injuries,
										accidents, or event cancellations.
									</p>
								</div>

								<Separator />

								<div>
									<h2 className='text-xl font-semibold mb-2'>
										6. Changes to Terms
									</h2>
									<p className='text-muted-foreground'>
										We may update these Terms periodically. Continued use
										constitutes acceptance of revised Terms.
									</p>
								</div>

								<Separator />

								<div>
									<h2 className='text-xl font-semibold mb-2'>7. Contact Us</h2>
									<p className='text-muted-foreground'>
										For questions regarding these Terms, contact us at:
										support@marathonhub.com
									</p>
								</div>
							</div>
						</ScrollArea>

						<div className='mt-6 flex justify-center'>
							<Button onClick={() => navigate('/')} className='px-8'>
								I Agree
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
