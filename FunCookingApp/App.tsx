import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './screens/Start';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import ColectionScreen from './screens/ColectionScreen';
import RecipeScreen from './screens/RecipeScreen';
import CombinarScreen from './screens/CombinarScreen';
import Hamburguesa from './screens/Hamburguesa';
import IngredientScreen from './screens/IngredientScreen';
import 'react-native-gesture-handler'
import MyDrawer from './navigation';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Start' component={Start} />
            <Stack.Screen name='Screen1' component={Screen1} />
            <Stack.Screen name='Screen2' component={Screen2} />
            <Stack.Screen name='Screen3' component={Screen3} />
            <Stack.Screen name='Combinar' component={CombinarScreen} />
            <Stack.Screen name='Colection' component={ColectionScreen} />
            <Stack.Screen name='Recipe' component={RecipeScreen} />
            <Stack.Screen name='Hamburguesa' component={Hamburguesa} />
            <Stack.Screen name='Ingredient' component={IngredientScreen} />
        </Stack.Navigator>
    )
}

//<NavigationContainer>
//<MyStack />
//</NavigationContainer>

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}