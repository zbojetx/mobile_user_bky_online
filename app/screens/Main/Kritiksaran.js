import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { get_all, uploadsinglefile, get_all_by_id, get_all_post  } from './../../api/api';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';


const KritikSaran =  () => {
    const [kritiksaran, setKritikSaran] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [datuser, setDataUser] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const datas = await AsyncStorage.getItem('userData')
        if (datas != null){
            setDataUser(JSON.parse(datas))
        }
    }

    const createsaran = async() => {
        setIsLoading(true)
        let datas = {
            nik: datuser.nik,
            kritiksaran
        }
        let url = 'createsaran'
        const create = await uploadsinglefile(datas, url)

        if(create === 1){
            setIsLoading(false)
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Terima Kasih',
                text2: 'Saran dan Krtitik anda kami terima 👋',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        }else{
            setIsLoading(false)
        }
    }

    return (
        <View style={[styles.wrapper]}>
            <StatusBar backgroundColor='#fa8231' barStyle='light-content' />
            <Toast ref={(toastRef) => Toast.setRef(toastRef)} style={{ zIndex: 100 }} />
            <TextInput
                multiline={true}
                numberOfLines={6}
                placeholder="Tulis saran anda"
                style={[styles.textInputStyle, { marginTop: 10, textAlignVertical: 'top' }]}
                onChangeText={(text) => setKritikSaran(text)}
            />
            <TouchableOpacity onPress={createsaran} style={[styles.buttonStyle, { marginTop: 10, height: 50 }]}>
                {isLoading ? (
                    <DotIndicator color='white' size={6} />
                ) : (
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Kirim Saran & Kritik Anda</Text>
                    )}
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        backgroundColor: 'white'
    },
    buttonStyle: {
        width: '100%',
        backgroundColor: "#54a0ff",
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputStyle: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#7f8fa6',
        backgroundColor: '#f5f6fa',
        borderRadius: 8,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center'
    }
})

export default KritikSaran;
