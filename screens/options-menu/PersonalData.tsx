import { View, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import ProfilePhotoPicker from '../../Components/PersonalData/ImagesPicker';
import PersonalDataButton from '../../Components/PersonalData/PersonalDataButton';
import { useNavigation } from '@react-navigation/native';
import GoBackButton from '../../Components/GoBackButton';
import { NavigationProp } from '../../utils/types/navigation';

const PersonalData: React.FC = () => {

  const navigation = useNavigation<NavigationProp>();

  const handleSaveChanges = () => {
    // Lógica para salvar alterações
    console.log('Alterações salvas!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <GoBackButton title='Informações da Conta' />

        {/* Banner + Foto do Perfil */}
        <View style={styles.profileContainer}>

          <ProfilePhotoPicker />

          <View style={styles.buttonsContainer}>
            <PersonalDataButton onPress={() => navigation.navigate('ChangeName')} text='Nome' />
            <PersonalDataButton onPress={() => navigation.navigate('ChangeUsername')} text='Nome de Usuário' />
            <PersonalDataButton onPress={() => navigation.navigate('ChangeEmail')} text='Email' />
            <PersonalDataButton onPress={() => navigation.navigate('ChangePassword')} text='Senha' />
            <PersonalDataButton onPress={() => navigation.navigate('ChangeTelephone')} text='Telefone' />
          </View>
        </View>
      </ScrollView>

      {/* Container para o botão de salvar alterações */}
      <View style={styles.saveContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16, // substituindo 'mt-4' com margem superior
  },
  scrollContainer: {
    paddingBottom: 20, // Adiciona espaçamento inferior para o ScrollView
  },
  profileContainer: {
    marginTop: 56, // espaçamento maior para o banner
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: 56, // espaçamento entre os botões
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%', // Largura do input
    height: 48, // Altura do input
    backgroundColor: '#D3F9D8', // Cor verde bem claro
    borderRadius: 8, // Bordas arredondadas
    paddingHorizontal: 16, // Padding horizontal
    marginTop: 20, // Espaçamento superior
    fontSize: 16, // Tamanho da fonte
    color: '#333', // Cor do texto
  },
  saveContainer: {
    alignItems: 'center', // Centraliza o botão
    marginTop: 20, // Espaçamento superior para o botão
    paddingBottom: 20, // Padding inferior
  },
  saveButton: {
    backgroundColor: '#50B454', // Cor de fundo verde claro
    width: '80%', // Largura do botão
    height: 48, // Altura do botão
    borderRadius: 8, // Bordas arredondadas
    justifyContent: 'center', // Alinha o texto centralizado
    alignItems: 'center', // Alinha o texto centralizado
  },
  saveButtonText: {
    color: '#fff', // Texto branco
    fontSize: 18, // Tamanho da fonte
    fontFamily: 'poppins-medium', // Fonte
  },
});

export default PersonalData;