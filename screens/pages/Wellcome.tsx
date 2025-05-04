import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ImageBackground, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { checkIsRemember } from '../../utils/async-storage/user-data';
import { getToken } from '../../utils/session/manager';
import { NavigationProp } from '../../utils/types/navigation';

export default function Wellcome() {
	const navigation = useNavigation<NavigationProp>();

	useFocusEffect(
		React.useCallback(() => {
			const checkLoginStatus = async () => {
				try {
					const isRemember = await checkIsRemember();
					const token = await getToken();
					if (isRemember && token) navigation.navigate('Main');
				} catch (error) {
					console.error('Error checking login status:', error);
				}
			};
			checkLoginStatus();
			return undefined;
		}, [navigation]),
	);

	return (
		<ImageBackground
			source={require('../../assets/images/background.png')} // Caminho para a imagem de fundo
			style={styles.background}
			resizeMode="cover"
		>
			{/* Título do app */}
			<View style={styles.header}>
				<Text style={styles.title}>BISTRÔ BOX</Text>
				<Text style={styles.subtitle}>PENSE FORA DA CAIXA</Text>
			</View>

			{/* Botões */}
			<TouchableOpacity
				style={styles.createProfileButton}
				onPress={() => navigation.navigate('Register')}
				activeOpacity={0.7}
				accessible={true}
				accessibilityLabel="Criar perfil"
				accessibilityHint="Navegar para a tela de registro"
			>
				<Text style={styles.createProfileText}>Crie seu Perfil</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.loginButton}
				onPress={() => navigation.navigate('LogIn')}
				activeOpacity={0.7}
				accessible={true}
				accessibilityLabel="Entrar"
				accessibilityHint="Navegar para a tela de login"
			>
				<Text style={styles.loginText}>Entrar</Text>
			</TouchableOpacity>

			{/* Rodapé */}
			<View style={styles.footer}>
				<TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
					<Text style={styles.privacyPolicyText}>
						Política de Privacidade | Termos e Condições
					</Text>
				</TouchableOpacity>
				<Text style={styles.footerText}>© 2024 Consumo Inteligente</Text>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 40,
	},
	header: {
		alignItems: 'center',
		marginTop: 325, // Espaço superior para alinhar com a imagem
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#FFFFFF', // Branco para contraste
		textAlign: 'center',
		letterSpacing: 2,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: '400',
		color: '#FFFFFF',
		textAlign: 'center',
		marginTop: 8,
		letterSpacing: 1,
	},
	createProfileButton: {
		marginTop:150,
		width: '80%',
		backgroundColor: '#50B454',
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowRadius: 5,
		paddingVertical: 16,
		borderRadius: 30, // Bordas arredondadas mais suaves
		alignSelf: 'center',
	},
	createProfileText: {
		color: '#FFFFFF',
		fontSize: 18,
		textAlign: 'center',
		fontWeight: '600',
	},
	loginButton: {
		marginTop:0,
		width: '80%',
		backgroundColor: '#FFFFFF',
		borderColor: '#50B454',
		borderWidth: 2,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowRadius: 5,
		paddingVertical: 16,
		borderRadius: 30,
		alignSelf: 'center',
	},
	loginText: {
		color: '#50B454',
		fontSize: 18,
		textAlign: 'center',
		fontWeight: '600',
	},
	footer: {
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	privacyPolicyText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#000000',
		textAlign: 'center',
		marginBottom: 4,
	},
	footerText: {
		fontSize: 12,
		color: '#000000',
		textAlign: 'center',
	},
});
