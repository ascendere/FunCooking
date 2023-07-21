import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../database/Config";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../UserContext";

const LoginScreen = (props: any) => {
  const navigation = useNavigation();
  const { setUser } = useUserContext();
  const signUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Actualiza el estado global del usuario
      setUser(user);

      navigation.navigate("Hamburguesa");

    } catch (error) {
      // Manejo de errores aquí
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFF" }}>
      <View style={styles.header}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Text style={styles.nombreApp}>FUNCOOKING</Text>
        </div>
      </View>
      <Image
        style={styles.chefFormat}
        source={require("../assets/images/cheffsito.png")}
      />
      <Image
        style={styles.fondoPanFormat}
        source={require("../assets/images/fondopan.png")}
      />
      <Image
        style={styles.fondoPanFormat}
        source={require("../assets/images/panes.png")}
      />
      <TouchableOpacity onPress={signUp} style={styles.botones}>
        <Text style={styles.textoBoton} numberOfLines={1} ellipsizeMode="tail">
          Iniciar sesión con Google
        </Text>
        <Image
          source={require("../assets/images/logoGoogle.png")}
          style={styles.icono}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => signUp()} style={styles.botones2}>
        <Text style={styles.textoBoton}>Iniciar sesión con UTPL</Text>
        <Image
          source={require("../assets/images/logoUtpl.png")}
          style={styles.icono}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  botones: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    top: "75%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: 274,
    borderWidth: 1,
    borderColor: "#000000", // Color del borde (negro en este caso)
    flexDirection: "row", // Alinea el texto e imagen en la misma fila horizontal
    alignItems: "center", // Centra verticalmente el contenido dentro del contenedor
    justifyContent: "space-between", // Espacio igual entre el texto e imagen
    paddingHorizontal: 10, // Espacio horizontal alrededor del contenido
  },

  icono: {
    width: 30,
    height: 30,
  },
  botones2: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: 274,
    borderWidth: 1,
    borderColor: "#000000", // Color del borde (negro en este caso)
    flexDirection: "row", // Alinea el texto e imagen en la misma fila horizontal
    alignItems: "center", // Centra verticalmente el contenido dentro del contenedor
    justifyContent: "space-between", // Espacio igual entre el texto e imagen
    paddingHorizontal: 10, // Espacio horizontal alrededor del contenido
  },
  textoBoton: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
    color: "black",
  },
  header: {
    left: 0,
    top: 0,
    width: "100%",
    height: 369,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
  },
  nombreApp: {
    position: "absolute",
    top: "13%",
    fontSize: 30,
    lineHeight: 24,
    color: "#003049",
    fontWeight: "bold",
  },
  chefFormat: {
    position: "absolute",
    height: "53%",
    width: "68%",
    marginLeft: "29%",
    marginTop: "25%",
    zIndex: 1,
  },
  fondoPanFormat: {
    position: "absolute",
    width: "90%",
    height: "50%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "30%",
    zIndex: 0,
    borderRadius: 10,
  },
});
