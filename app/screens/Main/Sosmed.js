import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    Linking
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { get_all } from './../../api/api';

const JenisPermohonanList = ({ navigation }) => {
    const [sosmedAll, setSosmedAll] = useState([])

    useEffect(() => {
        jenisPermohonan()
    }, [])

    const jenisPermohonan = async () => {
        let url = '/getsosmed'
        const data = await get_all(url)
        console.log(data)
        setSosmedAll(data.datas)
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <StatusBar backgroundColor='#4b7bec' barStyle='light-content' />
            <View style={[styles.listContainer]}>
                {sosmedAll.map((item, index) =>
                    <TouchableOpacity style={[styleBerita.list]} key={index} onClick={() => Linking.openURL(`${item.url}`)}>
                        <View style={{ width: '15%', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{uri: `${item.logo_url}` }} style={{ width: 40, aspectRatio: 1 }}  />
                            </View>
                        </View>
                        <View style={{ width: '85%', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ flexWrap: 'wrap', color: 'black', fontWeight: 'bold', flexWrap: 'wrap', marginTop: 5, fontSize: 18, marginLeft: 10 }}>{item.akun}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    wrapper: {
        height: hp('40%')
    },
    imageparallax: scrollA => ({
        width: '100%',
        height: IMAGE_H,
        //top: scrollA,
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-IMAGE_H, 0, IMAGE_H, IMAGE_H + 1],
                    outputRange: [-IMAGE_H / 2, 0, IMAGE_H * 0.75, IMAGE_H * 0.75],
                }),
            },
        ],
    }),
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#9DD6EB'
    },
    listContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: wp('100%'),
        padding: 10,
    },
})

const stylesButton = (color_ref) => StyleSheet.create({
    list: {
        width: '30%',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        backgroundColor: color_ref,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: color_ref,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 4,
    }
})

const styleBerita = StyleSheet.create({
    list: {
        width: '100%',
        height: 80,
        flexDirection: "row",
        padding: 10,
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfe6e9'
    }
})

export default JenisPermohonanList;


//onPress={() => navigation.navigate('Permohonandetail', { jenisPermohonanId: item.id_jenis_permohonan })}