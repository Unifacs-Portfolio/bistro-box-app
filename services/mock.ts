export async function mockRegister(data: any) {
    // Simula um delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Simula sucesso ou erro
    if (data.email === 'erro@email.com') {
        const error = { response: { status: 400, data: { mensagem: 'Email já cadastrado' } } };
        throw error;
    }
    return { mensagem: 'Perfil criado com sucesso!' };
}

export async function mockLogin(data: any) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (data.email === 'teste@email.com' && data.password === 'Senha@123') {
        return { token: 'mock-token-123' };
    }
    const error = { response: { status: 401, data: { mensagem: 'Credenciais inválidas' } } };
    throw error;
}