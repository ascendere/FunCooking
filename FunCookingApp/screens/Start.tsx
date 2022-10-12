import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';

const Start = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Montserrat_400Regular,
          Comfortaa_400Regular,
          Montserrat_500Medium,
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#003049' }}
      onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <Text style={styles.titulo}>FUN COOKING</Text>
      <Text style={styles.subtitulo}>Hola, ¡bienvenido!</Text>
      <Text style={styles.texto}>Juega a combinar cartas de ingredientes y así descubrir recetas que puedes preparar en casa. </Text>
      <Image style={styles.chefFormat} source={require('../assets/images/chef.png')} />
      <TouchableOpacity onPress={() => props.navigation.navigate("Screen1")} style={styles.botones}>
        <Text style={styles.textoBoton}>Press Here</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Start;

const styles = StyleSheet.create({
  titulo: {
    color: '#FFFFFF',
    position: 'absolute',
    width: 218,
    height: 112,
    left: 117,
    top: 124,
    fontSize: 48,
  },
  chefFormat: {
    position: 'absolute',
    width: 104,
    height: 104,
    left: 232,
    top: 69,
  },
  subtitulo: {
    color: '#FFFFFF',
    position: 'absolute',
    width: 265,
    height: 35,
    left: 40,
    top: 276,
    fontSize: 24,
    fontFamily: 'Comfortaa_400Regular',
  },
  texto: {
    color: '#FFFFFF',
    position: 'absolute',
    width: 285,
    height: 70,
    left: 40,
    top: 327,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
  },
  botones: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    width: 295,
    height: 40,
    borderRadius: 20,
    left: 40,
    top: 676,
    justifyContent: 'center',
  },
  textoBoton: {
    fontSize: 14,
    height: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat_500Medium',
  },
});