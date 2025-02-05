import { useToggleModal } from '@/hooks/useToggleModal'

import { ModalSeminarCreate } from './modal/ModalCreate'

export function BtnAddSeminar() {
	const { isOpen, isAnim, toggleModal, closeModal } = useToggleModal()

	return (
		<>
			<button
				type='button'
				onClick={toggleModal}
			>
				Добавить
			</button>
			{isOpen && (
				<ModalSeminarCreate
					isAnim={isAnim}
					closeModal={closeModal}
				/>
			)}
		</>
	)
}
