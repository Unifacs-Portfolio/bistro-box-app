import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBackButton from '../../Components/GoBackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AboutDevsBox, AboutTextBox } from '../../Components/AboutTextBox';

const Sobre = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <GoBackButton title='Sobre' />

        <View style={styles.container}>
          <AboutTextBox
            iconName='information-circle'
            iconSize={30}
            boxTitle='Sobre o aplicativo'
            boxTextContent='A Bistrô Box compartilha dicas práticas e rápidas para promover o consumo consciente e o reaproveitamento inteligente de alimentos. Nosso objetivo é inspirar mudanças simples, mas eficazes, no cotidiano das pessoas, incentivando escolhas que beneficiam tanto o meio ambiente quanto a saúde. Por meio de sugestões criativas, buscamos ajudar a reduzir o desperdício alimentar e transformar a forma como lidamos com os alimentos em nossas casas.'
          />

          <AboutTextBox
            iconName='flag'
            iconSize={30}
            boxTitle='Objetivo'
            boxTextContent='Nosso objetivo é proporcionar soluções práticas e acessíveis que ajudem as pessoas a adotar hábitos mais sustentáveis no seu dia a dia. Acreditamos que pequenas mudanças podem gerar um grande impacto, especialmente quando se trata de combater o desperdício de alimentos. Através de nossas práticas e dicas, incentivamos o reaproveitamento inteligente de ingredientes, promovendo a conscientização sobre o consumo responsável.

Além disso, buscamos aplicar conhecimentos técnicos da área de Gastronomia para transformar a forma como as pessoas encaram a alimentação, tornando-a mais saudável e ambientalmente responsável. Nosso compromisso é criar alternativas criativas que conectem o prazer de comer com o cuidado com o planeta.

Com isso, não apenas ajudamos a reduzir o desperdício e a utilização de recursos naturais, mas também incentivamos a criação de um ciclo mais equilibrado e justo, em que o respeito ao meio ambiente e às pessoas seja prioridade. Nosso foco é criar um impacto positivo, não só na sociedade, mas também na preservação do nosso planeta para as futuras gerações. 
'
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Sobre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#767676',
    textAlign: 'center',
    marginBottom: 10,
  },
});
