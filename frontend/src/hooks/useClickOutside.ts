import { type RefObject, useCallback, useEffect } from 'react'

export function useClickOutside(
	ref: RefObject<HTMLElement | null>,
	callback: () => void,
	disabled: boolean = false
) {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (!ref.current?.contains(event.target as Node)) {
				callback()
			}
		},
		[ref, callback]
	)

	useEffect(() => {
		if (!ref.current || disabled) return

		const controller = new AbortController()
		const signal = { signal: controller.signal }

		document.addEventListener('click', handleClickOutside, signal)

		return () => controller.abort()
	}, [ref, handleClickOutside, disabled])
}
