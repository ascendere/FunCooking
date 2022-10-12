import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NunitoSans_600SemiBold } from '@expo-google-fonts/nunito-sans';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const Screen1 = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Montserrat_400Regular,
          Comfortaa_400Regular,
          Montserrat_500Medium,
          NunitoSans_600SemiBold
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDA55C' }}
      onLayout={onLayoutRootView}>
      <StatusBar style="dark" backgroundColor='white' />
      <View style={styles.header}>
        <Text style={styles.txtpeque}>FUNCOOKING</Text>
        <Image style={styles.burger} source={require('../assets/images/burger1.png')} />
        <TouchableOpacity onPress={() => props.navigation.navigate("Hamburguesa")}
          style={styles.burger}>
        </TouchableOpacity>
        <Text style={styles.title}>¿Deseas preparar algo?</Text>
        <Text style={styles.subtitle}>Vamos a jugar</Text>
        <Text style={styles.text}>Combina tus cartas que son ingredientes para descubrir recetas de comidas y bebidas. Puedes escoger cualquier carta, pero ten cuidado con lo que podrías mezclar.</Text>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate("Screen2")}
        style={styles.buttonFav}>
        <Text style={styles.textButtonFav}>Favoritas</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Screen3")}
        style={styles.buttonCol}>
        <Text style={styles.textButtonCol}>Colección</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => handleHelpPress()}
        style={styles.buttonCom}>
        <Text style={styles.textButtonCom}>Combinar</Text></TouchableOpacity>
      <Image style={styles.linea}
        source={require('../assets/images/linea.png')} />
      <Image style={styles.icon}
        source={require('../assets/images/iconcombinar.png')} />
      <Image
        fadeDuration={1000}
        style={styles.img}
        source={require('../assets/images/card.png')} />
      <TouchableOpacity onPress={() => props.navigation.navigate("Combinar")}
        style={styles.button}>
        <Text style={styles.textButton}>A COMBINAR</Text></TouchableOpacity>
    </View>
  )
}

function handleHelpPress() {
  return (
    <View></View>
  );
}

export default Screen1;

const styles = StyleSheet.create({
  header: {
    left: 0,
    top: 0,
    width: 360,
    height: 369,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
  },
  txtpeque: {
    position: 'absolute',
    width: 80,
    height: 12,
    left: 24,
    top: 76,
    fontSize: 10,
    fontFamily: 'Montserrat_400Regular',
    lineHeight: 12.19,
    color: '#003049'
  },
  burger: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 310,
    top: 56,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Comfortaa_400Regular',
    width: 315,
    height: 45,
    top: 112,
    left: 24,
    position: 'absolute',
  },
  subtitle: {
    fontSize: 22,
    width: 305,
    height: 33,
    top: 181,
    left: 24,
    position: 'absolute',
    fontFamily: 'NunitoSans_600SemiBold',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    width: 315,
    height: 100,
    top: 230,
    left: 30,
    position: 'absolute',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  fondo: {
    height: 509,
    width: 375,
    left: 0,
    top: 303,
    backgroundColor: '#FDA55C',
  },
  button: {
    width: 160,
    height: 40,
    backgroundColor: '#784729',
    borderRadius: 20,
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 14,
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center',
    color: '#ffffff'
  },
  buttonFav: {
    width: 98,
    height: 24,
    top: 350,
    left: 0,
    justifyContent: 'center',
  },
  textButtonFav: {
    fontSize: 22,
    fontFamily: 'NunitoSans_600SemiBold',
    textAlign: 'center',
    color: 'gray',
  },
  buttonCol: {
    width: 98,
    height: 24,
    top: 326,
    left: 115,
    justifyContent: 'center',
  },
  textButtonCol: {
    fontSize: 22,
    fontFamily: 'NunitoSans_600SemiBold',
    textAlign: 'center',
    color: 'gray',
  },
  buttonCom: {
    width: 98,
    height: 24,
    top: 300,
    right: 115,
    justifyContent: 'center',
  },
  textButtonCom: {
    fontSize: 22,
    fontFamily: 'NunitoSans_600SemiBold',
    textAlign: 'center',
    color: '#212121',
  },
  img: {
    width: 168.12,
    height: 172,
    marginTop: 390,
    marginBottom: 30
  },
  icon: {
    position: 'absolute',
    width: 55,
    height: 40,
    left: '71.73%',
    right: '12.27%',
    top: '60.67%',
    bottom: '58.55%',
  },
  linea: {
    position: 'absolute',
    width: 98,
    height: 3,
    left: '5%',
    right: '12.27%',
    top: '53.67%',
    bottom: '58.55%',
  }
});
