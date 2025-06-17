import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostComponent from '../../Components/posts/home';
import { getApiAxios } from '../../services/axios';
import { getToken } from '../../utils/session/manager';
import { NavigationProp } from '../../utils/types/navigation';
import { Post } from '../../utils/types/post';

const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation<NavigationProp>();

	const fetchPosts = async () => {
		try {
			const api = await getApiAxios();
			const response = await api.get('/api/Culinaria/receitas');

			setPosts(response.data.receitas);
		} catch (error) {
			console.error('Erro ao buscar posts:', error);
			Alert.alert('Erro', 'Não foi possível carregar as Postagens');
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
				}

				fetchPosts();
			})();
			return () => {};
		}, []),
	);

	const renderPost = ({ item }: { item: Post }) => (
		<View style={styles.postContainer}>
			<PostComponent post={item} />
		</View>
	);

	if (loading) {
		return <View style={styles.loadingContainer}></View>;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={posts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderPost}
				ListHeaderComponent={<HomeHeader username="john.doe" />}
				contentContainerStyle={styles.flatListContent}
			/>
		</View>
	);
};

type HomeHeaderProps = {
	username: string;
};

const HomeHeader = ({ username }: HomeHeaderProps) => {
	const navigation = useNavigation<NavigationProp>();

	return (
		<SafeAreaView>
			<View style={styles.headerContainer}>
				<View style={styles.headerContent}></View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 16,
		backgroundColor: 'white',
	},
	postContainer: {
		marginBottom: 16,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	flatListContent: {
		paddingBottom: 45,
	},
	headerContainer: {
		paddingHorizontal: 16,
		marginTop: 24,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerContent: {
		width: '100%',
		height: '100%',
	},
});

export default Home;