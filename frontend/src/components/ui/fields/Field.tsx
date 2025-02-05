import cn from 'clsx'
import { type InputHTMLAttributes, useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import styles from './Field.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	register?: UseFormRegisterReturn
}

export function Field({ label, error, className, register, ...props }: Props) {
	const inputId = useId()

	return (
		<div className={cn(styles.container, className)}>
			{label && (
				<label
					htmlFor={inputId}
					className={`${error ? styles.error : ''}`}
				>
					{error || label}
				</label>
			)}
			<input
				id={inputId}
				className={`${error ? styles.error : ''}`}
				{...register}
				{...props}
			/>
		</div>
	)
}
