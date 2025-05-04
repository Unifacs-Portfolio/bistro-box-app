import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from '../../Components/spinner';
import { PostApiAxios, getApiAxios } from '../../services/axios';
import { getToken } from '../../utils/session/manager';
import { getUserDetails } from '../../utils/session/user-data';
import { UploadFormData } from '../../utils/types/form/formData';
import { NavigationProp } from '../../utils/types/navigation';
import { UserResponse } from '../../utils/types/user-response';

const Upload = () => {
	const [media, setMedia] = React.useState<string | null>(null);
	const [mediaType, setMediaType] = React.useState<'image' | 'video' | null>(
		null,
	);
	const [titulo, setTitulo] = React.useState('');
	const [conteudo, setConteudo] = React.useState('');
	const [successfulUploadModalVisible, setSuccessfulUploadModalVisible] =
		React.useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUserProfile] = useState<UserResponse | undefined>(undefined);

	const navigation = useNavigation<NavigationProp>();

	const fetchUploadPost = async (data: UploadFormData) => {
		try {
			setLoading(true);
			const imageCover: any = {
				uri: data.fotos[0].uri,
				name: data.fotos[0].name ?? 'unknown.jpg',
				type: data.fotos[0].type ?? 'image/jpeg',
			};

			const formData = new FormData();
			formData.append('files', imageCover);
			formData.append('tema', 'Gastro');
			formData.append('subtema', 'Gastro')
			formData.append('idUsuario', user?.email ?? '');
			formData.append('titulo', data.titulo);
			formData.append('conteudo', data.conteudo);

			const api = await getApiAxios();
			// Atualizado para o endpoint correto
			await api.postForm('/api/receitas', formData);

			alert('Post criado com sucesso!');
			setSuccessfulUploadModalVisible(true);
		} catch (error: any) {
			if (error.response) {
				console.error('Erro na resposta:', error.response.data);
				console.error('Status do erro:', error.response.status);
				console.error('Cabeçalhos do erro:', error.response.headers);
				Alert.alert('Erro', 'Houve um problema no servidor. Tente novamente mais tarde.');
			} else if (error.request) {
				console.error('Erro na requisição:', error.request);
				Alert.alert('Erro', 'Problema de rede. Verifique sua conexão e tente novamente.');
			} else {
				console.error('Erro geral:', error.message);
				Alert.alert('Erro', 'Ocorreu um erro desconhecido. Tente novamente.');
			}
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			(async () => {
				const token = await getToken();
				if (!token) {
					alert('Você precisa realizar o login para acessar!');
					navigation.navigate('LogIn');
					return;
				} else {
					const user = await getUserDetails();
					setUserProfile(user as UserResponse);
				}
				setLoading(false);
			})();
			return () => {
				setLoading(true);
			};
		}, []),
	);

	const pickMedia = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			const selectedAsset = result.assets[0];
			setMedia(selectedAsset.uri);
		}
	};

	const clearMedia = () => {
		setMedia(null);
		setMediaType(null);
	};

	const handlePost = () => {
		setSuccessfulUploadModalVisible(true);
		fetchUploadPost(uploadData);
	};

	const uploadData: UploadFormData = {
		titulo: titulo,
		conteudo: conteudo,
		tema: 'Gastro',
		fotos: [
			{
				uri: media ?? '',
				name: 'uploaded_media.jpg',
				type: mediaType === 'image' ? 'image/jpeg' : 'video/mp4',
			},
		],
	};

	const isButtonDisabled =
		!media || titulo.trim() === '' || conteudo.trim() === '';

	if (loading) return <Spinner />;

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<SafeAreaView style={styles.safeArea}>
					<View style={styles.card}>
						<View style={styles.cardContent}>
							<View style={styles.mediaContainer}>
								{media ? (
									<View style={styles.mediaPreview}>
										{mediaType === 'video' ? (
											<Video
												source={{ uri: media }}
												style={styles.media}
												useNativeControls
												isLooping
											/>
										) : (
											<Image source={{ uri: media }} style={styles.media} />
										)}
										<TouchableOpacity onPress={clearMedia} style={styles.trashIcon}>
											<Ionicons name="trash" size={24} color="red" />
										</TouchableOpacity>
									</View>
								) : (
									<TouchableOpacity onPress={pickMedia} style={styles.addMedia}>
										<Ionicons name="add-circle" size={60} color="#B0BEC5" />
										<Text style={styles.addMediaText}>Selecionar arquivo</Text>
									</TouchableOpacity>
								)}
							</View>

							<TextInput
								placeholder="Escreva o título aqui..."
								value={titulo}
								onChangeText={setTitulo}
								style={styles.titleInput}
								scrollEnabled={false}
								maxLength={20}
							/>

							<View style={styles.contentInputContainer}>
								<TextInput
									placeholder="Escreva sobre o seu post..."
									value={conteudo}
									onChangeText={setConteudo}
									multiline
									style={styles.contentInput}
								/>
							</View>

							<TouchableOpacity
								style={[
									styles.submitButton,
									isButtonDisabled && styles.submitButtonDisabled,
								]}
								onPress={handlePost}
								disabled={isButtonDisabled}
							>
								<Text style={styles.submitButtonText}>Enviar</Text>
							</TouchableOpacity>
						</View>
					</View>

					<Modal
						transparent
						visible={successfulUploadModalVisible}
						animationType="fade"
						onRequestClose={() => setSuccessfulUploadModalVisible(false)}
					>
						<View style={styles.modalContainer}>
							<View style={styles.modalContent}>
								<Ionicons name="checkmark-circle" size={60} color="#50B454" />
								<Text style={styles.modalTitle}>Post enviado para validação!</Text>
								<Text style={styles.modalDescription}>
									Você será informado assim que a validação for concluída.
								</Text>
								<TouchableOpacity
									onPress={() => setSuccessfulUploadModalVisible(false)}
									style={styles.modalButton}
								>
									<Text style={styles.modalButtonText}>Certo</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F9F9F9',
	},
	safeArea: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 16,
	},
	card: {
		width: '92%',
		backgroundColor: '#EDEDED',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 32,
		borderRadius: 8,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
	},
	cardContent: {
		width: '83%',
	},
	mediaContainer: {
		backgroundColor: '#FFFFFF',
		width: '100%',
		height: '40%',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
	},
	mediaPreview: {
		position: 'relative',
		flex: 1,
		width: '100%',
		height: '100%',
	},
	media: {
		width: '100%',
		height: '100%',
		borderRadius: 8,
	},
	trashIcon: {
		position: 'absolute',
		top: 8,
		right: 8,
		backgroundColor: '#FFF',
		borderRadius: 16,
		padding: 4,
	},
	addMedia: {
		alignItems: 'center',
	},
	addMediaText: {
		fontSize: 16,
		color: '#B0BEC5',
		fontFamily: 'poppins-medium',
	},
	titleInput: {
		fontSize: 18,
		color: '#455A64',
		paddingVertical: 16,
		fontFamily: 'poppins-medium',
	},
	contentInputContainer: {
		backgroundColor: '#FFFFFF',
		width: '100%',
		height: 130,
		borderRadius: 8,
		padding: 10,
	},
	contentInput: {
		fontSize: 14,
		color: '#455A64',
		fontFamily: 'poppins-regular',
	},
	submitButton: {
		width: '100%',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#50B454',
		borderRadius: 8,
		marginTop: 32,
	},
	submitButtonDisabled: {
		opacity: 0.5,
	},
	submitButtonText: {
		fontSize: 18,
		color: '#FFFFFF',
		fontFamily: 'poppins-medium',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: '#50B454',
		width: '80%',
		padding: 24,
		borderRadius: 12,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
	},
	modalTitle: {
		fontSize: 18,
		color: '#1F3B4D',
		textAlign: 'center',
		marginBottom: 8,
		fontFamily: 'poppins-medium',
	},
	modalDescription: {
		fontSize: 16,
		color: '#455A64',
		textAlign: 'center',
		marginBottom: 16,
		fontFamily: 'poppins-regular',
	},
	modalButton: {
		width: '100%',
		paddingVertical: 12,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#50B454',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
	},
	modalButtonText: {
		fontSize: 16,
		color: '#FFFFFF',
		fontFamily: 'poppins-medium',
	},
});

export default Upload;
