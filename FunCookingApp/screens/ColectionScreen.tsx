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
import { NunitoSans_600SemiBold } from "@expo-google-fonts/nunito-sans";
import { Comfortaa_400Regular } from "@expo-google-fonts/comfortaa";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { products } from "../data/data2.json";
import { receipts } from "../data/data2.json";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { db } from "../database/Config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const ColectionScreen = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [mostrarRecetas, setMostrarRecetas] = useState(false);
  const [mostrarIngredientes, setMostrarIngredientes] = useState(true);

  const handleClick = () => {
    setMostrarRecetas(!mostrarRecetas);
    setMostrarIngredientes(!mostrarIngredientes);
  };
  /*Usando firestore*/
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  /*********************************/
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
    showProducts();
    showRecipes();
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

  //PARA MOSTRAR LAS RECETAS EN LA FLATLIST
  const showRecipes = async () => {
    const querySnapshot = await getDocs(collection(db, "recipes"));

    let recipesArray = [];
    querySnapshot.forEach((doc) => {
      recipesArray.push({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        clasificacion: doc.data().clasification,
        dificultad: doc.data().difficulty,
        datosExtra: doc.data().extraDataArray,
        ingredientes: doc.data().ingredientsArray,
        performance: doc.data().performance,
        procedimiento: doc.data().procedureArray,
        tiempo: doc.data().time,
      });
    });
    setRecipes(recipesArray);
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
  return (
    <View
      style={{ flex: 1, backgroundColor: "white" }}
      onLayout={onLayoutRootView}
    >
      <View style={styles.header}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Text style={styles.nombreApp}>FUNCOOKING</Text>
        </div>
      </View>
      <View>
        <Text style={styles.categoryText}>Mis Ingredientes</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Hamburguesa")}
          style={styles.iconoMenu}
        >
          <Text style={styles.iconoMenu}>
            <AiOutlineMenu />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Screen3")}
          style={styles.iconoMenu2}
        >
          <Text style={styles.iconoMenu2}>
            <AiOutlineLeft />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerList2}>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <View style={styles.container2} key={item.id}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Ingredient", item)}
              >
                <Image style={styles.img} source={{ uri: item.image[0] }} />
                <View style={styles.nameContainer}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View>
        <Text style={styles.categoryText2}>Mis recetas</Text>
      </View>
      <View style={styles.containerList}>
        <FlatList
          numColumns={2}
          data={recipes}
          renderItem={({ item }) => (
            <View style={styles.container} key={item.id}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Recipe", item)}
              >
                <Image style={styles.img} source={{ uri: item.image[0] }} />
                <View style={styles.nameContainer}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

function handleHelpPress() {
  return <View></View>;
}

export default ColectionScreen;

const styles = StyleSheet.create({
  container: {
    marginRight: 2,
    marginTop: 5,
    margin: 30,
    backgroundColor: "#FAB89A",
    borderRadius: 15,
    height: 158,
    width: 140,
  },
  nameContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    marginRight: 2,
    marginTop: 5,
    margin: 30,
    backgroundColor: "#FAB89A",
    borderRadius: 15,
    height: 145,
    width: 140,
  },
  containerList: {
    flexDirection: "row",
    width: "100%",
    height: 545,
    top: "1%",
    paddingLeft: "4%",
  },
  textButton: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    textAlign: "left",
    color: "#003049",
    left: 22,
  },
  iconoMenu2: {
    color: "#003049",
    position: "absolute",
    marginTop: "3%",
    fontSize: 30,
    left: "2%",
    fontWeight: "bold",
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
  containerList2: {
    flexDirection: "row",
    width: "100%",
    height: 545,
    top: "1%",
    paddingLeft: "4%",
  },
  title: {
    fontSize: 25,
    fontFamily: "Comfortaa_400Regular",
    color: "#003049",
    marginTop: "3%",
  },
  header: {
    left: 0,
    top: 0,
    width: "100%",
    height: "22%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
  },
  img: {
    width: 140,
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  linkText: {
    fontSize: 14,
    color: "white",
  },
  categoryText: {
    marginTop: "18%",
    paddingLeft: "8%",
    fontSize: 22,
    fontFamily: "NunitoSans_600SemiBold",
    color: "#003049",
  },
  categoryText2: {
    marginTop: "10%",
    paddingLeft: "8%",
    fontSize: 22,
    fontFamily: "NunitoSans_600SemiBold",
    color: "#003049",
  },
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "white",
  },
  button2: {
    width: 295,
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: "8%",
  },
  icon: {
    width: 40,
    height: 40,
  },
  icon2: {
    position: "absolute",
    width: 17.49,
    height: 17.49,
    left: "81.73%",
    right: "12.27%",
  },
});
