import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import type { TypeSeminarCreate } from '@/types/seminars.types'

import { seminarsService } from '@/services/seminars.service'

import useToast from '@/hooks/useToast'

export function useSeminarCreate() {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	// Объявляем форму
	const form = useForm<TypeSeminarCreate>({
		mode: 'onChange'
	})

	// Создаем seminar
	const { mutate, isPending } = useMutation({
		mutationKey: ['add_seminar'],
		mutationFn: async (data: TypeSeminarCreate) => {
			await seminarsService.create(data)
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ['get_all_seminars']
			})
			form.reset()
			toast.success('Успешно создан!')
		},
		onError(err) {
			console.log(err)
			toast.error('Произошла ошибка!')
		}
	})

	// Обработчик submit
	const onSubmit: SubmitHandler<TypeSeminarCreate> = data => {
		mutate(data)
	}

	return { onSubmit, isPending, ...form }
}
