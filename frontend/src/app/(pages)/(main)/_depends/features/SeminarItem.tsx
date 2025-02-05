import { Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { ISeminar } from '@/types/seminars.types'

import { useAdminStore } from '@/stores/admin.store'

import { dateFromNow } from '@/utils/dateFromNow'

import type { TypeActiveModal } from '../widgets/Seminars'

import styles from './SeminarItem.module.scss'

interface Props {
	item: ISeminar
	openModalItem: (type: TypeActiveModal, item: ISeminar) => void
}

export function SeminarItem({ item, openModalItem }: Props) {
	const isAdmin = useAdminStore(s => s.isAdmin)

	return (
		<>
			<Link
				href={'#'}
				className={styles.card}
			>
				{isAdmin && (
					<div className={styles.button}>
						<button
							type='button'
							onClick={() => openModalItem('delete', item)}
						>
							<Trash2 />
						</button>
						<button
							type='button'
							onClick={() => openModalItem('update', item)}
						>
							<Edit />
						</button>
					</div>
				)}
				<Image
					src={item.photo || '/images/no_image.webp'}
					alt={`Фото семинара: ${item.title}`}
					fill
					sizes='(max-width: 1080px) 100svw, (max-width: 1920px) 100svw, (max-width: 2560px) 90svw, 50svw'
				/>
				<div className={styles.content}>
					<time
						className={styles.time}
						dateTime={`${item.date} ${item.time}`}
					>
						{dateFromNow(item.date)} в {item.time}
					</time>
					<h2 className={styles.title}>{item.title}</h2>
					<p className={styles.description}>{item.description}</p>
				</div>
			</Link>
		</>
	)
}

interface PropsSkeleton {
	cols?: number
	rows?: number
}

export function SeminarItemSkeletonLoader({
	cols = 1,
	rows = 1
}: PropsSkeleton) {
	return Array.from({ length: cols * rows }).map((_, index) => (
		<div
			key={`${index}-skeleton`}
			className={`${styles.card} ${styles.skeleton}`}
		/>
	))
}
