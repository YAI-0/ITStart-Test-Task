'use client'

import { createPortal } from 'react-dom'
import { useHotkeys } from 'react-hotkeys-hook'

import type { ISeminar } from '@/types/seminars.types'

import { useSeminarUpdate } from '../../hooks/useUpdate'

import stylesModal from './Modal.module.scss'
import { Loader } from '@/components/loader/Loader'
import { Field } from '@/components/ui/fields/Field'
import { Textarea } from '@/components/ui/fields/Textarea'

interface Props {
	isAnim: boolean
	closeModal: () => void
	item: ISeminar
}

export function ModalSeminarUpdate({ isAnim, closeModal, item }: Props) {
	const {
		onSubmit,
		handleSubmit,
		register,
		formState: { errors },
		isPending
	} = useSeminarUpdate({ id: item.id, closeModal })

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
							defaultValue={item.title}
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
							error={errors.photo?.message}
							placeholder='Введите ссылку'
							defaultValue={item.photo}
						/>
						<div className={stylesModal.flex}>
							<Field
								label='Дата'
								type='date'
								register={register('date', { required: 'Дата обязательно!' })}
								error={errors.date?.message}
								placeholder='Введите Дату'
								defaultValue={item.date}
							/>
							<Field
								label='Время'
								type='time'
								register={register('time', { required: 'Время обязательно!' })}
								error={errors.time?.message}
								placeholder='Введите время'
								defaultValue={item.time}
							/>
						</div>
						<Textarea
							label='Описание'
							register={register('description', {
								required: 'Описание обязательно!'
							})}
							error={errors.description?.message}
							placeholder='Введите Описание'
							defaultValue={item.description}
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
								Обновить
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>,
		document.body
	)
}
