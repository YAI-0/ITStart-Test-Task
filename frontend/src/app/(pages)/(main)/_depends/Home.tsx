'use client'

import { useAdminStore } from '@/stores/admin.store'

import styles from './Home.module.scss'
import { BtnAddSeminar } from './features/BtnAddSeminar'
import { Seminars } from './widgets/Seminars'

export function Home() {
	const { isAdmin, setIsAdmin } = useAdminStore()

	return (
		<>
			<header className={styles.header}>
				<h1>Семинары</h1>
				<div className={styles.flex}>
					{isAdmin && <BtnAddSeminar />}
					<button
						type='button'
						onClick={() => setIsAdmin(!isAdmin)}
					>
						{isAdmin ? 'Админ' : 'Обычный'}
					</button>
				</div>
			</header>
			<main className={styles.main}>
				<Seminars />
			</main>
		</>
	)
}
