import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    StatusBar,
    TouchableOpacity, 
    Image
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB, Modal, Portal, Provider, Appbar } from 'react-native-paper';
import { NavigationRouteContext } from '@react-navigation/native';


function Profil({ navigation, route }) {

    const [datuser, setDataUser] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const datas = await AsyncStorage.getItem('userData')
        if (datas != null) {
            setDataUser(JSON.parse(datas))
        }
    }

    const Logout = () => {
        const logout =AsyncStorage.setItem('login', 'false')
        navigation.navigate('StartScreen')
    }


    return (
        <View style={{ height: '100%', backgroundColor: 'white' }}>
            <StatusBar backgroundColor='#3867d6' barStyle='light-content' />
            <Appbar.Header
                style={{
                    backgroundColor: '#3867d6'
                }}
            >
                <Appbar.BackAction />
                <Appbar.Content title="Profil" />
                {/* <Appbar.Action icon="magnify" onPress={_handleSearch} />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
            </Appbar.Header>
            <ScrollView style={{ padding: 20 }}>
                <View>
                    <Image style={[{ resizeMode: 'contain', width: 200, height: 200, margin: 20, alignSelf:'center' }]} source={require("./../../assets/img/logo.png")} />
                </View>
                <TextInput
                    style={[styles.textInputStyle]}
                    value={datuser.nik}
                />
                <TextInput
                    style={[styles.textInputStyle]}
                    value={datuser.nama_lengkap}
                />
                <TextInput
                    style={[styles.textInputStyle]}
                    value={datuser.email}
                />
                <TextInput
                    style={[styles.textInputStyle]}
                    value={datuser.no_hp}
                />
                <TouchableOpacity style={[styles.buttonStyle, { marginTop: 10, backgroundColor: '#0974cc', }]}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Perbaharui Data</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonStyle, { marginTop: 10, backgroundColor: '#e74c3c', }]} onPress={() => Logout()}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Keluar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

}

export default Profil

const styles = StyleSheet.create({
    buttonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: "#0974cc",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,

    },
    authContainer: {
        width: '100%',
        padding: 20,
        //justifyContent: 'flex-start'
    },
    textInputStyle: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#7f8fa6',
        backgroundColor: '#f5f6fa',
        borderRadius: 8,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10
    }
})