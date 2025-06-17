import axios from 'axios';
import { getToken } from '../utils/session/manager';

export const axiosRegister = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

export const registerUser = async (userData: {
	nome: string,
	email: string,
	senha: string
}) => {
	try {
		const payload = {
			nome: userData.nome,
			email: userData.email,
			senha: userData.senha,
			tokens: "1251359",
			telefone: "71854699654",
			nivelConsciencia: "1",
			isMonitor: false,
			avatar: "https://github.com/default-avatar.png"
		};

		const response = await axiosRegister.post('/api/usuario', payload);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.errors?.[0] || 'Erro ao cadastrar usuário');
		}
		throw new Error('Erro desconhecido ao tentar cadastrar')
	}
};

export const axiosLogin = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

export const getApiAxios = async () => {
	const token = await getToken();

	const api = axios.create({
		baseURL: process.env.API_URL,
		headers: {
			Authorization: token,
		},
	});

	return api;
};
export const PostApiAxios = axios.create({
	
	baseURL: process.env.API_URL
});
