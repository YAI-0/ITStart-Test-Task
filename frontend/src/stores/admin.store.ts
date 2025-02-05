import { create } from 'zustand'

interface AdminStore {
	isAdmin: boolean
	setIsAdmin: (data: boolean) => void
}

export const useAdminStore = create<AdminStore>(set => ({
	isAdmin: false,
	setIsAdmin: isAdmin => set({ isAdmin })
}))
