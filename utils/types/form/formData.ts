import { Foto } from '../post';

export interface RegisterFormData {
	email: string;
	senha: string;
	nome: string;
	confirmPassword: string;
}

export interface LoginFormData {
	email: string;
	senha: string;
}

export interface ForgotFormData {
	email: string;
}

export interface UploadFormData {
	tema: string;
	titulo: string;
	conteudo: string;
	fotos: Foto[];
}
