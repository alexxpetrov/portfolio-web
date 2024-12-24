import dayjs from 'dayjs';

export const formatTime = (date: string) => dayjs(date).format('HH:mm');
export const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY');
export const formatLogDate = (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm');
