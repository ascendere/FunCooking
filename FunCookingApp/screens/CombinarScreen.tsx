import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NunitoSans_600SemiBold } from "@expo-google-fonts/nunito-sans";
import { Comfortaa_400Regular } from "@expo-google-fonts/comfortaa";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { receipts } from "../data/data2.json";
import { useFocusEffect } from "@react-navigation/native";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { FiDelete } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoSyncCircleOutline } from "react-icons/io5";
import { db } from "../database/Config";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const CombinarScreen = (props: any) => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState<
    { name: string; filtered: boolean }[]
  >([]);
  const [selectedImages, setSelectedImages] = useState<
    {
      name: string;
      filtered: boolean;
    }[]
  >([]);
  const [matchedRecipes, setMatchedRecipes] = useState<string[]>([]);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setSelectedIngredients([]);
      setSelectedImages([]);
      setMatchedRecipes([]);
    }, [])
  );
  /**************************************************/
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);

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
  /**************************************************/

  // Agregar filtro a la imagen
  /*const handleClick = (name: string) => {
    console.log(name)
    const existingIngredient = selectedIngredients.find(
      (ingredient) => ingredient.name === name
    );
  
    if (!existingIngredient) {
      const updatedSelectedIngredients = [
        ...selectedIngredients,
        { name, filtered: true },
      ];
      setSelectedIngredients(updatedSelectedIngredients);
      console.log(updatedSelectedIngredients)
      console.log(recipes)
      console.log(receipts)
      const matchedReceipts = recipes.filter((receipt) => {
        const selectedIngredientNames = updatedSelectedIngredients.map(
          (ingredient) => ingredient.name
        );
        return selectedIngredientNames.every((ingredient) =>
          receipt.ingredientes.includes(ingredient)
        );
      });
  
      const matchedRecipeNames = matchedReceipts.map((receipt) => receipt.name);
      setMatchedRecipes(matchedRecipeNames);
    }
  };*/
  const handleClick = (name: string) => {
    const existingImage = selectedImages.find((image) => image.name === name);
    const existingIngredient = selectedIngredients.find(
      (ingredient) => ingredient.ingredients === name
    );

    if (!existingImage) {
      const updatedSelectedImages = [
        ...selectedImages,
        { name: name, filtered: true },
      ];
      setSelectedImages(updatedSelectedImages);

      if (!existingIngredient) {
        const updatedSelectedIngredients = [
          ...selectedIngredients,
          { ingredients: name, filtered: true },
        ];
        setSelectedIngredients(updatedSelectedIngredients);

        updateMatchedRecipes(updatedSelectedIngredients);
      }
    }
  };

  const handleRemoveFilter = () => {
    if (selectedIngredients.length > 0) {
      const updatedSelectedIngredients = selectedIngredients.slice(0, -1);
      const removedIngredient =
        selectedIngredients[selectedIngredients.length - 1].ingredients;
      setSelectedIngredients(updatedSelectedIngredients);

      const updatedSelectedImages = selectedImages.filter(
        (image) => image.name !== removedIngredient
      );
      setSelectedImages(updatedSelectedImages);

      updateMatchedRecipes(updatedSelectedIngredients);
    }
  };

  const updateMatchedRecipes = (ingredients: Ingredient[]) => {
    const matchedReceipts = recipes.filter((receipt) => {
      const selectedIngredientNames = ingredients.map(
        (ingredient) => ingredient.ingredients
      );
      return selectedIngredientNames.every((selectedIngredientName) =>
        receipt.ingredientes.some(
          (ingredient) => ingredient.ingredients === selectedIngredientName
        )
      );
    });

    const matchedRecipeNames = matchedReceipts.map((receipt) => receipt.name);
    setMatchedRecipes(matchedRecipeNames);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };
  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery, products]);
  const clearSearch = () => {
    setSearchQuery("");
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
    showProducts();
    showRecipes();
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
          onPress={() => props.navigation.navigate("Screen1")}
          style={styles.iconoMenu2}
        >
          <Text style={styles.iconoMenu2}>
            <AiOutlineLeft />
          </Text>
        </TouchableOpacity>
        <Text style={styles.textAgrega}>
          Agrega varios ingredientes y combina
        </Text>
        <SafeAreaView style={styles.contSafeArea}>
          <TextInput
            placeholder="Buscar"
            clearButtonMode="always"
            style={styles.buscador}
            autoCapitalize="none"
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => handleSearch(query)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <FiDelete size={20} color="#ED903B" />
            </TouchableOpacity>
          )}
        </SafeAreaView>
        <Text style={styles.textCompatibilidad}>Compatibilidad</Text>
      </View>
      <View style={styles.containerList}>
        <FlatList
          numColumns={2}
          data={filteredProducts}
          renderItem={({ item }) => (
            <View style={styles.container} key={item.id}>
              <TouchableOpacity onPress={() => handleClick(item.name)}>
                <Image
                  style={[
                    styles.img,
                    selectedImages.find((image) => image.name === item.name)
                      ?.filtered && styles.filteredImg,
                  ]}
                  source={{ uri: item.image[0] }}
                />
                {selectedImages.find((image) => image.name === item.name) && (
                  <Image
                    source={require("../assets/images/visto1.png")}
                    style={styles.checkedIcon}
                  />
                )}
                <View style={styles.nameContainer}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.containerBotones}>
        <View style={styles.iconoWrapper}>
          <View style={styles.iconoMezcla}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Favoritos", { matchedRecipes })
              }
            >
              <IoSyncCircleOutline />
            </TouchableOpacity>
          </View>
          <Text style={styles.textoIcono}>Combinar</Text>
        </View>
        <View style={styles.iconoWrapper}>
          <View style={styles.iconoMezcla}>
            <TouchableOpacity onPress={() => handleRemoveFilter()}>
              <TiDeleteOutline />
            </TouchableOpacity>
          </View>
          <Text style={styles.textoIcono}>Eliminar</Text>
        </View>
      </View>
    </View>
  );
};

function handleHelpPress() {
  return <View></View>;
}

export default CombinarScreen;

const styles = StyleSheet.create({
  checkedIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    width: "40%",
    height: "40%",
    zIndex: 1,
  },
  clearButton: {
    position: "absolute",
    top: 7,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  contSafeArea: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: "35%",
  },
  buscador: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  textoIcono: {
    fontSize: 15,
    marginLeft: 50,
    marginRight: 50,
    color: "#FFFFFF",
  },
  iconoWrapper: {
    alignItems: "center",
  },
  nameContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  containerList: {
    flexDirection: "row",
    width: "100%",
    height: 542,
    top: "25%",
  },
  container: {
    marginTop: 5,
    margin: 30,
    backgroundColor: "#FAB89A",
    borderRadius: 15,
    height: 145,
    width: 140,
  },
  containerBotones: {
    position: "absolute",
    width: "100%",
    height: "10%",
    top: "90%",
    backgroundColor: "#ED903B",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textAgrega: {
    position: "absolute",
    fontFamily: "Montserrat_400Regular",
    top: "29%",
    left: "4%",
  },
  textCompatibilidad: {
    position: "absolute",
    fontFamily: "Montserrat_400Regular",
    top: "58%",
    left: "4%",
  },
  nombreApp: {
    position: "absolute",
    top: "5%",
    fontSize: 22,
    lineHeight: 24,
    color: "#003049",
    fontWeight: "bold",
  },
  img: {
    width: 140,
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  iconoEquis: {
    position: "absolute",
    top: "12%",
    fontSize: 63,
    right: "12%",
    color: "#fff",
    alignSelf: "center",
  },
  iconoMezcla: {
    fontSize: 60,
    color: "#fff",
    alignSelf: "center",
  },
  button: {
    width: 315,
    height: 25,
    bottom: -175,
    top: "17%",
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    left: "4%",
    borderColor: "#000",
  },
  textButton: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    textAlign: "left",
    color: "#003049",
    left: 22,
  },
  icon: {
    position: "absolute",
    width: 17.49,
    height: 17.49,
    left: "81.73%",
    right: "12.27%",
  },
  icon2: {
    position: "absolute",
    width: 17.49,
    height: 27.49,
    left: "21.73%",
    right: "12.27%",
  },
  button2: {
    width: 154,
    height: 40,
    top: 125,
    left: 65,
    backgroundColor: "#FDA55C",
    borderRadius: 6,
    justifyContent: "center",
  },
  textButton2: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    color: "#212121",
    left: 38,
  },
  button3: {
    width: 104,
    height: 40,
    top: 85,
    right: 95,
    backgroundColor: "#F2F2F2",
    borderRadius: 6,
    justifyContent: "center",
  },
  textButton3: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    color: "#212121",
    left: 22,
  },
  button4: {
    width: 124,
    height: 40,
    top: 100,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    justifyContent: "center",
  },
  textButton4: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    color: "#003049",
    left: 22,
    textAlign: "center",
  },
  button5: {
    width: 230,
    height: 40,
    top: 10,
    left: 90,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    justifyContent: "center",
  },
  textButton5: {
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    color: "#212121",
    left: 25,
  },
  /**
     * Esto va en linea 66
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
     */
  /*Codigo de los botones
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
    */
});
