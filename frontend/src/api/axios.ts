import axios, { type CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	adapter: 'fetch',
	baseURL: 'http://localhost:4000',
	headers: {
		'Content-Type': 'application/json'
	}
}

const axiosBase = axios.create(options)

export { axiosBase }
