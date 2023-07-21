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
//import { products } from "../data/data2.json";
import { db } from "../database/Config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


const RecipeScreen2 = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const detail = props.route.params;
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const [mostrarProcedimiento, setMostrarProcedimiento] = useState(true);

  const toggleMostrarProcedimiento = () => {
    setMostrarProcedimiento(!mostrarProcedimiento);
  };

  const handlePress = () => {
    setIsPressed(!isPressed);
  };
  /*********************** */
  const [products, setProducts] = useState([]);
  /************************ */
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
    showProducts();
    prepare();
  }, []);
  /***********************/
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
  /***********************/
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  /////////////////////////////////////////////////
  const ingredientesFiltrados = detail.ingredientes.map(
    (item: any) => item.ingredients
  );
  const ingredientesEnProducts = products.filter((product) =>
    ingredientesFiltrados.includes(product.name)
  );

  const ingredientesConImagen = ingredientesEnProducts.map((producto) => ({
    id: producto.id,
    name: producto.name,
    image: producto.image,
    beneficios: producto.beneficios,
    calorias: producto.calorias,
    carbohidratos: producto.carbohidratos,
    clasificacion: producto.clasificacion,
    combinacion: producto.combinacion,
    derivados: producto.derivados,
    grasas: producto.grasas,
    fibra: producto.fibra,
    group: producto.group,
    lipidos: producto.lipidos,
    localizacion: producto.localizacion,
    preparaciones: producto.preparaciones,
    proteinas: producto.proteinas,
    nombreCientifico: producto.nombreCientifico,
  }));

  const combinedIngredientes = ingredientesFiltrados.map((item) => {
    const ingredienteConImagen = ingredientesConImagen.find(
      (ingrediente) => ingrediente.name === item
    );

    if (ingredienteConImagen) {
      return ingredienteConImagen;
    }

    return { name: item, image: null };
  });

  ///////////////////////////////////////////////////
  return (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      onLayout={onLayoutRootView}
    >
      <View style={styles.header}>
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
        <Text style={styles.textCoincide}>Tu combinacion coincide con: </Text>
        <View>
          <Text style={styles.h5}>{detail.name}</Text>
          <Image style={styles.img} source={{ uri: detail.image[0] }} />
        </View>
      </View>
      <View style={styles.containerWhite}>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.buttonHeart} onPress={handlePress}>
            <Text
              style={[styles.iconHeart, { color: isPressed ? "red" : "black" }]}
            >
              <AiOutlineHeart />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerIngredientes}>
          <Text style={styles.textIngre}>Ingredientes</Text>
          <ScrollView horizontal>
            <FlatList
              data={combinedIngredientes}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.container2}
                  key={item.id}
                  onPress={() => props.navigation.navigate("Ingredient2", item)}
                  disabled={!item.image}
                >
                  <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                      {item.image ? (
                        <Image style={styles.imgIngre} source={item.image[0]} />
                      ) : (
                        <Image
                          style={styles.imgIngre}
                          source={require("../assets/images/nofound.jpg")}
                        />
                      )}
                    </View>
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
        <View style={styles.containerList}>
          <View key={detail.idR}>
            <View style={styles.toggleButtonContainer}>
              <TouchableOpacity onPress={toggleMostrarProcedimiento}>
                <Text
                  style={[
                    styles.toggleButton,
                    mostrarProcedimiento && styles.activeToggleButton,
                  ]}
                >
                  Procedimiento
                </Text>
                {mostrarProcedimiento && (
                  <View style={styles.activeIndicator} />
                )}
              </TouchableOpacity>
              <Text style={styles.buttonSpace} />
              <TouchableOpacity onPress={toggleMostrarProcedimiento}>
                <Text
                  style={[
                    styles.toggleButton,
                    !mostrarProcedimiento && styles.activeToggleButton,
                  ]}
                >
                  Datos Extra
                </Text>
                {!mostrarProcedimiento && (
                  <View style={styles.activeIndicator} />
                )}
              </TouchableOpacity>
            </View>

            {mostrarProcedimiento ? (
              <View style={styles.containerText}>
                <Text style={styles.body}>
                  {detail.procedimiento.map((item, index) => (
                    <Text style={styles.body} key={index}>
                      {`${index + 1}. ${item}\n`}
                    </Text>
                  ))}
                </Text>
              </View>
            ) : (
              <View style={styles.containerText}>
                <Text style={styles.body}>{detail.datosExtra.join('\n')}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecipeScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeIndicator: {
    width: "100%",
    height: 3,
    backgroundColor: Colors.secundary,
  },
  buttonSpace: {
    marginHorizontal: 20, // Ajusta el valor según la distancia deseada
  },
  itemContainer: {
    alignItems: "center",
  },
  toggleButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  toggleButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginRight: 10,
  },
  activeToggleButton: {
    color: Colors.secundary,
  },
  itemName: {
    marginTop: 5,
    textAlign: "center",
  },
  container2: {
    backgroundColor: "#FAB89A",
    borderRadius: 12,
    height: 134,
    width: 100,
    marginTop: "15%",
    marginRight: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  imgIngre: {
    width: 100,
    height: 90,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  fondo: {
    width: "113.9%",
    height: 310,
    zIndex: -1,
  },
  containerIngredientes: {
    position: "absolute",
    width: "100%",
    height: 190,
    top: "9%",
    paddingLeft: "6%",
    zIndex: 1,
  },
  textIngre: {
    fontFamily: "NunitoSans_400Regular",
    fontWeight: "bold",
    fontSize: 20,
  },
  iconoMenu2: {
    color: "#003049",
    position: "absolute",
    marginTop: "3%",
    fontSize: 30,
    left: "2%",
    fontWeight: "bold",
  },
  textCoincide: {
    fontFamily: "NunitoSans_400Regular",
    top: "18%",
    position: "absolute",
    left: "4%",
  },
  iconoMenu: {
    color: "#003049",
    position: "absolute",
    marginTop: "3%",
    fontSize: 30,
    right: "2%",
    fontWeight: "bold",
  },
  nombreApp: {
    position: "absolute",
    top: "5%",
    fontSize: 22,
    lineHeight: 24,
    color: "#003049",
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
    marginBottom: 24,
    width: "100%",
  },
  containerWhite: {
    position: "absolute",
    top: "44%",
    width: "100%",
  },
  containerOptional: {
    width: "100%",
    height: "auto",
  },
  valuesOptional: {
    width: "50%",
    marginRight: 16,
  },
  containerList: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    marginTop: "62%",
    zIndex: 0,
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
    marginTop: 16,
    fontSize: 17,
    fontFamily: "NunitoSans_400Regular",
    top: -10,
    marginLeft: "4%",
  },
  body: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    paddingLeft: "4%",
    paddingRight: "4%",
    textAlign: "justify",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    textTransform: "uppercase",
  },
  h5: {
    fontSize: 20,
    fontFamily: "Comfortaa_400Regular",
    top: -40,
    fontWeight: "bold",
    position: "absolute",
    left: "-9%",
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
    top: 50,
    fontSize: 60,
  },
  containerButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  containerText: {
    marginTop: 20,
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
    borderRadius: 6,
    top: 10,
    marginBottom: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconHeart: {
    width: 24,
    height: 23,
  },
  img: {
    width: 301,
    height: 225,
    top: 0,
    borderRadius: 15,
  },
  lineStyle: {
    width: 96,
    marginTop: 16,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: "#FDA55C",
  },
});