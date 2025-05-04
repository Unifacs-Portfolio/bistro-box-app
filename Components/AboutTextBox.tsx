import React from 'react';
import { Linking, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AboutTextBoxProps {
  iconName: string;
  iconSize: number;
  boxTitle: string;
  boxTextContent: string;
}

interface Developer {
  name: string;
  linkedInUrl: string;
}

const developers: Developer[] = [
  {
    name: '',
    linkedInUrl: '',
  },
  {
    name: '',
    linkedInUrl: '',
  },
  {
    name: '',
    linkedInUrl: '',
  },
  {
    name: '',
    linkedInUrl: '',
  },
];

const DeveloperItem = ({ name, linkedInUrl }: Developer) => {
  const handlePress = () => {
    Linking.openURL(linkedInUrl).catch();
  };

  return (
    <View style={styles.developerItem}>
      <Text style={styles.developerText}>
        • {name}
      </Text>
      <TouchableOpacity onPress={handlePress} style={styles.linkButton}>
        <Ionicons name="logo-linkedin" size={20} color="#1F3B4D" />
      </TouchableOpacity>
    </View>
  );
};

export const AboutDevsBox = () => {
  return (
    <View style={styles.devsBox}>
      <View style={styles.devsBoxHeader}>
        <Ionicons name="code-slash" size={30} color={'#1F3B4D'} />
        <Text style={styles.devsBoxTitle}>
          Desenvolvedores
        </Text>
      </View>

      <View style={styles.devsList}>
        {developers.map((dev, index) => (
          <DeveloperItem key={index} name={dev.name} linkedInUrl={dev.linkedInUrl} />
        ))}
      </View>
    </View>
  );
};

export const AboutTextBox = ({
  iconName,
  iconSize,
  boxTitle,
  boxTextContent,
}: AboutTextBoxProps) => {
  return (
    <View style={styles.textBox}>
      <View style={styles.textBoxHeader}>
        <Ionicons name={iconName} size={iconSize} color={'#1F3B4D'} />
        <Text style={styles.textBoxTitle}>
          {boxTitle}
        </Text>
      </View>
      <Text style={styles.textBoxContent}>
        {boxTextContent}
      </Text>
    </View>
  );
};

// Stylesheet at the bottom
const styles = StyleSheet.create({
  developerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  developerText: {
    fontSize: 14,
    color: '#455A64',
    fontFamily: 'poppins-medium',
  },
  linkButton: {
    marginLeft: 8,
  },
  devsBox: {
    backgroundColor: 'white',
    width: '91%',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    marginBottom: 16,
  },
  devsBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  devsBoxTitle: {
    fontSize: 18,
    color: '#1F3B4D',
    fontFamily: 'poppins-medium',
  },
  devsList: {
    marginTop: 10,
    paddingHorizontal: 8,
  },
  textBox: {
    backgroundColor: 'white',
    width: '91%',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    marginBottom: 16,
  },
  textBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textBoxTitle: {
    fontSize: 18,
    color: '#1F3B4D',
    fontFamily: 'poppins-medium',
  },
  textBoxContent: {
    width: '100%',
    textAlign: 'justify',
    fontSize: 14,
    paddingHorizontal: 8,
    marginVertical: 8,
    color: '#455A64',
    marginTop: 10,
    fontFamily: 'poppins-medium',
  },
});
