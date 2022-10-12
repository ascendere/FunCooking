import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NunitoSans_600SemiBold } from '@expo-google-fonts/nunito-sans';
import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { products } from '../data/data.json';

const CombinarScreen = (props: any) => {
    const [appIsReady, setAppIsReady] = useState(false);

    const [names, setNames] = useState<any[]>([]);
    const handleClick = (product: any) => {
        setNames([...names, product]);
    };

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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}
            onLayout={onLayoutRootView}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <View style={styles.containerList2}>
                    <FlatList
                        data={names}
                        renderItem={({ item: rct }) => (
                            <View style={styles.container2} key={rct}>
                                <TouchableOpacity style={styles.button5} onPress={() => setNames([])}>
                                    <Text style={styles.textButton5}>{rct}</Text>
                                    <Image style={styles.icon} source={require('../assets/images/x.png')} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate("Combinar")}
                style={styles.button}>
                <Text style={styles.textButton}>Buscar Ingrediente</Text>
                <Image style={styles.icon}
                    source={require('../assets/images/lupa2.png')} />
            </TouchableOpacity>
            <View style={styles.containerList}>
                <FlatList
                    data={products}
                    renderItem={({ item: rct }) => (
                        <View style={styles.container} key={rct.idR}>
                            <TouchableOpacity onPress={() => handleClick(rct.name)}>
                                <Text>{rct.name}</Text>
                                <Text>{rct.kcal}</Text>
                                <Image style={styles.img} source={{ uri: rct.img }} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <TouchableOpacity onPress={() => handleHelpPress()}
                style={styles.button2}>
                <Text style={styles.textButton2}>COMBINAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNames([])}
                style={styles.button3}>
                <Text style={styles.textButton3}>LIMPIAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate("Screen1")}
                style={styles.button4}>
                <Image style={styles.icon2}
                    source={require('../assets/images/backW.png')} />
                <Text style={styles.textButton4}>VOLVER</Text>
            </TouchableOpacity>
        </View>
    )
}



function handleHelpPress() {
    return (
        <View></View>
    );
}

export default CombinarScreen;

const styles = StyleSheet.create({
    header: {
        left: 0,
        top: 0,
        width: 360,
        height: 296,
        backgroundColor: '#FDA55C',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'absolute',
    },
    containerList: {
        flex: 0.5,
        width: 343,
        top: 180,
        left: 10,
        marginBottom: 80,
    },
    containerList2: {
        flex: 1,
        width: 343,
        height: 300,
        top: 50,
        left: 10,
        marginBottom: 80,
    },
    container: {
        flex: 1,
        marginTop: 16,
        backgroundColor: '#f4f4f4',
        borderRadius: 4,
        height: 85,
        width: 164,
    },
    container2: {
        flex: 1,
        marginTop: 2,
        marginBottom: 15,
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 4,
        marginLeft: 4,
    },
    button: {
        width: 295,
        height: 40,
        bottom: -175,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 12,
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'left',
        color: '#003049',
        left: 22
    },
    icon: {
        position: 'absolute',
        width: 17.49,
        height: 17.49,
        left: '81.73%',
        right: '12.27%',
    },
    icon2: {
        position: 'absolute',
        width: 17.49,
        height: 27.49,
        left: '21.73%',
        right: '12.27%',
    },
    button2: {
        width: 154,
        height: 40,
        top: 125,
        left: 65,
        backgroundColor: '#FDA55C',
        borderRadius: 6,
        justifyContent: 'center',
    },
    textButton2: {
        fontSize: 14,
        fontFamily: 'Montserrat_500Medium',
        color: '#212121',
        left: 38,
    },
    button3: {
        width: 104,
        height: 40,
        top: 85,
        right: 95,
        backgroundColor: '#F2F2F2',
        borderRadius: 6,
        justifyContent: 'center',
    },
    textButton3: {
        fontSize: 14,
        fontFamily: 'Montserrat_500Medium',
        color: '#212121',
        left: 22
    },
    button4: {
        width: 124,
        height: 40,
        top: 100,
        right: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        justifyContent: 'center',
    },
    textButton4: {
        fontSize: 14,
        fontFamily: 'Montserrat_500Medium',
        color: '#003049',
        left: 22,
        textAlign: 'center'
    },
    button5: {
        width: 230,
        height: 40,
        top: 10,
        left: 90,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        justifyContent: 'center',
    },
    textButton5: {
        fontSize: 14,
        fontFamily: 'Montserrat_500Medium',
        color: '#212121',
        left: 25
    },
});
