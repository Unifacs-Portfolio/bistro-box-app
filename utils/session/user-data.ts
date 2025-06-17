import { userStore } from '../stores/user';
import { UserResponse } from '../types/user-response';

// Mock para getUserDetails
export const getUserDetails = async () => {
    // Simula delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const mockUser: UserResponse = {
        nome: 'Mock User',
        email: 'mock@email.com',
        telefone: '11999999999',
		fotoUsu : null,
		isMonitor:false, 
		nivelConsciencia:5,      
		// adicione outros campos necessários do UserResponse
    };
    userStore.getState().setUser(mockUser);
    return mockUser;
};

// Mock para getUserDetailsByEmail
export const getUserDetailsByEmail = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const mockUser: UserResponse = {
        nome: 'Mock User',
        email,
        telefone: '11999999999',
		fotoUsu : null,
		isMonitor : false,
		nivelConsciencia: 5,
        // adicione outros campos necessários do UserResponse
    };
    return mockUser;
};
