'use client'

import { createPortal } from 'react-dom'
import { useHotkeys } from 'react-hotkeys-hook'

import { useSeminarCreate } from '../../hooks/useCreate'

import stylesModal from './Modal.module.scss'
import { Loader } from '@/components/loader/Loader'
import { Field } from '@/components/ui/fields/Field'
import { Textarea } from '@/components/ui/fields/Textarea'

interface Props {
	isAnim: boolean
	closeModal: () => void
}

export function ModalSeminarCreate({ isAnim, closeModal }: Props) {
	const {
		onSubmit,
		handleSubmit,
		register,
		formState: { errors },
		isPending
	} = useSeminarCreate()

	useHotkeys('esc', e => {
		e.stopPropagation()
		closeModal()
	})

	return createPortal(
		<div
			className={`${stylesModal.overlay} ${isAnim ? stylesModal.fadeOut : stylesModal.fadeIn}`}
		>
			<div className={stylesModal.content}>
				<form
					className={stylesModal.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={stylesModal.scroll}>
						<Loader
							isLoading={isPending}
							type='pulsing'
						/>
						<Field
							label='Заголовок'
							type='text'
							register={register('title', {
								required: 'Заголовок обязателен!'
							})}
							error={errors.title?.message}
							placeholder='Введите заголовок'
						/>
						<Field
							label='Ссылка на изображение'
							type='text'
							register={register('photo', {
								pattern: {
									value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
									message: 'Введите корректный URL'
								}
							})}
							error={errors.title?.message}
							placeholder='Введите ссылку'
						/>
						<div className={stylesModal.flex}>
							<Field
								label='Дата'
								type='date'
								register={register('date', { required: 'Дата обязательно!' })}
								error={errors.title?.message}
								placeholder='Введите Дату'
							/>
							<Field
								label='Время'
								type='time'
								register={register('time', { required: 'Время обязательно!' })}
								error={errors.title?.message}
								placeholder='Введите время'
							/>
						</div>
						<Textarea
							label='Описание'
							register={register('description', {
								required: 'Описание обязательно!'
							})}
							error={errors.description?.message}
							placeholder='Введите Описание'
						/>
						<div className={stylesModal.flex}>
							<button
								type='button'
								className={stylesModal.left}
								onClick={closeModal}
							>
								Отменить
							</button>
							<button
								type='submit'
								className={stylesModal.right}
							>
								Создать
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>,
		document.body
	)
}
