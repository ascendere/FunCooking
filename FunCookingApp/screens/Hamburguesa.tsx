import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NunitoSans_600SemiBold } from '@expo-google-fonts/nunito-sans';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const Hamburguesa = (props:any) => {
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

    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer());
    }, []);

    if (!appIsReady) {
        return null;
    }
    //Contenido de la pantalla  
    return (                    
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FDA55C' }}
            onLayout={onLayoutRootView}>
            <StatusBar style="dark" backgroundColor='white' />
            <TouchableOpacity onPress={() => props.navigation.navigate("Screen1")}
                style={styles.buttonFav}></TouchableOpacity>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate("Screen1")}
                    style={styles.buttonFav2}></TouchableOpacity>
            </View>            
                <View style={styles.rect}>
                <Text style={styles.txtFun}>FUNCOOKING</Text>
                <Image style={styles.chefsito} source={require('../assets/images/remy.jpg')} />
                <Image style={styles.lapiz} source={require('../assets/images/azul.png')} />
                <Image style={styles.lapiz2} source={require('../assets/images/lapiz.png')} />
                <Text style={styles.txtName}>Chef Remy</Text>
                <Text style={styles.txtScore}>SCORE</Text>
                <Text style={styles.txtScore2}>200</Text>
                <Text style={styles.txtInfo}>Info.</Text>
                </View>
            </View>        
    )
}

function handleHelpPress() {
    return (
        <View></View>
    );
}

export default Hamburguesa;

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
    rect: {
        left: 0,
        top: -12,
        width: 279,
        height: 800,
        backgroundColor: '#F2F2F2',
        position: 'absolute',
    },
    txtFun: {
        position: 'absolute',
        width: 80,
        height: 12,
        left: 24,
        top: 70,
        fontSize: 10,
        fontFamily: 'Montserrat_400Regular',
        lineHeight: 12.19,
        color: '#003049'
    },
    chefsito: {
        position: 'absolute',
        width: 128,
        height: 128,
        left: 76,
        top: 160,
        borderColor: '#003049',
        borderRadius: 60,
    },
    lapiz: {
        width: 40,
        height: 40,
        top: 260,
        left: 143,
    },
    buttonFav: {
        width: 98,
        height: 450,
        right: -135,
        top: 170,
        justifyContent: 'center',
    },
    buttonFav2: {
        width: 98,
        height: 450,
        right: -275,
        top: 0,
        justifyContent: 'center',
    },
    lapiz2: {
        width: 18,
        height: 18,
        top: 230,
        left: 153,
    },
    txtName: {
    position: 'absolute',
    width: 150,
    height: 24,
    left: 89,
    top: 340,
    fontSize: 22,
    fontFamily: 'NunitoSans_600SemiBold',
    lineHeight: 24,
    color: '#003049'
    },
    txtScore: {
        position: 'absolute',
        width: 51,
        height: 60,
        left: 48,
        top: 380,
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        lineHeight: 20,
        color: '#003049'
    },
    txtScore2: {
        position: 'absolute',
        width: 51,
        height: 25,
        left: 180,
        top: 380,
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        lineHeight: 20,
        color: '#003049'
    },
    txtInfo: {
        position: 'absolute',
        width: 51,
        height: 60,
        left: 80,
        top: 480,
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        lineHeight: 20,
        color: '#003049'
    },
});
