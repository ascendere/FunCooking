import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import Colors from '../assets/components/Colors';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';

const IngredientScreen = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const detail = props.route.params;
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Montserrat_400Regular,
          Comfortaa_400Regular,
          NunitoSans_400Regular,
          Montserrat_500Medium
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
    <View style={{ flex: 1, backgroundColor: Colors.variantWhite }}
      onLayout={onLayoutRootView}>
      <StatusBar style="dark" backgroundColor='#F2F2F2' />
      <View style={styles.header}>
        <View style={styles.topper}>          
          <TouchableOpacity onPress={() => props.navigation.navigate("Colection")} style={styles.button}>
            <Image style={styles.icon}
              source={require('../assets/images/backW.png')} />
          </TouchableOpacity>
          <Text style={styles.h5}>{detail.name}</Text>
        </View>
        <View>
          <Image style={styles.img}
            source={{ uri: detail.img }} />
        </View>
      </View>
      <View style={styles.containerWhite}>
        <View style={styles.containerList}>
          <View style={styles.lineStyle}></View>            
          <View style={styles.containerButton}>
          <TouchableOpacity style={styles.buttonHeart}>
              <Image style={styles.iconHeart}
                source={require('../assets/images/cruzA.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHeart}>
              <Image style={styles.iconHeart}
                source={require('../assets/images/heartA.png')} />
            </TouchableOpacity>
            
          </View>
          <View key={detail.idR}>
            <Text style={styles.h5}>Datos Generales</Text>
            <Text style={styles.subtitle}>Nombre Científico</Text>
            <View style={styles.containerText}>
              <Text style={styles.body}>{detail.cientf}</Text>
            </View>
            <View style={styles.containerOptional}>
              <View style={styles.valuesOptional}>
                <Text style={styles.subtitle}>Valor Nutricional</Text>
                <View style={styles.containerText}>
                  <Text style={styles.body2}>CALORÍAS      {detail.kcal}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.body2}>GLÚCIDOS        {detail.glu}</Text>
                </View>
              </View>
              <View style={styles.valuesOptional2}>
                <View style={styles.containerText}>
                  <Text style={styles.body2}>LÍPIDOS            {detail.lipi}</Text>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.body2}>PROTEÍNAS        {detail.prot}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.subtitle}>Grupo alimentario</Text>
            <View style={styles.containerValues}>
              <View style={styles.containerText2}>
                <Text style={styles.body}>{detail.group}</Text>
              </View>
            </View>
          </View>          
        </View>
      </View>
    </View>
  );
}

function handleHelpPress() {
  return (
    <View></View>
  );
}

export default IngredientScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.variantWhite,
  },
  safeArea: {
    flex: 1,
    marginBottom: 24,
    width: '100%',
  },
  containerWhite: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  containerOptional: {
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
  },
  valuesOptional: {
    width: '50%',
    marginRight: 16,
  },
  valuesOptional2: {
    width: '50%',
    marginRight: 16,
    marginTop: 39,
  },
  containerList: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8
  },
  containerValues: {
    marginTop: 8,
    flexDirection: 'row',
    width: '100%',
    flexWrap: "wrap",
    alignContent: 'space-between',
    height: 'auto',
  },
  value: {
    flexDirection: 'column',
    width: 96,
    height: 56,
    backgroundColor: Colors.variantWhite,
    borderRadius: 6,
    marginRight: 16,
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 34,
    fontFamily: 'Comfortaa_400Regular'
  },
  subtitle: {
    marginTop: 16,
    fontSize: 17,
    fontFamily: 'NunitoSans_400Regular',
    top: -10
  },
  body: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',    
    color: '#194574'
  },
  body2: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#194574',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Montserrat_500Medium',
    color: 'white',
    textTransform: 'uppercase'
  },
  h5: {
    fontSize: 24,
    fontFamily: 'Comfortaa_400Regular',
    top: -10
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    height: 368,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topper: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 64,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white'
  },
  buttonCombinar: {
    width: 152,
    height: 40,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: Colors.secundary
  },
  buttonHeart: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    borderRadius: 20,
  },
  containerButton: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end'
  },
  containerText: {
    marginTop: 8,
    marginRight: 16,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: 'center',
    backgroundColor: Colors.variantWhite,
    borderRadius: 6,
    top: -10
  },
  containerText2: {
    marginTop: -8,
    marginRight: 16,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: 'center',
    backgroundColor: Colors.variantWhite,
    borderRadius: 6,
    top: 10,
    marginBottom: 18
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconHeart: {
    width: 24,
    height: 24,
  },
  img: {
    width: 231,
    height: 235,
    top: -20,
  },
  lineStyle: {
    width: 96,
    marginTop: 16,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: "#1769B0",
  }
});