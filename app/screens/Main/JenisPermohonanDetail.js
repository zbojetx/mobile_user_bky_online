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


const JenisPermohonanDetail = ({ navigation, route }) => {
    const [jenisPermohonanId, setJenisPermohonanId] = useState(route.params.jenisPermohonanId)
    const [jenisPermohonan, setJenisPermohonan] = useState([])

    useEffect(() => {
            getjenisPermohonanId(jenisPermohonanId)
    }, [])

    const getjenisPermohonanId= async (id) => {
        let url = '/getjenispermohonanbyid'
        const data = await get_all_by_id(url, id)

        setJenisPermohonan(data.data.datas[0])
    }


    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', flexWrap: 'wrap' }}>{jenisPermohonan.nama_permohonan}</Text>
            </View>
            <View style={{ padding: 20 }}>
                <Text> <HTML html={jenisPermohonan.syarat_permohonan} /> </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: hp('40%')
    }
})

export default JenisPermohonanDetail;