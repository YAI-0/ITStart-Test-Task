import { useQuery } from '@tanstack/react-query'

import { seminarsService } from '@/services/seminars.service'

export function useSeminarsAll() {
	// Запрашиваем все seminars
	const { data, isLoading, isFetching, isSuccess } = useQuery({
		queryKey: ['get_all_seminars'],
		queryFn: () => seminarsService.getAll()
	})

	return {
		data: data?.data,
		status: data?.status,
		isLoading,
		isFetching,
		isSuccess
	}
}
