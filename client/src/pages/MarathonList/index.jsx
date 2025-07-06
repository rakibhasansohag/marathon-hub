import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { LayoutGrid, List } from 'lucide-react';

import { Link } from 'react-router';
import {
	MarathonCardSkeleton,
	MarathonTableSkeleton,
} from '@/components/shared/Skeletons';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useStaticTitle } from '@/lib/utils';

export default function MarathonsList() {
	useStaticTitle();

	const [marathons, setMarathons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [viewMode, setViewMode] = useState('card');
	const [sortOrder, setSortOrder] = useState('newest');
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState(search);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedSearch(search), 500);
		return () => clearTimeout(timeout);
	}, [search]);

	useEffect(() => {
		fetchMarathons();
	}, [sortOrder, debouncedSearch]);

	const fetchMarathons = async () => {
		setLoading(true);
		try {
			const res = await axios.get(
				`${
					import.meta.env.VITE_BASE_URL
				}/marathons?limit=0&sort=${sortOrder}&search=${encodeURIComponent(
					debouncedSearch,
				)}`,
			);
			setMarathons(res.data);
		} catch (err) {
			console.error(err);
			toast.error(err.message || 'Something went wrong');
		}
		setLoading(false);
	};

	if (!loading && marathons.length === 0) {
		return (
			<section className='bg-gray-200 dark:bg-gray-800 py-8'>
				<div className='section flex flex-col md:flex-row items-center justify-between gap-4 mb-6'>
					<div className='flex gap-4 '>
						<Select value={sortOrder} onValueChange={setSortOrder} className=''>
							<SelectTrigger className='w-44 bg-gray-50'>
								<SelectValue placeholder='Sort by' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='newest'>Newest</SelectItem>
								<SelectItem value='oldest'>Oldest</SelectItem>
							</SelectContent>
						</Select>
						<Input
							placeholder='Search marathons...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className='w-[200px] !bg-accent'
						/>
					</div>
					<div className='flex gap-2'>
						<Button
							variant={viewMode === 'card' ? 'default' : 'outline'}
							size='icon'
							onClick={() => setViewMode('card')}
						>
							<LayoutGrid />
						</Button>
						<Button
							variant={viewMode === 'table' ? 'default' : 'outline'}
							size='icon'
							onClick={() => setViewMode('table')}
						>
							<List />
						</Button>
					</div>
				</div>
				<div className='section py-8'>
					<h1 className='text-3xl font-bold'>No marathons found</h1>
					<p className='text-gray-300 mt-4'>
						Try searching for something else or creating a new marathon
					</p>
				</div>
			</section>
		);
	}

	return (
		<section className='bg-gray-200 dark:bg-gray-800'>
			<div className='section py-8'>
				{/* Controls */}
				<div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-6 '>
					<div className='flex gap-4 flex-wrap text-center justify-center items-center'>
						<Select value={sortOrder} onValueChange={setSortOrder}>
							<SelectTrigger className='w-44 bg-gray-50'>
								<SelectValue placeholder='Sort by' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='newest'>Newest</SelectItem>
								<SelectItem value='oldest'>Oldest</SelectItem>
							</SelectContent>
						</Select>
						<Input
							placeholder='Search marathons...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className='w-[200px] bg-accent'
						/>
					</div>
					<div className='flex gap-2'>
						<Button
							variant={viewMode === 'card' ? 'default' : 'outline'}
							size='icon'
							onClick={() => setViewMode('card')}
						>
							<LayoutGrid />
						</Button>
						<Button
							variant={viewMode === 'table' ? 'default' : 'outline'}
							size='icon'
							onClick={() => setViewMode('table')}
						>
							<List />
						</Button>
					</div>
				</div>

				{/* Content */}
				{loading ? (
					viewMode === 'card' ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
							{[...Array(6)].map((_, i) => (
								<MarathonCardSkeleton key={i} />
							))}
						</div>
					) : (
						<Table>
							<TableBody>
								{[...Array(1)].map((_, i) => (
									<MarathonTableSkeleton key={i} />
								))}
							</TableBody>
						</Table>
					)
				) : viewMode === 'card' ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{marathons.map((item) => (
							<Card key={item._id} className='overflow-hidden rounded-xl'>
								<img
									src={item.imageUrl}
									alt={item.title}
									className='w-full h-48 object-cover bg-accent'
								/>
								<CardContent className='p-4 space-y-2'>
									<h3 className='text-lg font-semibold'>{item.title}</h3>
									<p className='text-sm text-muted-foreground'>
										{item.location}
									</p>
									<p className='text-sm text-muted-foreground'>
										{moment(item.startRegDate).format('DD/MM/YYYY')} -{' '}
										{moment(item.endRegDate).format('DD/MM/YYYY')}
									</p>
									<Link
										to={`/marathons/${item._id}`}
										className='text-sm text-primary hover:underline'
									>
										See Details →
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>image</TableHead>
								<TableHead>Title</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Reg. Start</TableHead>
								<TableHead>Reg. End</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{marathons?.map((item, index) => (
								<TableRow
									key={item._id}
									className={
										index % 2 === 0
											? 'bg-white dark:bg-gray-900'
											: 'bg-gray-50 dark:bg-gray-700'
									}
								>
									<TableCell>
										<img
											src={
												item.imageUrl ||
												'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fplaceholder-image&psig=AOvVaw0PEnKzLdV3bV2MCLxJkgQE&ust=1749718584466000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjC5uj_6I0DFQAAAAAdAAAAABAE'
											}
											alt={item.title}
											className='w-30 h-10 rounded-md object-cover '
										/>
									</TableCell>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.location}</TableCell>
									<TableCell>
										{moment(item.startRegDate).format('DD-MM-YYYY')}
									</TableCell>
									<TableCell>
										{moment(item.endRegDate).format('DD-MM-YYYY')}
									</TableCell>
									<TableCell>
										<Link
											to={`/marathons/${item._id}`}
											className='text-primary hover:underline'
										>
											Details
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</section>
	);
}
