import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Comfortaa_400Regular } from "@expo-google-fonts/comfortaa";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";

const Start = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [indice, setIndice] = useState(0);
  
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
    <View
      style={{ flex: 1, backgroundColor: "#FFFF" }}
      onLayout={onLayoutRootView}
    >
      <StatusBar style="light" />
      <p style={styles.titulo}>FUNCOOKING</p>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Hamburguesa")}
        style={styles.iconoMenu}
      >
        <Text style={styles.iconoMenu}>
          <AiOutlineMenu />
        </Text>
      </TouchableOpacity>
      <Image
        style={styles.chefFormat}
        source={require("../assets/images/cheffsito.png")}
      />
      <Image
        style={styles.fondoPanFormat}
        source={require("../assets/images/fondopan.png")}
      />
      <Image
        style={styles.fondoPanesFormat}
        source={require("../assets/images/panes.png")}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Screen1")}
        style={styles.botones}
      >
        <Text style={styles.textoBoton}>
          Empezar <FaArrowRight />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  titulo: {
    color: "#003049",
    position: "absolute",
    marginLeft: "4%",
    marginTop: "5.5%",
    fontSize: 24,
    fontWeight: "bold",
  },
  imagen: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  boton: {
    backgroundColor: "blue",
    padding: 10,
    marginTop: 20,
  },
  botonTexto: {
    color: "white",
    fontSize: 18,
  },
  containerScroll: {
    marginTop: "160%",
    marginLeft: 10,
  },
  iconoMenu: {
    color: "#003049",
    position: "absolute",
    marginTop: "5.5%",
    fontSize: 30,
    right: "5%",
    fontWeight: "bold",
  },
  chefFormat: {
    position: "absolute",
    height: "78.5%",
    width: "99.5%",
    marginLeft: "3%",
    marginTop: "23%",
  },
  fondoPanFormat: {
    position: "absolute",
    width: "90%",
    height: "77.5%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "25%",
    zIndex: -1,
    borderRadius: 10,
  },
  fondoPanesFormat: {
    position: "absolute",
    width: "90%",
    height: "85%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "25%",
    zIndex: -1,
    borderRadius: 10,
  },
  subtitulo: {
    color: "#000",
    position: "absolute",
    marginLeft: "15%",
    top: "48.5%",
    fontSize: 24,
    fontFamily: "Comfortaa_400Regular",
    fontWeight: "bold",
  },
  texto: {
    color: "#000",
    position: "absolute",
    width: 285,
    height: 70,
    top: "42%",
    marginLeft: "15%",
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
  },
  botones: {
    position: "absolute",
    marginLeft: "10%",
    top: "78%",
  },
  textoBoton: {
    fontSize: 18,
    backgroundColor: "#DA6A4E",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontFamily: "Montserrat_500Medium",
  },
});
