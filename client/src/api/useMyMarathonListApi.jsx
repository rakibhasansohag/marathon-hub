import useAxiosSecure from '@/lib/useAxiosSecure';

function useMyMarathonsListApi() {
	const axiosSecure = useAxiosSecure();

	const fetchMyMarathons = async (userId) => {
		const res = await axiosSecure.get(`/my-marathons?userId=${userId}`);
		return res.data;
	};

	return { fetchMyMarathons };
}

export default useMyMarathonsListApi;
