import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import UpdateMarathonModal from '@/components/shared/UpdateMarathonModal';
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

function MyMarathonsList({ marathons = [] }) {
	const [myMarathons, setMyMarathons] = useState(marathons);
	const [selected, setSelected] = useState(null);
	const [modalType, setModalType] = useState(null);
	const [modalLoading, setModalLoading] = useState(false);

	console.log(marathons);
	return (
		<div className='px-4 py-10'>
			{modalLoading && <AbsoluteLoader />}
			<Table className={'w-full'}>
				<TableHeader>
					<TableRow>
						<TableHead>Image</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Start Date</TableHead>
						<TableHead>Distance</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>total Participants</TableHead>
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
										<p>visit {item.title}</p>
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
															setModalType('update');
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
										<TooltipContent className={'bg-destructive'}>
											<p>Delete</p>
										</TooltipContent>
									</Tooltip>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Reusable Modals */}
			{modalType === 'update' && selected && !modalLoading && (
				<UpdateMarathonModal
					open={true}
					data={selected}
					onClose={() => {
						setModalType(null);
						setSelected(null);
					}}
					onSuccess={(updated) => {
						setMyMarathons((prev) =>
							prev.map((item) => (item._id === updated._id ? updated : item)),
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
					type='marathon'
				/>
			)}
		</div>
	);
}

export default MyMarathonsList;
