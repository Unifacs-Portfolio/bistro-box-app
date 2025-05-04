//FEITO

import { View, Text, FlatList, ImageBackground, Image, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { data } from '../../data/dataEspecialist'; // Substitua com os dados das receitas
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';

const categories = [
    { label: 'Receitas', icon: require('../../assets/icons/recipes-icon.png') },
    // Outras categorias podem ser adicionadas aqui se necessário
];

const CategoryComponent = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['Receitas']);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, [loading]);

    const updateSearch = (search) => {
        setSearch(search);
    };

    const Item = ({ username, description, CategoryIcon, icon, title, useravatar }) => (
        <TouchableOpacity
            style={styles.itemTouchable}
            onPress={() => navigation.navigate('UserDetail', { username, description, CategoryIcon, icon, title, useravatar })}
        >
            <View style={styles.itemContainer}>
                <ImageBackground
                    source={CategoryIcon}
                    style={styles.itemBackground}
                    resizeMode="cover"
                >
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemTitle}>{title}</Text>
                        <Image source={icon} style={styles.itemIcon} />
                    </View>

                    <View style={styles.itemInfo}>
                        <View style={styles.avatarContainer}>
                            <Image source={useravatar} style={styles.avatar} resizeMode="cover" />
                        </View>
                        <Text style={styles.itemUsername}>@{username}</Text>
                    </View>

                    <View style={styles.itemDescription}>
                        <Text style={styles.itemDescriptionText}>
                            {description.length > 70 ? `${description.substring(0, 70)}...` : description}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );

    const filteredData = data.filter(item => selectedCategories.includes(item.category));

    const toggleCategory = (category) => {
        setSelectedCategories(prevSelected => {
            if (prevSelected.includes(category)) {
                return prevSelected.filter(item => item !== category);
            } else {
                return [...prevSelected, category];
            }
        });
    };

    return (
        <View>
            <View style={styles.searchContainer}>
                <View style={styles.searchInner}>
                    <Text style={styles.searchText}>Pesquisar</Text>
                    <SearchBar
                        platform='ios'
                        placeholder="Digite aqui"
                        cancelButtonTitle=""
                        placeholderTextColor="#000"
                        onChangeText={updateSearch}
                        value={search}
                        containerStyle={styles.searchBarContainer}
                        inputContainerStyle={styles.searchBarInput}
                        clearIcon={{ name: 'trash', type: 'ionicon', color: 'red', size: 20 }}
                        searchIcon={{ name: 'search', type: 'ionicon', color: '#4A4A4A', size: 20 }}
                    />
                </View>
            </View>

            <View style={styles.filterTextContainer}>
                <Text style={styles.filterText}>Filtre Por Categoria</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.categoryButton, selectedCategories.includes(category.label) && styles.categoryButtonSelected]}
                        onPress={() => { toggleCategory(category.label); setLoading(true); setCards(true); }}
                    >
                        <Text style={[styles.categoryText, selectedCategories.includes(category.label) && styles.categoryTextSelected]}>
                            {category.label}
                        </Text>
                        <Image source={category.icon} style={styles.categoryIcon} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {cards ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#4A4A4A" />
                    ) : (
                        <FlatList
                            data={filteredData}
                            renderItem={({ item }) => (
                                <Item
                                    username={item.username}
                                    description={item.description}
                                    CategoryIcon={item.CategoryIcon}
                                    icon={item.icon}
                                    title={item.title}
                                    useravatar={item.useravatar}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            contentContainerStyle={styles.flatListContent}
                        />
                    )}
                </ScrollView>
            ) : (
                <View style={styles.noResultContainer}>
                    <Text style={styles.noResultText}>Nenhum Resultado</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: { marginTop: 32, marginBottom: 8 },
    searchInner: { marginHorizontal: 28 },
    searchText: { fontSize: 25, color: '#4A4A4A', fontFamily: 'poppins-medium', opacity: 0.6 },
    searchBarContainer: { backgroundColor: '#F8F8F8' },
    searchBarInput: { backgroundColor: '#FFFFFF' },
    filterTextContainer: { marginHorizontal: 28, marginBottom: 12 },
    filterText: { fontSize: 16, color: '#4A4A4A', fontFamily: 'poppins-medium', opacity: 0.6 },
    categoriesScroll: { marginLeft: 8 },
    categoryButton: {
        backgroundColor: 'white',
        height: 52,
        paddingHorizontal: 16,
        marginHorizontal: 12,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    categoryButtonSelected: { backgroundColor: '#78CAD2' },
    categoryText: { fontSize: 14, color: 'black', fontFamily: 'poppins-medium' },
    categoryTextSelected: { color: 'white' },
    categoryIcon: { width: 24, height: 24, marginLeft: 8 },
    itemTouchable: { alignItems: 'center', shadowOpacity: 0.2, shadowRadius: 4 },
    itemContainer: { height: 180, width: '90%', backgroundColor: 'white', borderRadius: 16, marginTop: 20 },
    itemBackground: { height: '100%', width: '100%', borderRadius: 16, overflow: 'hidden' },
    itemHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12 },
    itemTitle: { fontSize: 22, fontFamily: 'poppins-medium', color: 'black', padding: 4 },
    itemIcon: { height: 32, width: 32 },
    itemInfo: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
    avatarContainer: { backgroundColor: 'white', borderRadius: 50, height: 48, width: 48, overflow: 'hidden', marginRight: 12 },
    avatar: { height: '100%', width: '100%' },
    itemUsername: { fontSize: 20, fontFamily: 'poppins-medium', color: 'black' },
    itemDescription: { paddingHorizontal: 16 },
    itemDescriptionText: { fontSize: 16, fontFamily: 'poppins-medium', color: '#767676' },
    loadingIndicator: { marginVertical: 192 },
    flatListContent: { paddingBottom: 800 },
    noResultContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    noResultText: { fontSize: 16, marginTop: 128, color: '#4A4A4A', fontFamily: 'poppins-medium', opacity: 0.6 },
});

export default CategoryComponent;
