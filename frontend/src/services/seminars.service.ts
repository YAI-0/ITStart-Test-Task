import type {
	ISeminar,
	TypeSeminarCreate,
	TypeSeminarUpdate
} from '@/types/seminars.types'

import { axiosBase } from '@/api/axios'

// Сервер для запроса данных из json-server
class SeminarsService {
	private _URL = '/seminars'

	getAll() {
		return axiosBase.get<ISeminar[]>(`${this._URL}`)
	}

	create(data: TypeSeminarCreate) {
		return axiosBase.post(`${this._URL}`, data)
	}

	update(data: TypeSeminarUpdate) {
		return axiosBase.put(`${this._URL}/${data.id}`, data)
	}

	delete(id: string) {
		return axiosBase.delete(`${this._URL}/${id}`)
	}
}

export const seminarsService = new SeminarsService()
