import React, { useEffect, useState } from 'react';
import useAuth from '@/lib/useAuth';
import GlobalLoader from '@/components/shared/GlobalLoader';
import useMyMarathonsListApi from '@/api/useMyMarathonListApi';
import MyMarathonsList from './MyMarathonsList';
import { useStaticTitle } from '@/lib/utils';

function MyMarathonsListPage() {
	useStaticTitle();

	const { user, loading } = useAuth();
	const { fetchMyMarathons } = useMyMarathonsListApi();

	const [marathons, setMarathons] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!loading && user) {
			fetchMyMarathons(user.uid)
				.then((data) => {
					setMarathons(data);
					setIsLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setIsLoading(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, user]);

	if (isLoading) return <GlobalLoader />;

	console.log(marathons);

	return (
		<div className='w-full mx-auto '>
			<div className='pt-12'>
				<h2 className='text-2xl font-bold'>My Marathons Events</h2>
			</div>
			<MyMarathonsList marathons={marathons} />
		</div>
	);
}

export default MyMarathonsListPage;
