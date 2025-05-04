import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBackButton from '../../Components/GoBackButton';
import { removeRememberMeData } from '../../utils/async-storage/user-data';
import { removeToken } from '../../utils/session/manager';
import { userStore } from '../../utils/stores/user';

const MoreOptions = () => {
	const navigation = useNavigation();

	const handleLogoutApp = async () => {
		await removeRememberMeData();
		await removeToken();
		userStore.getState().clearUser();
		navigation.navigate('Wellcome');
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Garantindo que GoBackButton renderiza corretamente */}
			<GoBackButton title="Perfil" style={styles.title} /> 
			
			<View style={styles.mainContainer}>
				<View style={styles.optionsContainer}>
					{/* Opções do menu */}
					<TouchableOpacity
						style={styles.optionButton}
						onPress={() => navigation.navigate('Notifications')}
					>
						<Ionicons name="notifications-outline" size={30} color="#fff" />
						<Text style={styles.optionText}>Notificações</Text>
						<Ionicons name="chevron-forward" size={30} color="#fff" />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.optionButton}
						onPress={() => navigation.navigate('PersonalData')}
					>
						<Ionicons name="person" size={30} color="#fff" />
						<Text style={styles.optionText}>Dados Pessoais</Text>
						<Ionicons name="chevron-forward" size={30} color="#fff" />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.optionButton}
						onPress={() => navigation.navigate('Sobre')}
					>
						<Ionicons name="alert-circle" size={30} color="#fff" />
						<Text style={styles.optionText}>Sobre</Text>
						<Ionicons name="chevron-forward" size={30} color="#fff" />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.optionButton}
						onPress={() => navigation.navigate('Help')}
					>
						<Ionicons name="help-circle-outline" size={30} color="#fff" />
						<Text style={styles.optionText}>Ajuda</Text>
						<Ionicons name="chevron-forward" size={30} color="#fff" />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.optionButton}
						onPress={handleLogoutApp}
					>
						<Ionicons name="exit-outline" size={30} color="#fff" />
						<Text style={styles.optionText}>Sair</Text>
						<Ionicons name="chevron-forward" size={30} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		color: 'black', // Cor do título alterada para preto
	},
	mainContainer: {
		flex: 1,
		justifyContent: 'center', // Centraliza os botões verticalmente
		alignItems: 'center', // Centraliza os botões horizontalmente
	},
	optionsContainer: {
		width: '90%',
		alignItems: 'center',
		gap: 10,
	},
	optionButton: {
		backgroundColor: '#50B454', // Cor de fundo verde claro
		width: '100%', // Ocupa toda a largura da tela
		height: 48,
		marginVertical: 5,
		borderRadius: 20,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowRadius: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
	},
	optionTextContainer: {
		flex: 1,
		alignItems: 'center',
	},
	optionText: {
		color: '#fff', // Texto em branco
		fontFamily: 'poppins-medium',
		fontSize: 20,
		textAlign: 'center', // Centralizar texto
	},
});

export default MoreOptions;
