import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StyleSheet,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Controller, useForm } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { axiosLogin } from '../../services/axios';
import { RegisterFormData } from '../../utils/types/form/formData';
import { RootStackParamList } from '../../utils/types/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Register() {
	const navigation = useNavigation<NavigationProp>();
	const { control, handleSubmit, formState } = useForm<RegisterFormData>();
	const { isSubmitting } = formState;

	// Estado para alternar visibilidade da senha
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const handleRegisterFormSubmit = async (data: RegisterFormData) => {
		try {
			await axiosLogin.post('/api/usuario', {
				email: data.email,
				senha: data.password,
				nome: data.username,
				nivelConsciencia: 4,
				isMonitor: true,
				tokens: `${Math.random()}`,
				telefone: '123232323',
			});

			alert('Perfil criado com sucesso!');
			navigation.navigate('LogIn');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView style={styles.container}>
				<View style={styles.innerContainer}>
					{/* Header */}
					<View style={styles.header}>
						<Image
							source={require('../../assets/images/login/ImagemDeFundo.png')}
							style={styles.backgroundImage}
						/>
						<View style={styles.logoContainer}>
							<Text style={styles.logo}>Bistro Box</Text>
							<Text style={styles.sublogo}>Pense fora da caixa</Text>
						</View>
					</View>

					{/* Form Section */}
					<View style={styles.formSection}>
						<Text style={styles.title}>Seja Bem-vindo</Text>
						<Text style={styles.subtitle}>Crie sua conta</Text>

						{/* Username Input */}
						<View style={styles.inputGroup}>
							<View style={styles.inputLabelContainer}>
								<Ionicons name="person-sharp" size={20} />
								<Text style={styles.inputLabel}>Usuário</Text>
							</View>

							<Controller
								control={control}
								name="username"
								rules={{
									required: 'Nome de Usuário é obrigatório',
									minLength: {
										value: 3,
										message: 'Nome de Usuário deve ter no mínimo 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
									pattern: {
										value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
										message:
											'O nome só pode conter letras, acentos e espaços. Caracteres especiais são inválidos.',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										<TextInput
											style={styles.input}
											placeholder="Nome de Usuário"
											value={value}
											onChangeText={onChange}
											autoCapitalize="none"
										/>
										{error && (
											<Text style={styles.errorText}>{error.message}</Text>
										)}
									</>
								)}
							/>
						</View>

						{/* Email Input */}
						<View style={styles.inputGroup}>
							<View style={styles.inputLabelContainer}>
								<Ionicons name="mail" size={20} />
								<Text style={styles.inputLabel}>Email</Text>
							</View>

							<Controller
								control={control}
								name="email"
								rules={{
									required: 'Email é obrigatório',
									pattern: {
										value:
											/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
										message: 'Email inválido',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										<TextInput
											style={styles.input}
											placeholder="Digite seu Email"
											value={value}
											onChangeText={onChange}
											autoCapitalize="none"
										/>
										{error && (
											<Text style={styles.errorText}>{error.message}</Text>
										)}
									</>
								)}
							/>
						</View>

						{/* Password Input */}
						<View style={styles.inputGroup}>
							<View style={styles.inputLabelContainer}>
								<Ionicons name="lock-closed" size={20} />
								<Text style={styles.inputLabel}>Senha</Text>
							</View>

							<Controller
								control={control}
								name="password"
								rules={{
									required: 'A senha é obrigatória',
									minLength: {
										value: 8,
										message: 'A senha deve ter no mínimo 8 caracteres',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										<TextInput
											style={styles.input}
											placeholder="Digite sua senha"
											value={value}
											onChangeText={onChange}
											secureTextEntry={secureTextEntry}
											autoCapitalize="none"
										/>
										{error && (
											<Text style={styles.errorText}>{error.message}</Text>
										)}
										{/* Eye Icon */}
										<TouchableOpacity
											onPress={() => setSecureTextEntry(!secureTextEntry)}
										>
											<Image
												source={{
													uri: secureTextEntry
														? 'https://cdn-icons-png.flaticon.com/512/8442/8442580.png'
														: 'https://cdn.icon-icons.com/icons2/2802/PNG/512/eye_open_icon_178651.png',
												}}
												style={styles.eyeIcon}
											/>
										</TouchableOpacity>
									</>
								)}
							/>
						</View>

						{/* Register Button */}
						<TouchableOpacity
							style={styles.registerButton}
							onPress={handleSubmit(handleRegisterFormSubmit)}
							disabled={isSubmitting}
						>
							<Text style={styles.registerButtonText}>Registrar</Text>
						</TouchableOpacity>
					</View>

					{/* Footer */}
					<View style={styles.footer}>
						<Text style={styles.footerText}>Já tem uma Conta?</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('LogIn')}
						>
							<Text style={styles.footerLink}>Entrar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

// Estilos
const styles = StyleSheet.create({
	logo: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#FFFFFF',
		textAlign: 'center',
		letterSpacing: 2,
	},
	sublogo: {
		fontSize: 16,
		fontWeight: '400',
		color: '#FFFFFF',
		textAlign: 'center',
		marginTop: 8,
		letterSpacing: 1,
	},
	container: {
		flex: 1,
		backgroundColor: '#F9F9F9',
	},
	innerContainer: {
		flex: 1,
		backgroundColor: '#F9F9F9',
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 256,
		marginBottom: 24,
		position: 'relative',
	},
	backgroundImage: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	formSection: {
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#767676',
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 16,
		color: '#767676',
		marginBottom: 16,
	},
	inputGroup: {
		width: '80%',
		marginBottom: 16,
	},
	inputLabelContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	inputLabel: {
		marginLeft: 8,
		fontSize: 14,
		color: '#767676',
		fontWeight: 'bold',
	},
	input: {
		width: '100%',
		padding: 12,
		backgroundColor: '#EDEDED',
		borderWidth: 1,
		borderColor: '#767676',
		borderRadius: 10,
	},
	eyeIcon: {
		width: 24,
		height: 24,
		marginLeft: 8,
	},
	registerButton: {
		width: '80%',
		backgroundColor: '#50B454',
		padding: 12,
		borderRadius: 10,
		alignItems: 'center',
		marginBottom: 16,
	},
	registerButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	errorText: {
		color: '#ff375b',
		fontSize: 12,
		marginTop: 4,
	},
	footer: {
		alignItems: 'center',
		marginTop: 24,
	},
	footerText: {
		color: '#767676',
		fontSize: 14,
	},
	footerLink: {
		color: '#50B454',
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 8,
	},
});
