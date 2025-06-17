import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMenu from '../../Components/buttons/HeaderMenu';
import PostList from '../../Components/profile/PostList';
import ProfileImagesSection from '../../Components/profile/ProfileImagesSection';
import ProfileInfo from '../../Components/profile/ProfileInfo';
import Spinner from '../../Components/spinner';
import { getApiAxios } from '../../services/axios';
import { getToken } from '../../utils/session/manager';
import { getUserDetails } from '../../utils/session/user-data';
import { NavigationProp } from '../../utils/types/navigation';
import { Post } from '../../utils/types/post';
import { UserResponse } from '../../utils/types/user-response';

const Profile = () => {
	const navigation = useNavigation<NavigationProp>();
	const [userProfile, setUserProfile] = useState<UserResponse | null>(null);
	const [userPostagens, setUserPostagens] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchUserPosts = async () => {
		try {
			const api = await getApiAxios();
			const response = await api.get('/api/Culinaria/receitas');
			const userPosts = response.data.receitas.filter(
				(post: Post) => post.idUsuario === userProfile?.email,
			);
			setUserPostagens(userPosts);
		} catch (error) {
			console.error('Erro ao carregar os dados do Usuario:', error);
			Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
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
					setUserProfile(user);

					await fetchUserPosts();
				}
				setLoading(false);
			})();
			return () => {
				setLoading(true);
			};
		}, []),
	);

	if (loading) return <Spinner />;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.header}>
					<HeaderMenu />
				</View>

				<ProfileImagesSection user={userProfile} />

				<ProfileInfo user={userProfile} />

				<View style={styles.postTitleContainer}>
					<Text style={styles.postTitleText}>Postagens</Text>
				</View>

				<PostList posts={userPostagens} />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 45,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		margin: 8,
	},
	postTitleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 40,
		borderBottomWidth: 2,
		borderColor: '#B8B8B8',
		marginTop: 32,
	},
	postTitleText: {
		fontSize: 16,
		color: '#4A4A4A',
		fontFamily: 'poppins-medium',
	},
});

export default Profile;
