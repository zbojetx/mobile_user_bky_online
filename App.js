/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button
} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import IconIonIcons from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators, cardOverlay, HeaderTitle } from '@react-navigation/stack';

// New Layout screens
import StartScreen from './app/screens/Landing/StartScreen';
import LoginScreen from './app/screens/Landing/LoginScreen';
import SignUpScreen from './app/screens/Landing/SignUpScreen';

import MainScreen from './app/screens/Main/MainScreen';
import Pengaduan from './app/screens/Main/Pengaduan';
import Saran from './app/screens/Main/Kritiksaran';
import ListBerita from './app/screens/Main/BeritaList';
import DetailBerita from './app/screens/Main/BeritaDetail';
import ListPermohonan from './app/screens/Main/JenispermohonanList';
import BeritaDetail from './app/screens/Main/BeritaDetail';
import Auth from './app/screens/Auth/Auth';
import Tracking from './app/screens/Main/Tracking';
import JenisPelayananDetail from './app/screens/Main/JenisPermohonanDetail'
import Tes from './app/screens/Main/Tes'

import Pra from './app/screens/Tab/Pra';
import Qna from './app/screens/Tab/qna';
import Profil from './app/screens/Tab/Profil'



const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


const config = {
  timing: 4000,
  config: {
    stiffness: 3000,
    damping: 5000,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const lightPfxTheme = {
  dark: false,
  colors: {
    primary: 'rgb(58, 176, 123)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(0, 0, 0)',
    border: 'rgb(100, 100, 100)',
  },
};

const darkPfxTheme = {
  dark: true,
  colors: {
    primary: 'rgb(58, 176, 123)',
    background: 'rgb(0, 0, 0)',
    card: 'rgb(0, 0, 0)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(100, 100, 100)',
  },
};

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#0984e3"
      inactiveColor="#b2bec3"
      barStyle={{ backgroundColor: '#fff', height: 70, justifyContent: 'center' }}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={({ route }) => ({
          title: 'Beranda',
          tabBarIcon: ({ color, size }) => (
            <IconIonIcons name="ios-home-outline" size={25} color={color} />
          )
        })}
      />
      <Tab.Screen
        name="Pra"
        component={Pra}
        options={{
          title: 'Pra Berkas',
          tabBarIcon: ({ color, size }) => (
            <IconIonIcons name="ios-folder-open-outline" size={25} color={color} />
          )
        }} />
      <Tab.Screen
        name="Qna"
        component={Qna}
        options={{
          title: 'Q & A',
          tabBarIcon: ({ color, size }) => (
            <IconIonIcons name="md-mail-open-outline" size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Akun"
        component={Profil}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <IconIonIcons name="md-person-outline" size={25} color={color} />
          )
        }}
      />

    </Tab.Navigator>
  );
}

function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='StartScreen'
      //initialRouteName='Auth'
      // screenOptions={({ route }) => ({
      //   headerShown: false
      // })}
      >
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false, cardOverlayEnabled: true, }} />
        <Stack.Screen name="Route"
          component={MyTabs}
          options={({ route }) => ({
            headerShown: false
          })}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={({ route }) => ({
            headerTitle: "Heloo World"
          })}
        />
        <Stack.Screen
          name="Pengaduan"
          component={Pengaduan}
          options={{
            headerStyle: {
              backgroundColor: '#20bf6b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Kritik"
          component={Saran}
          options={{
            headerTitle: 'Kritik & Saran',
            headerStyle: {
              backgroundColor: '#fa8231',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Berita"
          component={ListBerita}
          options={{
            headerStyle: {
              backgroundColor: '#8854d0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Beritadetail"
          component={BeritaDetail}
          options={({ route }) => ({
            headerBackTitleVisible: false,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff'
          })}
        />
        <Stack.Screen
          name="Jenispermohonan"
          component={ListPermohonan}
          options={{
            headerTitle: 'Jenis Permohonan',
            headerStyle: {
              backgroundColor: '#30336b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#fa8231',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Tracking"
          component={Tracking}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#ff4757',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
         <Stack.Screen
          name="Permohonandetail"
          component={JenisPelayananDetail}
          options={({ route }) => ({
            title: 'Syarat Permohonan',
            headerStyle: {
              backgroundColor: '#30336b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="Tes"
          component={Tes}
          options={({ route }) => ({
            headerStyle: {
              backgroundColor: '#ff4757',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
});


export default App