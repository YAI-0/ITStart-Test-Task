import cn from 'clsx'
import { type TextareaHTMLAttributes, useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import styles from './Textarea.module.scss'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
	register?: UseFormRegisterReturn
}

export function Textarea({
	label,
	error,
	register,
	className,
	...props
}: Props) {
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
			<textarea
				id={inputId}
				className={`${error ? styles.error : ''}`}
				{...register}
				{...props}
			/>
		</div>
	)
}
