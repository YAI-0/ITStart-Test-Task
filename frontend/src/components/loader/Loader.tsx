import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import cn from 'clsx'
import type { HTMLAttributes } from 'react'

import { useLoaderContext } from '@/providers/LoaderProvider'

import styles from './Loader.module.scss'
import type { LoaderProps } from './Loader.types'

// Работает в режиме 'default' если не указан id | isLoading | mode

const loaderStyles = {
	spinner: styles.spinner,
	pulsing: styles.pulsing,
	dotted: styles.dotted,
	bars: styles.bars,
	image: styles.image
}

export function Loader({
	id,
	isLoading,
	mode = !(id || isLoading) ? 'default' : undefined,
	type = 'spinner',
	className,
	options = { min: false },
	...props
}: LoaderProps & HTMLAttributes<HTMLDivElement>) {
	const { loadingItems, globalLoading } = useLoaderContext()
	const isMutating = useIsMutating()
	const isFetching = useIsFetching()

	const { min } = options

	const isVisible = id
		? loadingItems.has(id)
		: isLoading ||
			(mode === 'all' && (globalLoading || isFetching > 0 || isMutating > 0)) ||
			(mode === 'context' && globalLoading) ||
			(mode === 'default' && (isFetching > 0 || isMutating > 0))

	if (!isVisible) return null

	const loaderStyle = loaderStyles[type] || loaderStyles['spinner']

	return (
		<div
			className={cn(styles.loader, className ? className : styles.loaderStyle)}
			{...props}
		>
			<span
				className={cn(loaderStyle, {
					[styles.min]: min
				})}
			>
				{type === 'spinner' &&
					Array.from({ length: 9 }).map((_, index) => <div key={index} />)}
			</span>
		</div>
	)
}
