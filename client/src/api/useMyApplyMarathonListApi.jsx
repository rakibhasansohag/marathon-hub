import useAxiosSecure from '@/lib/useAxiosSecure';

function useMyApplyMarathonsListApi() {
	const axiosSecure = useAxiosSecure();

	const fetchMyApplyMarathons = async (
		userId,
		search = '',
		sort = '',
		order = 'asc',
	) => {
		const queryParams = new URLSearchParams();
		queryParams.append('userId', userId);
		if (search) queryParams.append('search', search);
		if (sort) queryParams.append('sort', sort);
		if (order) queryParams.append('order', order);

		const res = await axiosSecure.get(
			`/my-apply-marathons?${queryParams.toString()}`, // sometimes query params are not working properly
		);
		return res.data;
	};

	return { fetchMyApplyMarathons };
}

export default useMyApplyMarathonsListApi;
