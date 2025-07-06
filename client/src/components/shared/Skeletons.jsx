import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const MarathonCardSkeleton = () => {
	return (
		<Card className='w-full min-h-72 rounded-xl'>
			<Skeleton className='w-full h-40 rounded-t-xl' />
			<CardContent className='space-y-2 py-4'>
				<Skeleton className='h-4 w-3/4' />
				<Skeleton className='h-3 w-1/2' />
				<Skeleton className='h-3 w-2/3' />
				<Skeleton className='h-8 w-24 mt-2' />
			</CardContent>
		</Card>
	);
};

export const MarathonTableSkeleton = () => {
	return (
		<div className='w-full overflow-x-auto'>
			<table className='min-w-full'>
				<thead>
					<tr className='bg-muted'>
						<th className='px-4 py-2 text-left'>Image</th>
						<th className='px-4 py-2 text-left'>Title</th>
						<th className='px-4 py-2 text-left'>Location</th>
						<th className='px-4 py-2 text-left'>Date</th>
						<th className='px-4 py-2 text-left'>Action</th>
					</tr>
				</thead>
				<tbody>
					{[...Array(5)].map((_, i) => (
						<tr key={i} className='border-b'>
							<td className='px-4 py-3'>
								<Skeleton className='h-10 w-20' />
							</td>
							<td className='px-4 py-3'>
								<Skeleton className='h-4 w-32' />
							</td>
							<td className='px-4 py-3'>
								<Skeleton className='h-4 w-24' />
							</td>
							<td className='px-4 py-3'>
								<Skeleton className='h-4 w-28' />
							</td>
							<td className='px-4 py-3'>
								<Skeleton className='h-8 w-16' />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
