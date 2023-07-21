import React, { useCallback, useEffect, useState } from "react";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NunitoSans_600SemiBold } from "@expo-google-fonts/nunito-sans";
import { Comfortaa_400Regular } from "@expo-google-fonts/comfortaa";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../database/Config";
import { useRoute } from '@react-navigation/native';
import { useUserContext } from "../UserContext";

const Hamburguesa = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUserContext();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("LoginScreen");
        // Cierre de sesión exitoso
        // Puedes realizar acciones adicionales después de cerrar sesión si es necesario
      })
      .catch((error) => {
        // Manejar cualquier error que ocurra durante el proceso de cierre de sesión
      });
  };
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Montserrat_400Regular,
          Comfortaa_400Regular,
          Montserrat_500Medium,
          NunitoSans_600SemiBold,
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
    <View style={styles.rect}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
        source={{ uri: user.photoURL }}
          style={styles.chefsito}
        />
        <Text style={styles.txtName}>{user.displayName}</Text>
      </div>
      <TouchableOpacity onPress={() => props.navigation.navigate("Funcooking")} style={styles.botones}>
        <Text style={styles.txtScore2}> Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => signOutUser()} style={styles.botones2}>
        <Text style={styles.txtScore3}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

function handleHelpPress() {
  return <View></View>;
}

export default Hamburguesa;

const styles = StyleSheet.create({
  rect: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#D9D9D8",
  },
  botones: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: "38%",
    backgroundColor: "#A3A3A3",
    borderRadius: 15,
    width: 220,
  },
  botones2: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: "48%",
    backgroundColor: "#A3A3A3",
    borderRadius: 15,
    width: 220,
  },
  chefsito: {
    position: "absolute",
    width: 128,
    height: 128,
    top: "10%",
    borderColor: "#003049",
    borderRadius: 60,
  },
  txtName: {
    position: "absolute",
    top: "28%",
    fontSize: 22,
    fontFamily: "Montserrat",
    lineHeight: 24,
    color: "#fff",
  },
  contNav: {
    backgroundColor: "blue",
    marginTop: "80%",
    width: "100%",
  },
  txtScore: {
    position: "absolute",
    top: "35%",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    lineHeight: 25,
    color: "#fff",
    fontWeight: "bold",
  },
  txtScore2: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
    color: "white",
  },
  txtScore3: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
    color: "white",
  },
  txtScore4: {
    position: "absolute",
    left: "15%",
    top: "52%",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    lineHeight: 10,
    color: "#fff",
  },
  txtScore5: {
    position: "absolute",
    left: "15%",
    top: "57%",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    lineHeight: 10,
    color: "#fff",
  },
  txtScore6: {
    position: "absolute",
    left: "15%",
    top: "62%",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    lineHeight: 10,
    color: "#fff",
  },
  txtInfo: {
    position: "absolute",
    left: "15%",
    top: "88%",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    lineHeight: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  /*<TouchableOpacity onPress={() => props.navigation.navigate("Screen1")}
                style={styles.buttonFav}></TouchableOpacity>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate("Screen1")}
                    style={styles.buttonFav2}></TouchableOpacity>
            </View>*/
});
