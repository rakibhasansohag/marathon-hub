import React from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useAxiosSecure from '@/lib/useAxiosSecure';
import { toast } from 'react-toastify';

function DeleteConfirmModal({
	open,
	item,
	onClose,
	onDelete,
	type = 'marathon',
}) {
	const axiosSecure = useAxiosSecure();

	// const handleDelete = async () => {
	// 	await axiosSecure.delete(
	// 		`/${type === 'marathon' ? 'marathons' : 'my-apply-marathons'}/${
	// 			item._id
	// 		}`,
	// 	);
	// 	onDelete();
	// 	onClose();
	// };

	const handleDelete = async () => {
		try {
			// Check if item contains marathonId
			if (type === 'my-apply-marathons' && item.marathonId) {
				await axiosSecure.delete(
					`/my-apply-marathons/${item._id}?marathonId=${item.marathonId}`,
				);
			} else {
				await axiosSecure.delete(`/marathons/${item._id}`);
			}
			onDelete();
			toast.success('Item deleted successfully.');
			onClose();
		} catch (error) {
			console.error('Error deleting item:', error);
			toast.error('Failed to delete item.');
			onClose();
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>Confirm Deletion</DialogHeader>
				<p>Are you sure you want to delete this {type}?</p>
				<div className='flex justify-end space-x-2'>
					<Button variant='outline' onClick={onClose}>
						Cancel
					</Button>
					<Button variant='destructive' onClick={handleDelete}>
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default DeleteConfirmModal;
