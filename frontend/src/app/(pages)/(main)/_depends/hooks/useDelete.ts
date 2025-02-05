import { useMutation, useQueryClient } from '@tanstack/react-query'

import { seminarsService } from '@/services/seminars.service'

import useToast from '@/hooks/useToast'

interface Props {
	closeModal: () => void
}

export function useSeminarDelete({ closeModal }: Props) {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	// Удаляем seminar
	const { mutate, isPending } = useMutation({
		mutationKey: ['del_seminar'],
		mutationFn: async (id: string) => {
			await seminarsService.delete(id)
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ['get_all_seminars']
			})
			closeModal()
			toast.success('Успешно удален!')
		},
		onError(err) {
			console.log(err)
			toast.error('Произошла ошибка!')
		}
	})

	return { mutate, isPending }
}
