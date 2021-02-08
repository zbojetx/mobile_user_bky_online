import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, BackHandler, StatusBar, Alert } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated from 'react-native-reanimated';
import Swiper from 'react-native-swiper';
import { MIN_HEIGHT, IMAGE_H } from '../setting/constans';
import Icon from 'react-native-vector-icons/Ionicons';
import { get_all } from './../../api/api';
import RBSheet from "react-native-raw-bottom-sheet";


const buttonItem = [
    {   
        id:1,
        title: 'Jenis Permohonan',
        icon: 'document-attach',
        route: 'Jenispermohonan',
        color: '#30336b'
    },
    {
        id:2,
        title: 'Tracking',
        icon: 'compass',
        route: 'Tracking',
        color: '#ff4757'
    },
    {
        id:3,
        title: 'Berita',
        icon: 'earth',
        route: 'Berita',
        color: '#8854d0'
    },
    {
        id:4,
        title: 'Kritik & Saran',
        icon: 'mail',
        route: 'Kritik',
        color: '#fa8231'
    },
    {
        id:5,
        title: 'Pengaduan',
        icon: 'mic',
        route: 'Pengaduan',
        color: '#20bf6b'
    },
    {
        id:6,
        title: 'Ikuti Kami',
        icon: 'ios-logo-facebook',
        route: 'Sosmed',
        color: '#4b7bec'
    },

]

const MainScreen = ({ navigation, route }) => {

    const scrollA = useRef(new Animated.Value(0)).current
    const [banner, setBanner] = useState([])
    const [bannerpath, setBannerPath] = useState('')
    const [artikel, setListArtikel] = useState([])
    const [artikelpath, setArtikelPath] = useState('')
    const [sosmed, setSosmed] = useState([])

    const refRBSheet = useRef();

    useEffect(() => {
        firstRun()
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])

    const backAction = () => {
        if (navigation.isFocused()) {
            Alert.alert("Keluar", "Keluar Aplikasi?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
    };

    const firstRun = async () => {
        getAllBanner()
        getAllArtikel()
    }

    const getAllBanner = async () => {
        const data = await get_all('/getbanneractive')

        setBanner(data.datas.banner)
        setBannerPath(data.datas.host)

    }

    const getAllArtikel = async () => {
        const data = await get_all('/getartikelall')
        console.log("data")
        console.log(data)

        setListArtikel(data.datas.artikel)
        setArtikelPath(data.datas.host)
    }

    const getAllSosmed = async () => {
        const data = await get_all('/getsosmed')

        setSosmed(data.datas)
    }

    return (
        <Animated.ScrollView
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                { useNativeDriver: true },
            )}
            scrollEventThrottle={16}
        >
            <StatusBar backgroundColor='#3867d6' barStyle='light-content' />
            
            {/* <StatusBar translucent backgroundColor='transparent' barStyle='light-content' /> */}
            {/* <StatusBar translucent backgroundColor='transparent' /> */}
            <Animated.View style={styles.imageparallax(scrollA)}>
                <Swiper style={styles.wrapper}
                    //autoplay
                    dot={
                        <View
                            style={{
                                backgroundColor: 'rgba(0,0,0,.2)',
                                width: 5,
                                height: 5,
                                borderRadius: 2,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3,
                                alignSelf: 'flex-start'
                            }}
                        />
                    }
                    activeDot={
                        <View
                            style={{
                                backgroundColor: '#f0932b',
                                width: 10,
                                height: 5,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                    } >
                    {banner.map((data, index) =>
                        <View style={styles.slide1} key={index}>
                            <Image source={{ uri: `${bannerpath}/${data.file}` }} style={{ width: '100%', height: '100%' }} />
                        </View>
                    )}
                    {/* <View style={styles.slide1}>
                        <Image source={require('../../assets/img/nn.jpg')} style={{ width: '100%', height: '100%' }} />
                    </View> */}
                </Swiper>
            </Animated.View>

            <View style={[styles.listContainer]}>
                {buttonItem.map((item, index) =>
                    <TouchableOpacity style={[stylesButton(item.color).list]} onPress={() => navigation.navigate(item.route)} key={index}>
                        <Icon name={item.icon} size={40} color="white" />
                        <Text style={{ color: 'white', fontWeight: 'bold', flexWrap: 'wrap', marginTop: 5, fontSize: 10 }}>{item.title}</Text>
                    </TouchableOpacity>
                )}

            </View>

            <View style={[styles.listContainer]}>
                {artikel.slice(0, 5).map((item, index) =>
                    <TouchableOpacity style={[styleBerita.list]} onPress={() => navigation.navigate('Beritadetail', { artikelId: item.id_artikel })}  key={index}>
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

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                //height={hp('40%')}
                openDuration={250}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",

                    },
                    container: {
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 2.22,
                        elevation: 10,
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >

                {sosmed.map((item, index) => 
                    <Text>{item.logo_url}</Text>
                )}

            </RBSheet>
            

        </Animated.ScrollView>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        height: hp('50%')
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



export default MainScreen