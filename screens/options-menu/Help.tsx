import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBackButton from '../../Components/GoBackButton';

const Help = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isExpandedQuest1, setIsExpandedQuest1] = useState(false);
	const [isExpandedQuest2, setIsExpandedQuest2] = useState(false);
	const [isExpandedQuest3, setIsExpandedQuest3] = useState(false);
	const [isExpandedQuest4, setIsExpandedQuest4] = useState(false);

	const toggleExpansion = () => setIsExpanded(!isExpanded);
	const toggleExpansionQuest1 = () => setIsExpandedQuest1(!isExpandedQuest1);
	const toggleExpansionQuest2 = () => setIsExpandedQuest2(!isExpandedQuest2);
	const toggleExpansionQuest3 = () => setIsExpandedQuest3(!isExpandedQuest3);
	const toggleExpansionQuest4 = () => setIsExpandedQuest4(!isExpandedQuest4);

	return (
		<ScrollView contentContainerStyle={styles.scrollViewContent}>
			<GoBackButton title="Ajuda" />
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>Guia de Árvores</Text>
				<TouchableOpacity
					onPress={toggleExpansion}
					style={styles.dropdownContainer}
				>
					<Text style={styles.dropdownText}>Guia de Perfil Consumidor Verde</Text>
					<Ionicons
						name={isExpanded ? 'chevron-up' : 'chevron-down'}
						size={20}
						color="black"
					/>
				</TouchableOpacity>

				{isExpanded && (
					<View style={styles.expandedContainer}>
						<Text style={styles.expandedHeaderText}>O que são essas árvores?</Text>
						<Text style={styles.expandedBodyText}>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's
						</Text>
						<ScrollView>
							<View style={styles.treeContainer}>
								<View style={styles.treeItem}>
									<Image
										source={require('../../assets/icons/IconsLevel/arvore1.1.png')}
										style={styles.treeImage}
									/>
									<View style={styles.treeTitleContainer}>
										<Text style={styles.treeTitle}>Consumidor Imprudente</Text>
									</View>
									<View style={styles.treeDescriptionContainer}>
										<Text style={styles.treeDescription}>
											Seus hábitos de consumo acabam que por prejudicar a
											natureza em graus bem negativos.
										</Text>
									</View>
								</View>
							</View>
							{/* Adicione os outros níveis aqui, seguindo o mesmo modelo */}
						</ScrollView>
					</View>
				)}

				<Text style={styles.faqHeader}>Perguntas Frequentes</Text>
				<View style={styles.faqContainer}>
					<TouchableOpacity
						onPress={toggleExpansionQuest1}
						style={styles.dropdownContainer}
					>
						<Text style={styles.dropdownText}>O que são essas árvores?</Text>
						<Ionicons
							name={isExpandedQuest1 ? 'chevron-up' : 'chevron-down'}
							size={20}
							color="black"
						/>
					</TouchableOpacity>
					{isExpandedQuest1 && (
						<View style={styles.expandedContainer}>
							<Text style={styles.expandedHeaderText}>Lorem Ipsum</Text>
							<Text style={styles.expandedBodyText}>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's
							</Text>
						</View>
					)}
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollViewContent: {
		paddingBottom: 800,
		paddingTop: 20,
	},
	headerContainer: {
		alignItems: 'center',
		marginTop: 16,
	},
	headerText: {
		fontSize: 22,
		fontWeight: '600',
		color: '#50B454',
		padding: 1,
		fontFamily: 'poppins-medium',
	},
	dropdownContainer: {
		backgroundColor: '#D9D9D9',
		height: 50,
		width: '90%',
		borderRadius: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 16,
		marginTop: 16,
	},
	dropdownText: {
		fontSize: 14,
		fontWeight: '600',
		color: 'black',
		fontFamily: 'poppins-medium',
	},
	expandedContainer: {
		backgroundColor: '#D9D9D9',
		width: '90%',
		marginTop: 8,
		padding: 16,
		borderRadius: 8,
	},
	expandedHeaderText: {
		fontSize: 14,
		color: 'black',
		fontFamily: 'poppins-medium',
	},
	expandedBodyText: {
		fontSize: 11,
		color: '#767676',
		marginVertical: 8,
		fontFamily: 'poppins-medium',
	},
	treeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	treeItem: {
		backgroundColor: 'white',
		width: '97%',
		height: 128,
		marginVertical: 8,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 4,
		position: 'relative',
	},
	treeImage: {
		height: 100,
		width: 110,
		marginHorizontal: 8,
	},
	treeTitleContainer: {
		position: 'absolute',
		top: 12,
		left: 128,
		backgroundColor: 'black',
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	treeTitle: {
		color: '#fcff31',
		fontSize: 13,
		fontWeight: '600',
		fontFamily: 'poppins-medium',
	},
	treeDescriptionContainer: {
		flex: 1,
		marginLeft: 8,
	},
	treeDescription: {
		fontSize: 10,
		marginTop: 16,
		color: '#767676',
		width: 160,
		fontFamily: 'poppins-medium',
	},
	faqHeader: {
		fontSize: 18,
		fontWeight: '600',
		color: '#50B454',
		marginTop: 32,
		fontFamily: 'poppins-medium',
	},
	faqContainer: {
		alignItems: 'center',
	},
});

export default Help;
