import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NunitoSans_600SemiBold } from '@expo-google-fonts/nunito-sans';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { products } from '../data/data.json';
import { receipts } from '../data/data.json';

const ColectionScreen = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 24 }}
      onLayout={onLayoutRootView}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Screen3")} style={styles.button}>
          <Image style={styles.icon}
            source={require('../assets/images/back.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Colección</Text>
      </View>
      <View style={styles.containerList2}>
        <View style={{ bottom: 5 }}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Combinar")}
            style={styles.button2}>
            <Text style={styles.textButton}>Buscar Ingrediente</Text>
            <Image style={styles.icon2}
              source={require('../assets/images/lupa2.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.categoryText}>Productos</Text>
        </View >
        <FlatList
          data={products}
          renderItem={({ item: rct }) => (
            <View style={styles.container2} key={rct.idR}>
              <TouchableOpacity onPress={() => props.navigation.navigate("Ingredient",rct)}>
                <Text>{rct.name}</Text>
                <Text>{rct.kcal}</Text>
                <Image style={styles.img} source={{ uri: rct.img }} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.containerList}>
        <View>
          <Text style={styles.categoryText}>Mis recetas</Text>
        </View>
        <FlatList
          data={receipts}
          renderItem={({ item: rct }) => (
            <View style={styles.container} key={rct.idR}>
              <TouchableOpacity onPress={() => props.navigation.navigate("Recipe", rct)}>
                <Text>{rct.name}</Text>
                <Text>{rct.tiempo}</Text>
                <Image style={styles.img} source={{ uri: rct.img }} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

function handleHelpPress() {
  return (
    <View></View>
  );
}

export default ColectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 4,
    height: 112,
    width: 327,
  },
  container2: {
    flex: 1,
    marginTop: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 4,
    height: 85,
    width: 164,
  },
  containerList: {
    flex: 0.4,
    width: '100%',
    top: 10
  },
  textButton: {
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'left',
    color: '#003049',
    left: 22
  },
  containerList2: {
    flex: 0.6,
    width: '100%',
    top: 10

  },
  title: {
    fontSize: 34,
    fontFamily: 'Comfortaa_400Regular',
    color: '#003049',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
    marginLeft: 4,
  },
  linkText: {
    fontSize: 14,
    color: 'white',
  },
  categoryText: {
    fontSize: 22,
    fontFamily: 'NunitoSans_600SemiBold',
    color: '#003049',
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  button2: {
    width: 295,
    height: 40,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    justifyContent: 'center',
    top: -8

  },
  icon: {
    width: 40,
    height: 40
  },
  icon2: {
    position: 'absolute',
    width: 17.49,
    height: 17.49,
    left: '81.73%',
    right: '12.27%',
  },
});
