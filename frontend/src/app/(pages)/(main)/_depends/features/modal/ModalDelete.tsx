'use client'

import { TriangleAlert } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useHotkeys } from 'react-hotkeys-hook'

import type { ISeminar } from '@/types/seminars.types'

import { useSeminarDelete } from '../../hooks/useDelete'

import stylesModal from './Modal.module.scss'
import { Loader } from '@/components/loader/Loader'

interface Props {
	isAnim: boolean
	closeModal: () => void
	item: ISeminar
}

export function ModalSeminarDelete({ isAnim, closeModal, item }: Props) {
	const { mutate, isPending } = useSeminarDelete({ closeModal })

	useHotkeys('esc', e => {
		e.stopPropagation()
		closeModal()
	})

	return createPortal(
		<div
			className={`${stylesModal.overlay} ${isAnim ? stylesModal.fadeOut : stylesModal.fadeIn}`}
		>
			<div className={stylesModal.content}>
				<div className={`${stylesModal.form} ${stylesModal.delete}`}>
					<div className={stylesModal.scroll}>
						<Loader
							isLoading={isPending}
							type='pulsing'
						/>
						<h1 className={stylesModal.top}>
							<TriangleAlert size={20} />
							Безвозвратное удаление
							<TriangleAlert size={20} />
						</h1>
						<div className={stylesModal.flex}>
							<button
								type='button'
								disabled={isPending}
								onClick={() => closeModal()}
								className={stylesModal.left}
							>
								Отменить
							</button>
							<button
								type='submit'
								disabled={isPending}
								onClick={() => mutate(item.id)}
								className={stylesModal.right}
							>
								Удалить
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.body
	)
}
