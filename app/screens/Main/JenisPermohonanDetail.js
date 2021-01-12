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
    const [artikelId, setArtikelId] = useState()
    const [artikel, setListArtikel] = useState([])
    const [artikelpath, setArtikelPath] = useState('')


    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', flexWrap: 'wrap' }}>Permohonan Pemecahan Bidang</Text>
            </View>
            <View style={{ padding: 20 }}>
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
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