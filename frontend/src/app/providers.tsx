'use client'

import { type PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

import '@/config/day-js.config'

import { LoaderProvider } from '@/providers/LoaderProvider'
import { QueryProvider } from '@/providers/QueryProvider'

export function Providers({ children }: Readonly<PropsWithChildren>) {
	return (
		<QueryProvider>
			<LoaderProvider>{children}</LoaderProvider>
			<Toaster
				position='bottom-right'
				reverseOrder={false}
				toastOptions={{
					className: 'toaster',
					duration: 1600
				}}
			/>
		</QueryProvider>
	)
}
