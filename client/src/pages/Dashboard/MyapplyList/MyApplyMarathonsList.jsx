import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import DeleteConfirmModal from '@/components/shared/DeleteConfirmModal';
import { PenIcon, Trash } from 'lucide-react';
import moment from 'moment';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from 'react-router';

import AbsoluteLoader from '@/components/shared/AbsoluteLoader';
import UpdateRegisterModal from '@/components/shared/UpdateRegisterModal';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import GlobalLoader from '@/components/shared/GlobalLoader';
import { useStaticTitle } from '../../../lib/utils';

function MyApplyMarathonList({
	marathons = [],
	search,
	setSearch,
	sort,
	order,
	setSort,
	isLoading,
	setOrder,
}) {
	useStaticTitle();
	const [myMarathons, setMyMarathons] = useState(marathons);
	const [selected, setSelected] = useState(null);
	const [modalType, setModalType] = useState(null);
	const [modalLoading, setModalLoading] = useState(false);

	console.log(marathons);

	// fix sometime the data doesn't showd
	useEffect(() => {
		setMyMarathons(marathons);
	}, [marathons]);

	const sortOptions = [
		{ label: 'Title A-Z', value: 'title_asc' },
		{ label: 'Title Z-A', value: 'title_desc' },
		{ label: 'Start Date Ascending', value: 'startDate_asc' },
		{ label: 'Start Date Descending', value: 'startDate_desc' },
		{ label: 'Registrations Low to High', value: 'registration_asc' },
		{ label: 'Registrations High to Low', value: 'registration_desc' },
	];

	const handleSortChange = (value) => {
		const [field, ord] = value.split('_');
		setSort(field);
		setOrder(ord);
	};

	const selectValue = sort && order ? `${sort}_${order}` : '';

	if (isLoading) return <GlobalLoader />;

	return (
		<div className='px-4 py-10'>
			{modalLoading && <AbsoluteLoader />}
			<div className='flex gap-4 mb-4 max-w-md'>
				<Input
					type='text'
					placeholder='Search by title'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Select onValueChange={handleSortChange} value={selectValue}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Sort by' />
					</SelectTrigger>
					<SelectContent>
						{sortOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{marathons.length === 0 ? (
				search ? (
					<div className='text-center py-10'>
						No search result found. Try searching differently.
					</div>
				) : (
					<div className='text-center py-10'>
						No marathon list found. Apply some of them.{' '}
						<Link to='/marathons' className='text-blue-600 underline'>
							Browse Marathons
						</Link>
					</div>
				)
			) : (
				<Table className='w-full'>
					<TableHeader>
						<TableRow>
							<TableHead>Image</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Start Date</TableHead>
							<TableHead>Distance</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Total Participants</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{myMarathons.map((item) => (
							<TableRow key={item._id}>
								<TableCell>
									<img
										src={item.imageUrl}
										alt={item.title}
										className='w-30 h-12 object-cover rounded-md bg-accent aspect-square'
									/>
								</TableCell>
								<TableCell>
									<Tooltip>
										<TooltipTrigger>
											<Link to={`/marathons/${item._id}`}>{item.title}</Link>
										</TooltipTrigger>
										<TooltipContent>
											<p>Visit {item.title}</p>
										</TooltipContent>
									</Tooltip>
								</TableCell>
								<TableCell>
									{moment(item.marathonStartDate).format('DD-MM-YYYY')}
								</TableCell>
								<TableCell>{item.distance}</TableCell>
								<TableCell>{item.category}</TableCell>
								<TableCell>{item.totalRegistration}</TableCell>
								<TableCell className='space-x-2 flex'>
									<div>
										<Tooltip>
											<TooltipTrigger>
												<span>
													<Button
														onClick={() => {
															setModalLoading(true);
															setTimeout(() => {
																setSelected(item);
																setModalType('update-registration');
																setModalLoading(false);
															}, 300);
														}}
													>
														<PenIcon />
													</Button>
												</span>
											</TooltipTrigger>
											<TooltipContent>
												<p>Update</p>
											</TooltipContent>
										</Tooltip>
									</div>
									<div>
										<Tooltip>
											<TooltipTrigger>
												<span>
													<Button
														variant='destructive'
														onClick={() => {
															setSelected(item);
															setModalType('delete');
														}}
													>
														<Trash />
													</Button>
												</span>
											</TooltipTrigger>
											<TooltipContent className='bg-destructive'>
												<p>Delete</p>
											</TooltipContent>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}

			{/* Reusable Modals */}
			{modalType === 'update-registration' && selected && !modalLoading && (
				<UpdateRegisterModal
					open={true}
					data={selected}
					onClose={() => {
						setModalType(null);
						setSelected(null);
					}}
					onSuccess={(updatedRegistration) => {
						setMyMarathons((prev) =>
							prev.map((item) =>
								item._id === updatedRegistration._id
									? updatedRegistration
									: item,
							),
						);
					}}
				/>
			)}

			{modalType === 'delete' && selected && (
				<DeleteConfirmModal
					open={true}
					item={selected}
					onClose={() => {
						setModalType(null);
						setSelected(null);
					}}
					onDelete={() => {
						setMyMarathons((prev) =>
							prev.filter((item) => item._id !== selected._id),
						);
					}}
					type='my-apply-marathons'
				/>
			)}
		</div>
	);
}

export default MyApplyMarathonList;
