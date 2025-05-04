export interface Foto {
	uri: string;
	name: string,
	type: string
}
export interface Post {
	id: number;
	idUsuario: string;
	titulo: string;
	conteudo: string;
	fotos: Foto[];
}
