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
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { get_all_by_id } from './../../api/api';
import HTML from 'react-native-render-html';
import { MIN_HEIGHT, IMAGE_H } from '../setting/constans';


const BeritaDetail = ({ navigation, route }) => {
    const [artikelId, setArtikelId] = useState(route.params.artikelId)
    const [artikel, setListArtikel] = useState([])
    const [artikelpath, setArtikelPath] = useState('')

    useEffect(() => {
        getAllArtikel(artikelId)
    }, [])


    const getAllArtikel = async (id) => {
        let url = '/getartikelbyid'
        const data = await get_all_by_id(url, id)
        console.log("datas")
        console.log(data)

        setListArtikel(data.data.datas.artikel[0])
        setArtikelPath(data.data.datas.host)

    }


    return (
        <ScrollView>
            <View style={styles.wrapper}>
                <Image source={{ uri: `${artikelpath}/${artikel.image}` }} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', flexWrap: 'wrap' }}>{artikel.judul}</Text>
            </View>
            <View style={{ padding: 20 }}>
                <HTML html={artikel.artikel} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: hp('40%')
    }
})

export default BeritaDetail;