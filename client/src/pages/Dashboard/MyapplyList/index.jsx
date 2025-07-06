import React, { useEffect, useState } from 'react';
import useAuth from '@/lib/useAuth';
import GlobalLoader from '@/components/shared/GlobalLoader';

import useMyApplyMarathonsListApi from '@/api/useMyApplyMarathonListApi';
import MyApplyMarathonList from './MyApplyMarathonsList';
import { useStaticTitle } from '@/lib/utils';

function MyApplyListPage() {
	useStaticTitle();

	const { user, loading } = useAuth();
	const { fetchMyApplyMarathons } = useMyApplyMarathonsListApi();

	const [marathons, setMarathons] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState('');
	const [order, setOrder] = useState('asc');
	const [debouncedSearch, setDebouncedSearch] = useState(search);

	// Debounce search input
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search);
		}, 500);
		return () => clearTimeout(handler);
	}, [search]);

	useEffect(() => {
		if (!loading && user) {
			setIsLoading(true);
			fetchMyApplyMarathons(user.uid, debouncedSearch, sort, order)
				.then((data) => {
					setMarathons(data);
					setIsLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setIsLoading(false);
				});
		}
	}, [user, debouncedSearch, sort, order, loading]);

	if (isLoading) return <GlobalLoader />;

	console.log(marathons);

	return (
		<div className='w-full mx-auto '>
			<div className='pt-12'>
				<h2 className='text-2xl font-bold'>My Apply Marathon Events</h2>
			</div>
			<MyApplyMarathonList
				marathons={marathons}
				search={search}
				setSearch={setSearch}
				sort={sort}
				setSort={setSort}
				order={order}
				setOrder={setOrder}
				isLoading={isLoading}
			/>
		</div>
	);
}

export default MyApplyListPage;
