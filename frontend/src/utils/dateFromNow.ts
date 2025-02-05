import dayjs from 'dayjs'

export const dateFromNow = (date: string) => dayjs(date).fromNow()
