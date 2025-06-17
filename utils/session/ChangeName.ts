export const ChangeName = async (novoNome: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { mensagem: 'Nome alterado com sucesso!' };
};