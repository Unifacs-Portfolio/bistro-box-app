import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet
} from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../utils/types/navigation";
import { ForgotFormData } from "../../utils/types/form/formData";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function ForgotPassword() {
    const { control, handleSubmit } = useForm<ForgotFormData>();
    const navigation = useNavigation<NavigationProp>();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../assets/images/login/ImagemDeFundo.png')}
                            style={styles.backgroundImage}
                        />
                        <View>
                            <Text style={styles.logo}>BISTRÔ BOX</Text>
                            <Text style={styles.sublogo}>PENSE FORA DA CAIXA</Text>
                        </View>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={[styles.title, styles.fontSemiBold]}>
                            Esqueceu sua senha?
                        </Text>
                        <Text style={[styles.description, styles.fontSemiBold]}>
                            Digite o endereço de e-mail para o qual deseja que suas informações de redefinição de senha sejam enviadas.
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.labelContainer}>
                            <Ionicons name='mail' size={20} />
                            <Text style={styles.labelText}>Email</Text>
                        </View>
                        <Controller
                            control={control}
                            name='email'
                            rules={{
                                required: "O Email é obrigatorio",
                                maxLength: {
                                    value: 51,
                                    message: "Limite excedido de caracteres"
                                },
                                pattern: {
                                    value: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
                                    message: 'Email inválido'
                                }
                            }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Digite seu Email'
                                        onChangeText={onChange}
                                        value={value}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                    />
                                    {error && (
                                        <Text style={styles.errorText}>
                                            {error.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit((data) => console.log(data))}
                    >
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LogIn')}
                        >
                            <Text style={styles.footerText}>Aperte Para Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logo: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#FFFFFF', // Branco para contraste
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
    scrollContainer: {
        backgroundColor: '#F9F9F9',
    },
    contentContainer: {
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 64 * 4,
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        color: '#5A5A5A',
        marginBottom: 16,
        fontSize: 24,
    },
    description: {
        color: '#5B5B5B',
        textAlign: 'justify',
        width: 322,
        marginBottom: 32,
    },
    fontSemiBold: {
        fontFamily: 'poppins-semi-bold',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 40,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    labelText: {
        marginLeft: 4,
        color: '#5B5B5B',
    },
    input: {
        backgroundColor: '#EDEDED',
        borderColor: '#5B5B5B',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    errorText: {
        color: '#ff375b',
        fontSize: 12,
        marginLeft: 8,
        marginTop: 4,
    },
    button: {
        width: '80%',
        backgroundColor: '#50B454',
        borderRadius: 16,
        paddingVertical: 16,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    footerText: {
        color: '#50B454',
        fontSize: 14,
    },
});
