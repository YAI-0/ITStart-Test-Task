export interface ISeminar {
	id: string
	title: string
	description: string
	date: string
	time: string
	photo: string
}

export type TypeSeminarCreate = {
	id: string
	title: string
	description: string
	date: string
	time: string
	photo?: string
}
export type TypeSeminarUpdate = TypeSeminarCreate
