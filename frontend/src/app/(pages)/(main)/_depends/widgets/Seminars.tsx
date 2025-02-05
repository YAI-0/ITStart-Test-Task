'use client'

import { useState } from 'react'

import type { ISeminar } from '@/types/seminars.types'

import { useToggleModal } from '@/hooks/useToggleModal'

import { useAdminStore } from '@/stores/admin.store'

import { SeminarItem, SeminarItemSkeletonLoader } from '../features/SeminarItem'
import { ModalSeminarDelete } from '../features/modal/ModalDelete'
import { ModalSeminarUpdate } from '../features/modal/ModalUpdate'
import { useSeminarsAll } from '../hooks/useSeminars'

import styles from './Seminars.module.scss'

export type TypeActiveModal = 'update' | 'delete' | null

export function Seminars() {
	const [activeModal, setActiveModal] = useState<TypeActiveModal>(null)
	const [activeItem, setActiveItem] = useState<ISeminar | null>(null)

	const isAdmin = useAdminStore(s => s.isAdmin)
	const { data, isLoading, isSuccess } = useSeminarsAll()

	const { isAnim, openModal, closeModal } = useToggleModal({
		onClose: () => {
			setActiveModal(null)
			setActiveItem(null)
		}
	})

	const openModalItem = (type: TypeActiveModal, item: ISeminar) => {
		setActiveModal(type)
		setActiveItem(item)
		openModal()
	}

	return (
		<section className={styles.section}>
			{isLoading ? (
				<SeminarItemSkeletonLoader
					cols={2}
					rows={5}
				/>
			) : isSuccess ? (
				!!data?.length ? (
					data?.map(item => (
						<SeminarItem
							key={item.id}
							item={item}
							openModalItem={openModalItem}
						/>
					))
				) : (
					<p>Not found seminars</p>
				)
			) : (
				<p>Error load seminars</p>
			)}
			{isAdmin && activeItem && (
				<>
					{activeModal === 'update' && (
						<ModalSeminarUpdate
							isAnim={isAnim}
							closeModal={closeModal}
							item={activeItem}
						/>
					)}
					{activeModal === 'delete' && (
						<ModalSeminarDelete
							isAnim={isAnim}
							closeModal={closeModal}
							item={activeItem}
						/>
					)}
				</>
			)}
		</section>
	)
}
