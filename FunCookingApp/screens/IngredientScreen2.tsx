import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import Colors from "../assets/components/Colors";
import { Comfortaa_400Regular } from "@expo-google-fonts/comfortaa";
import { NunitoSans_400Regular } from "@expo-google-fonts/nunito-sans";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { color } from "react-native-reanimated";
import { db } from "../database/Config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const IngredientScreen2 = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const detail = props.route.params;
  const navigation = useNavigation();

  const [isPressed, setIsPressed] = useState(false);

  const [mostrarInformacion, setMostrarInformacion] = useState(true);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const toggleMostrarInformacion = () => {
    setMostrarInformacion(!mostrarInformacion);
  };

  const [mostrarDerivados, setMostrarDerivados] = useState(true);
  const [mostrarLocalizacion, setMostrarLocalizacion] = useState(false);
  const [mostrarPreparaciones, setMostrarPreparaciones] = useState(false);
  const toggleMostrarDerivados = () => {
    setMostrarDerivados(!mostrarDerivados);
  };

  const toggleMostrarLocalizacion = () => {
    setMostrarLocalizacion(!mostrarLocalizacion);
  };

  const toggleMostrarPreparaciones = () => {
    setMostrarPreparaciones(!mostrarPreparaciones);
  };

  const [opcionSeleccionada, setOpcionSeleccionada] = useState("derivados");
  const seleccionarOpcion = (opcion) => {
    setOpcionSeleccionada(opcion);
  };
  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Montserrat_400Regular,
          Comfortaa_400Regular,
          NunitoSans_400Regular,
          Montserrat_500Medium,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
    showProducts();
  }, []);
  //////////////////////////////////////////////////
  //PARA MOSTRAR LOS PRODUCTOS EN LA FLATLIST
  const showProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    let productsArray = [];
    querySnapshot.forEach((doc) => {
      productsArray.push({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        beneficios: doc.data().benefitsArray,
        calorias: doc.data().calories,
        carbohidratos: doc.data().carbohydrates,
        clasificacion: doc.data().classificationArray,
        combinacion: doc.data().combinationArray,
        derivados: doc.data().derivativesArray,
        grasas: doc.data().fats,
        fibra: doc.data().fiber,
        group: doc.data().food_Group,
        lipidos: doc.data().lipids,
        localizacion: doc.data().location,
        preparaciones: doc.data().preparationsArray,
        proteinas: doc.data().proteins,
        nombreCientifico: doc.data().scientific_name,
      });
    });

    // Actualiza el estado con los productos obtenidos de Firebase
    setProducts(productsArray);
  };
  //////////////////////////////////////////////////

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
      style={{ flex: 1, backgroundColor: "white" }}
      onLayout={onLayoutRootView}
    >
      <StatusBar style="dark" backgroundColor="#F2F2F2" />
      <View style={styles.header}>
        <Image
          style={styles.fondo}
          source={require("../assets/images/recuadroNaranja.png")}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Text style={styles.nombreApp}>FUNCOOKING</Text>
        </div>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Hamburguesa")}
          style={styles.iconoMenu}
        >
          <Text style={styles.iconoMenu}>
            <AiOutlineMenu />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconoMenu2}
        >
          <Text style={styles.iconoMenu2}>
            <AiOutlineLeft />
          </Text>
        </TouchableOpacity>
        <View key={detail.id}>
          <Image style={styles.img} source={{ uri: detail.image[0] }} />
        </View>
      </View>
      <View style={styles.containerWhite}>
        <View style={styles.containerList}>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttonHeart} onPress={handlePress}>
              <Text
                style={[
                  styles.iconHeart,
                  { color: isPressed ? "red" : "black" },
                ]}
              >
                <AiOutlineHeart />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerDetails}>
            <View key={detail.id}>
              <Text style={styles.h5}>Descripción</Text>
              <Text style={styles.subtitle}>Nombre</Text>
              <Text style={styles.body}>{detail.name}</Text>
              <View style={styles.containerOptional}>
                <View style={styles.valuesOptional}>
                  <Text style={styles.subtitle}>Valor Nutricional</Text>
                  <Text style={styles.body2}>
                    Calorías {detail.calorias} kcal
                  </Text>
                  <Text style={styles.body2}>Grasas {detail.grasas} kcal</Text>
                  <Text style={styles.body2}>
                    Proteinas {detail.proteinas} gr
                  </Text>
                </View>
                <View style={styles.valuesOptional2}>
                  <Text style={styles.body2}>Fibra {detail.fibra} gr</Text>
                  <Text style={styles.body2}>Lípidos {detail.lipidos} gr</Text>
                  <Text style={styles.body2}>
                    carbohidratos {detail.carbohidratos} gr
                  </Text>
                </View>
              </View>
              <Text style={styles.subtitle}>Grupo alimentario</Text>
              <View style={styles.containerValues}>
                <Text style={styles.body}>{detail.group}</Text>
              </View>
            </View>
          </View>
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity onPress={toggleMostrarInformacion}>
              <Text
                style={[
                  styles.toggleButton,
                  mostrarInformacion && styles.activeToggleButton,
                ]}
              >
                Información
              </Text>
              {mostrarInformacion && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
            <Text style={styles.buttonSpace} />
            <TouchableOpacity onPress={toggleMostrarInformacion}>
              <Text
                style={[
                  styles.toggleButton,
                  !mostrarInformacion && styles.activeToggleButton,
                ]}
              >
                Combinación
              </Text>
              {!mostrarInformacion && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          </View>
          {mostrarInformacion ? (
            <View style={styles.containerText}>
              <Text style={styles.subtitle}>Beneficios</Text>
              <Text style={styles.body}>{detail.beneficios.join("\n")}</Text>

              <View style={styles.opcionesContainer}>
                <TouchableOpacity
                  onPress={() => seleccionarOpcion("derivados")}
                  style={[
                    styles.opcionButton,
                    opcionSeleccionada === "derivados" &&
                      styles.opcionButtonActive,
                  ]}
                >
                  <Text style={styles.opcionButtonText}>Derivados</Text>
                  {opcionSeleccionada === "derivados" && (
                    <View style={styles.activeIndicator2} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => seleccionarOpcion("localizacion")}
                  style={[
                    styles.opcionButton,
                    opcionSeleccionada === "localizacion" &&
                      styles.opcionButtonActive,
                  ]}
                >
                  <Text style={styles.opcionButtonText}>Localización</Text>
                  {opcionSeleccionada === "localizacion" && (
                    <View style={styles.activeIndicator2} />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => seleccionarOpcion("preparaciones")}
                  style={[
                    styles.opcionButton,
                    opcionSeleccionada === "preparaciones" &&
                      styles.opcionButtonActive,
                  ]}
                >
                  <Text style={styles.opcionButtonText}>Preparaciones</Text>
                  {opcionSeleccionada === "preparaciones" && (
                    <View style={styles.activeIndicator2} />
                  )}
                </TouchableOpacity>
              </View>

              {opcionSeleccionada === "derivados" && (
                <Text style={styles.body}>{detail.derivados.join("\n")}</Text>
              )}

              {opcionSeleccionada === "localizacion" && (
                <Text style={styles.body}>
                  Ciudad
                  <br></br>
                  <View style={styles.miniContainer}>
                    {detail.localizacion.ciudadArray.map((item, index) => (
                      <Text style={styles.item} key={index}>
                        {item}
                      </Text>
                    ))}
                  </View>
                  <br></br>
                  Micromercados
                  <br></br>
                  <View style={styles.miniContainer}>
                    {detail.localizacion.micromercadoArray.map(
                      (item, index) => (
                        <Text style={styles.item} key={index}>
                          {item}
                        </Text>
                      )
                    )}
                  </View>
                  <br></br>
                  Supermercados
                  <br></br>
                  <View style={styles.miniContainer}>
                    {detail.localizacion.supermercadoArray.map(
                      (item, index) => (
                        <Text style={styles.item} key={index}>
                          {item}
                        </Text>
                      )
                    )}
                  </View>
                </Text>
              )}

              {opcionSeleccionada === "preparaciones" && (
                <View style={styles.containerPreparaciones}>
                  <FlatList
                    data={detail.preparaciones}
                    numColumns={3}
                    renderItem={({ item }) => (
                      <View style={styles.itemContainer}>
                        <Text style={styles.body}>{item}</Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}
            </View>
          ) : (
            <View style={styles.containerText}>
              <Text style={styles.subtitle}>Combinación</Text>
              {detail.combinacion.map((item, index) => (
                <Text style={styles.body} key={index}>
                  {`${item.name}: ${item.porcentage}`}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

function handleHelpPress() {
  return <View></View>;
}

export default IngredientScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.variantWhite,
  },
  miniContainer: {
    marginLeft: "6%",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  combinacionItem: {
    fontSize: 16,
    marginBottom: 5,
    // Otros estilos que desees aplicar
  },
  containerPreparaciones: {
    flex: 1,
  },
  containerDetails: {
    width: "100%",
    // Otros estilos que desees aplicar
  },
  opcionesContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  opcionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  opcionButtonActive: {
    backgroundColor: "none",
  },
  opcionButtonText: {
    color: "black",
  },
  toggleButtonContainer: {
    flexDirection: "row",
    paddingLeft: "2%",
    marginBottom: 8,
    marginTop: "9%",
  },
  buttonSpace: {
    marginHorizontal: 20, // Ajusta el valor según la distancia deseada
  },
  activeIndicator: {
    width: "100%",
    height: 3,
    backgroundColor: Colors.secundary,
  },
  activeIndicator2: {
    width: "110%",
    height: 3,
    backgroundColor: "#FBC188",
  },
  activeToggleButton: {
    color: "black",
  },
  toggleButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginRight: 10,
  },
  safeArea: {
    flex: 1,
    marginBottom: 24,
    width: "100%",
  },
  containerWhite: {
    position: "absolute",
    top: "40%",
    width: "100%",
  },
  fondo: {
    width: "113.9%",
    height: 310,
    zIndex: -1,
  },
  containerOptional: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
  },
  valuesOptional: {
    width: "50%",
  },
  valuesOptional2: {
    width: "50%",
    marginRight: 16,
    marginTop: 39,
  },
  containerList: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  containerValues: {
    marginTop: 8,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    alignContent: "space-between",
    height: "auto",
  },
  value: {
    flexDirection: "column",
    width: 96,
    height: 56,
    backgroundColor: Colors.variantWhite,
    borderRadius: 6,
    marginRight: 16,
    alignItems: "center",
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 34,
    fontFamily: "Comfortaa_400Regular",
  },
  subtitle: {
    marginLeft: "2%",
    marginTop: 16,
    fontSize: 17,
    fontFamily: "NunitoSans_400Regular",
    top: -10,
  },
  body: {
    marginLeft: "4%",
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: "rgba(0, 0, 0, 0.7)",
  },
  body2: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: "rgba(0, 0, 0, 0.7)",
    lineHeight: 25,
    marginLeft: "4%",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    color: "white",
    textTransform: "uppercase",
  },
  h5: {
    marginLeft: "2%",
    fontSize: 18,
    fontFamily: "Comfortaa_400Regular",
    fontWeight: "bold",
  },
  header: {
    width: "100%",
    paddingHorizontal: 24,
    height: 368,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topper: {
    flexDirection: "row",
    width: "100%",
    marginTop: 64,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "white",
  },
  iconoMenu: {
    color: "#003049",
    position: "absolute",
    marginTop: "3%",
    fontSize: 30,
    right: "2%",
    fontWeight: "bold",
  },
  iconoMenu2: {
    color: "#003049",
    position: "absolute",
    marginTop: "3%",
    fontSize: 30,
    left: "2%",
    fontWeight: "bold",
  },
  buttonCombinar: {
    width: 152,
    height: 40,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: Colors.secundary,
  },
  buttonHeart: {
    marginRight: "10%",
    top: 20,
    fontSize: 60,
  },
  containerButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  containerText: {
    marginTop: 8,
    width: "100%",
    top: -10,
  },
  containerText2: {
    marginTop: -8,
    marginRight: 16,
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
    backgroundColor: Colors.variantWhite,
    borderRadius: 6,
    top: 10,
    marginBottom: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
  nombreApp: {
    position: "absolute",
    top: "5%",
    fontSize: 22,
    lineHeight: 24,
    color: "#003049",
    fontWeight: "bold",
  },
  iconHeart: {
    fontSize: 30,
    width: 24,
    height: 24,
    color: "black",
  },
  img: {
    width: 301,
    height: 225,
    top: -220,
    borderRadius: 15,
  },
  lineStyle: {
    width: 96,
    marginTop: 16,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: "#1769B0",
  },
});