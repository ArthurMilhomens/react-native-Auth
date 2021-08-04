import React from 'react';
import { useState } from 'react';
import { recoverPassword } from '../services/recoverPasswor';

import { StyleSheet, TextInput, Image, Pressable, ActivityIndicator } from 'react-native';
import { View } from '../../components/Themed';
import { MonoText } from '../../components/StyledText';
import { Subtitle } from '../../components/StyledSubTitle';
import Back from '../../assets/svg/arrow_back.svg'

import { useAuth } from '../contexts/auth';

export default function Login() {
  const { login } = useAuth();
  const [activeInput, setActiveInput] = useState({ one: false, two: false });
  const [user, setUser] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [screen, setScreen] = useState(true);
  const [recoverEmail, setRecoverEmail] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start'
    },
    Background: {
      height: 500,
      resizeMode: 'stretch',
      width: '90%',
    },
    input: {
      borderColor: "#ADB3BF",
      borderWidth: 1,
      borderRadius: 25,
      minWidth: "72%",
      alignSelf: 'center',
      marginBottom: 40,
      backgroundColor: "#fff",
      paddingTop: 11,
      paddingLeft: 22,
      paddingBottom: 11,
      color: 'black',
    },
    inputError: {
      borderColor: "#ff0014",
    },
    content: {
      backgroundColor: 'transparent',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: "100%",
      flex: 1,
    },
    focus: {
      elevation: 2,
      borderColor: "#535BFE"
    },
    password: {
      color: "#ADB3BF",
      marginTop: -35,
      marginBottom: 50
    },
    login: {
      alignSelf: 'flex-start',
      marginLeft: '14%',
      color: '#404852',
      fontSize: 22,
      textTransform: 'uppercase',
      marginBottom: 40,
    },
    loginError: {
      marginBottom: 20
    },
    button: {
      minWidth: '72%',
      alignItems: "center",
      backgroundColor: "#535BFE",
      borderRadius: 25,
      elevation: 2,
      justifyContent: 'center',
      paddingTop: 12,
      paddingBottom: 11,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      textAlign: 'center',
      textAlignVertical: "center",
    },
    error: {
      color: "#ff0014",
      alignSelf: 'flex-end',
      marginRight: '16%'
    },
    errorPassword: {
      color: "#ff0014",
      alignSelf: 'flex-end',
      marginRight: '2%'
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: "72%",
    },
    passwordContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    passwordTitle: {
      fontWeight: '600',
      fontSize: 35,
      paddingTop: 2,
      marginLeft: 60
    },
    description: {
      color: "#ADB3BF",
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 40,
      marginTop: 20
    }
  });

  interface inputId {
    id: number
  }

  interface userLogin {
    email: string,
    password: string
  }

  interface password {
    email: string
  }

  function Focus({ id }: inputId) {
    setActiveInput(id === 1 ? { ...activeInput, one: true } : { ...activeInput, two: true })
  }

  function Blur({ id }: inputId) {
    setActiveInput(id === 1 ? { ...activeInput, one: false } : { ...activeInput, two: false })
  }


  function LoadLogin(user: userLogin) {
    setLoading(true);

    login(user).catch(() => setError('Senha ou usuário inválido!')).finally(() => setLoading(false))
  }

  function Password(email:password){
    setLoading(true)
    recoverPassword(email).then((response) => response.data === 'Erro ao enviar email.' && setError('Email não cadastrado!')).finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      <Image style={styles.Background} source={require('../../assets/images/big-freezer.png')} />
      {screen ? <View style={styles.content}>
        <MonoText style={[styles.login, error != '' && styles.loginError]}>
          Login
        </MonoText>
        {error != '' && <MonoText style={styles.error}>{error}</MonoText>}
        <TextInput
          placeholder="Username"
          onFocus={() => Focus({ id: 1 })}
          onBlur={() => Blur({ id: 1 })}
          onChangeText={text => setUser({ ...user, email: text })}
          editable={!loading}
          style={[styles.input, activeInput.one && styles.focus, error != '' && styles.inputError]}
        />
        <TextInput
          placeholder="Senha"
          onFocus={() => Focus({ id: 2 })}
          onBlur={() => Blur({ id: 2 })}
          onChangeText={text => setUser({ ...user, password: text })}
          secureTextEntry={true}
          editable={!loading}
          style={[styles.input, activeInput.two && styles.focus, error != '' && styles.inputError]}
        />
        <MonoText style={styles.password} onPress={() => {setScreen(false); setError('')}}>
          Esqueceu sua senha?
        </MonoText>
        <Pressable disabled={loading} style={styles.button} onPress={() => LoadLogin(user)}>
          {loading ?
            <ActivityIndicator color="white" size={30} /> :
            <MonoText style={styles.buttonText}>
              ENTRAR
            </MonoText>}
        </Pressable>
      </View> :
        <View style={styles.passwordContainer}>
          <View style={styles.title}>
            <Back width={50} height={50} fill='#535BFE' onPress={() => { setActiveInput({ one: false, two: false }); setScreen(true); setError('') }} />
            <MonoText style={styles.passwordTitle}>RECUPERAR SENHA</MonoText>
          </View>
          <Subtitle style={styles.description}>Digite seu e-mail cadastrado e enviaremos {`\n`} uma nova senha para você</Subtitle>
          {error != '' && <MonoText style={styles.errorPassword}>{error}</MonoText>}
          <TextInput
            placeholder="Email"
            onFocus={() => Focus({ id: 1 })}
            onBlur={() => Blur({ id: 1 })}
            onChangeText={text => setRecoverEmail(text)}
            editable={!loading}
            style={[styles.input, activeInput.one && styles.focus, error != '' && styles.inputError]}
          />
          <Pressable disabled={loading} style={styles.button} onPress={() => Password({email: recoverEmail})}>
          {loading ?
            <ActivityIndicator color="white" size={30} /> :
            <MonoText style={styles.buttonText}>
              ENVIAR
            </MonoText>}
        </Pressable>
        </View>}
    </View>
  );
}


