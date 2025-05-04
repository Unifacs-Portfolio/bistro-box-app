import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StyleSheet,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { axiosLogin } from '../../services/axios';
import {
	checkIsRemember,
	removeRememberMeData,
	storeRememberMeData,
} from '../../utils/async-storage/user-data';
import { getToken, saveToken } from '../../utils/session/manager';
import { LoginFormData } from '../../utils/types/form/formData';
import { NavigationProp } from '../../utils/types/navigation';
import { TokenResponse } from '../../utils/types/token';

export default function LogIn() {
	const navigation = useNavigation<NavigationProp>();
	const [rememberMe, setRememberMe] = useState(false);
	const { control, handleSubmit, formState } = useForm<LoginFormData>();
	const { isSubmitting } = formState;

	const handleLoginFormSubmit = async (data: LoginFormData) => {
		try {
			const { data: tokenObject } = await axiosLogin.post<TokenResponse>(
				'/api/usuario/login',
				{
					email: data.email,
					senha: data.password,
				},
			);

			await saveToken(tokenObject.token);

			if (rememberMe) {
				await storeRememberMeData();
			} else {
				await removeRememberMeData();
			}

			alert('Login realizado com sucesso!');
			navigation.navigate('Main');
		} catch (error: any) {
			console.error(error.response);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			(async () => {
				const isRemember = await checkIsRemember();
				const token = await getToken();
				if (isRemember && token) navigation.navigate('Main');
			})();
			return () => {
				// Do something when the screen is unfocused
			};
		}, []),
	);

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView style={styles.scrollContainer}>
				<View style={styles.formContainer}>
					{/* Header */}
					<View style={styles.header}>
						<Image
							source={require('../../assets/images/login/ImagemDeFundo.png')}
							style={styles.headerImage}
						/>
						<View style={styles.logoContainer}>
							<Text style={styles.title}>Bistro Box</Text>
							<Text style={styles.subtitle}>Pense fora da caixa</Text>
						</View>
					</View>

					{/* Main Form */}
					<View style={styles.mainForm}>
						<Text style={styles.welcomeText}>Bem-vindo de Volta!</Text>
						<Text style={styles.subtitleText}>Faça login na sua conta</Text>

						{/* Email Input */}
						<View style={styles.inputContainer}>
							<View style={styles.inputLabelContainer}>
								<Ionicons name="person-sharp" size={20} />
								<Text style={styles.inputLabel}>Email</Text>
							</View>

							<Controller
								control={control}
								name="email"
								rules={{
									required: 'O Email é obrigatorio',
									minLength: {
										value: 3,
										message: 'Este campo deve ter no minimo 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										<TextInput
											style={styles.input}
											placeholder="Email"
											value={value}
											onChangeText={onChange}
											keyboardType="email-address"
											autoCapitalize="none"
										/>
										{error && <Text style={styles.errorText}>{error.message}</Text>}
									</>
								)}
							/>
						</View>

						{/* Password Input */}
						<View style={styles.inputContainer}>
							<View style={styles.inputLabelContainer}>
								<Ionicons name="lock-closed" size={20} />
								<Text style={styles.inputLabel}>Senha</Text>
							</View>

							<Controller
								control={control}
								name="password"
								rules={{
									required: 'A senha é obrigatoria',
									minLength: {
										value: 3,
										message: 'A senha deve ter pelo menos 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
									pattern: {
										value:
											/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
										message:
											'Senha inválida. Por favor, verifique e tente novamente.',
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
											secureTextEntry={true}
											autoCapitalize="none"
										/>
										{error && <Text style={styles.errorText}>{error.message}</Text>}
									</>
								)}
							/>
						</View>

						{/* Remember me and Forgot Password */}
						<View style={styles.rememberContainer}>
							<View style={styles.rememberMeContainer}>
								<TouchableOpacity
									style={[
										styles.checkbox,
										rememberMe ? styles.checked : styles.unchecked,
									]}
									onPress={() => setRememberMe(!rememberMe)}
								>
									{rememberMe && (
										<View style={styles.checkboxInner}>
											<Ionicons
												name="checkbox-outline"
												size={20}
												color="white"
											/>
										</View>
									)}
								</TouchableOpacity>

								<Text style={styles.rememberMeText}>Lembrar de Mim</Text>
								<TouchableOpacity
									onPress={() => navigation.navigate('ForgotPassword')}
								>
									<Text style={styles.forgotPasswordText}>
										Esqueceu sua Senha?
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						{/* Submit Button */}
						<TouchableOpacity
							style={styles.submitButton}
							onPress={handleSubmit(handleLoginFormSubmit)}
							disabled={isSubmitting}
						>
							<Text style={styles.submitButtonText}>Entrar</Text>
						</TouchableOpacity>

						{/* Register Link */}
						<View style={styles.registerLinkContainer}>
							<Text style={styles.registerText}>Não tem uma Conta?</Text>
							<TouchableOpacity
								onPress={() => navigation.navigate('Register')}
							>
								<Text style={styles.registerLink}>Registre-se</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#FFFFFF', // Branco para contraste
		textAlign: 'center',
		letterSpacing: 2,
	},
	subtitle:{
		fontSize: 16,
		fontWeight: '400',
		color: '#FFFFFF',
		textAlign: 'center',
		marginTop: 8,
		letterSpacing: 1,
	},
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	scrollContainer: {
		backgroundColor: '#FFFFFF',
	},
	formContainer: {
		backgroundColor: '#FFFFFF',
	},
	header: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 250,
		marginBottom: 24,
	},
	headerImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: '#FFFFFF',
		objectFit: 'cover',
	},
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainForm: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F9F9F9',
	},
	welcomeText: {
		fontFamily: 'poppins-semi-bold',
		color: '#5A5A5A',
		marginBottom: 12,
		fontSize: 24,
	},
	subtitleText: {
		color: '#767676',
		marginBottom: 12,
		fontSize: 16,
	},
	inputContainer: {
		width: '80%',
		marginBottom: 16,
	},
	inputLabelContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	inputLabel: {
		fontFamily: 'poppins-semi-bold',
		color: '#5A5A5A',
		marginLeft: 8,
	},
	input: {
		backgroundColor: '#EDEDED',
		borderColor: '#5B5B5B',
		borderWidth: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
	},
	errorText: {
		fontFamily: 'poppins-semi-bold',
		color: '#ff375b',
		fontSize: 12,
		marginLeft: 8,
	},
	rememberContainer: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 24,
	},
	rememberMeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkbox: {
		width: 24,
		height: 24,
		borderRadius: 4,
		borderWidth: 2,
	},
	checked: {
		backgroundColor: '#D9D9D9',
	},
	unchecked: {
		backgroundColor: 'white',
		borderColor: '#D9D9D9',
	},
	checkboxInner: {
		width: '100%',
		height: '100%',
		backgroundColor: '#5A5A5A',
		justifyContent: 'center',
		alignItems: 'center',
	},
	rememberMeText: {
		color: '#5A5A5A',
		marginLeft: 8,
	},
	forgotPasswordText: {
		fontFamily: 'poppins-semi-bold',
		color: '#5A5A5A',
		fontSize: 14,
		marginLeft: 24,
	},
	submitButton: {
		width: '80%',
		backgroundColor: '#50B454',
		shadowOpacity: 0.1,
		paddingVertical: 12,
		marginBottom: 16,
		borderRadius: 12,
	},
	submitButtonText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 18,
	},
	registerLinkContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
	},
	registerText: {
		color: '#5A5A5A',
	},
	registerLink: {
		fontFamily: 'poppins-semi-bold',
		color: '#50B454',
		fontSize: 14,
		marginLeft: 4,
	},
});

