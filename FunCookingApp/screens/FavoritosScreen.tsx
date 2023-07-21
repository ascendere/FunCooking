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
import { receipts } from "../data/data2.json";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigation } from "@react-navigation/native";
import { db } from "../database/Config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const Favoritos = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { matchedRecipes } = route.params;
  const matchedRecipesArray = Array.from(matchedRecipes);

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    showRecipes();
  }, []);
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Text style={styles.nombreApp}>FUNCOOKING</Text>
        </div>
      </View>
      <View style={styles.cuerpo}>
        <Text style={styles.textoTittle}>Tu combinación coincide con:</Text>
        <View style={styles.containerReceta}>
          <FlatList
            numColumns={2}
            data={recipes.filter((rct: any) =>
              matchedRecipes.includes(rct.name)
            )}
            renderItem={({ item: rct }: { item: any }) => (
              <View style={styles.container} key={rct.idR}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Recipe2", rct)}
                >
                  <Image style={styles.img} source={{ uri: rct.image[0] }} />
                  <View style={styles.nameContainer}>
                    <Text>{rct.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View style={styles.containerBotonRegresa}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.touchContainer, { alignSelf: "stretch"}]}
          >
            <Text style={styles.textIrA}>Ir a productos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Favoritos;

const styles = StyleSheet.create({
  img: {
    width: 140,
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  touchContainer: {
    alignSelf: "stretch",
  },
  nameContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textIrA: {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: 20,
    textAlign: "center",
  },
  containerBotonRegresa: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#ED903B",
    top: 717,
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    marginRight: 2,
    marginTop: 5,
    margin: 30,
    backgroundColor: "#A1AAD1",
    borderRadius: 15,
    height: "auto",
    width: 140,
  },
  time: {
    paddingLeft: "11%",
  },
  container: {
    marginRight: 20,
    marginTop: 5,
    margin: 30,
    backgroundColor: "#A1AAD1",
    borderRadius: 15,
    height: "auto",
    width: 140,
  },
  nombreReceta: {
    paddingLeft: "45%",
    fontFamily: "NunitoSans_400Regular",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
  },
  containerReceta: {
    marginTop: 16,
    width: "100%",
    height: 640,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "14%",
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
  nombreApp: {
    position: "absolute",
    top: "5%",
    fontSize: 22,
    lineHeight: 24,
    color: "#003049",
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
  iconoMenu2: {
    color: "#003049",
    position: "absolute",
    marginTop: "3%",
    fontSize: 30,
    left: "2%",
    fontWeight: "bold",
  },
  cuerpo: {
    position: "absolute",
    top: "7%",
    width: "100%",
  },
  textoTittle: {
    paddingLeft: "4%",
    fontSize: 18,
  },
});
