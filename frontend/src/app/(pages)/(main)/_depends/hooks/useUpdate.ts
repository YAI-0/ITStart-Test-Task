import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import type { TypeSeminarUpdate } from '@/types/seminars.types'

import { seminarsService } from '@/services/seminars.service'

import useToast from '@/hooks/useToast'

interface Props {
	id: string
	closeModal: () => void
}

export function useSeminarUpdate({ id, closeModal }: Props) {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	// Объявляем форму
	const form = useForm<TypeSeminarUpdate>({
		mode: 'onChange'
	})
	// Создаем seminar
	const { mutate, isPending } = useMutation({
		mutationKey: ['put_seminar'],
		mutationFn: async (data: TypeSeminarUpdate) => {
			await seminarsService.update(data)
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ['get_all_seminars']
			})
			closeModal()
			toast.success('Успешно создан!')
		},
		onError(err) {
			console.log(err)
			toast.error('Произошла ошибка!')
		}
	})

	// Обработчик submit
	const onSubmit: SubmitHandler<TypeSeminarUpdate> = data => {
		mutate({ ...data, id })
	}

	return { onSubmit, isPending, ...form }
}
