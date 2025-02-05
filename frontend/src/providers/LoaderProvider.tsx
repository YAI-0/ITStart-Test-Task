'use client'

import {
	type PropsWithChildren,
	createContext,
	useContext,
	useMemo,
	useState
} from 'react'

interface LoaderContextProps {
	globalLoading: boolean
	loadingItems: Set<string>
	setGlobalLoading: (isGlobal: boolean) => void
	startLoading: (id: string) => void
	stopLoading: (id: string) => void
	clearLoading: () => void
}

const LoaderContext = createContext<LoaderContextProps | null>(null)

export const useLoaderContext = () => {
	const context = useContext(LoaderContext)
	if (!context)
		throw new Error('useLoaderContext must be used within LoaderProvider')
	return context
}

export const LoaderProvider = ({ children }: Readonly<PropsWithChildren>) => {
	const [globalLoading, setGlobalLoading] = useState(false)
	const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set())

	const startLoading = (id: string) => {
		setLoadingItems(prev => {
			if (prev.has(id)) return prev
			const newSet = new Set(prev)
			newSet.add(id)
			return newSet
		})
	}

	const stopLoading = (id: string) => {
		setLoadingItems(prev => {
			if (!prev.has(id)) return prev
			const newSet = new Set(prev)
			newSet.delete(id)
			return newSet
		})
	}

	const clearLoading = () => {
		setLoadingItems(new Set())
	}

	const value: LoaderContextProps = useMemo(
		() => ({
			globalLoading,
			loadingItems,
			setGlobalLoading,
			startLoading,
			stopLoading,
			clearLoading
		}),
		[globalLoading, loadingItems]
	)

	return <LoaderContext value={value}>{children}</LoaderContext>
}
