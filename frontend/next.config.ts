import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Разрешает ссылки с любых защищенных путей
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	}
}

export default nextConfig
