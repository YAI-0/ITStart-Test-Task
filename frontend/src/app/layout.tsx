import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { PropsWithChildren } from 'react'

import './globals.scss'
import { Providers } from './providers'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Seminars App',
	icons: {
		shortcut: '/favicon.ico'
	}
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
