import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { get_all } from './../../api/api';
//}


const BeritaList = ({ navigation, route }) => {
    const [listBerita, setlistBerita] = useState('')
    const [artikel, setListArtikel] = useState([])
    const [artikelpath, setArtikelPath] = useState('')

    useEffect(() => {
        firstRun()
    }, [])

    const firstRun = async () => {
        getAllArtikel()
    }

    const getAllArtikel = async () => {
        const data = await get_all('/getartikelall')
        console.log("data")
        console.log(data)

        setListArtikel(data.datas.artikel)
        setArtikelPath(data.datas.host)

    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <StatusBar backgroundColor='#8854d0' barStyle='light-content' />
            <View style={[styles.listContainer]}>
                {artikel.slice(0, 20).map((item, index) =>
                    <TouchableOpacity style={[styleBerita.list]} onPress={() => navigation.navigate('Beritadetail', { artikelId: item.id_artikel })} key={index}>
                        <View style={{ width: '30%', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Image source={{ uri: `${artikelpath}/${item.image}` }} style={{ width: '70%', aspectRatio: 1, borderRadius: 8 }} />
                        </View>
                        <View style={{ width: '70%', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ flexWrap: 'wrap', color: 'black', fontWeight: 'bold', flexWrap: 'wrap', marginTop: 5, fontSize: 14, }}>{item.judul}</Text>
                            <Text style={{ color: 'grey', fontWeight: 'bold', flexWrap: 'wrap', marginTop: 5, fontSize: 10 }}>{item.created_at}</Text>
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
        aspectRatio: 1,
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

export default BeritaList;
