import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import { get_all, uploadsinglefile, get_all_by_id, loginPost } from './../../api/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RBSheet from "react-native-raw-bottom-sheet";
import { ScrollView } from 'react-native-gesture-handler';
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
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onboard1 = require('./../../assets/img/onboard/on1.png')
const onboard2 = require('./../../assets/img/onboard/on2.png')
const onboard3 = require('./../../assets/img/onboard/on3.png')

const onboard = [
    {   
        title: "Pra Berkas",
        desc: 'Periksakan berkas anda sebelum mengajukan permohonan resmi',
        image: onboard1
    },
    {
        title: "Buat Pertanyaan",
        desc: 'Buat pertanyaan seputar informasi pertanahan yang ada di sekitar anda',
        image: onboard2
    },
    {
        title: "Tracking Berkas",
        desc: 'Pantau perjalanan berkas permohonan anda',
        image: onboard3
    },
]




function Login({ navigation }) {

    const refRBSheet = useRef();
    const refRBSheet2 = useRef();

    const [nik, setNik] = useState('')
    const [nama_lengkap, setNamaLengkap] = useState('')
    const [email, setEmail] = useState('')
    const [no_hp, setNoHp] = useState('')
    const [akses, setAkses] = useState('')
    const [isLoading, setIsLoading] = useState(false)
   

    const Validation = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (nik.length < 16) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Validasi',
                text2: 'NIK harus memiliki 16 karakter',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } else if (nik === '' || nama_lengkap === '' || no_hp === '' || email === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Validasi',
                text2: 'Form tidak boleh kosong',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } else if (reg.test(email) === false) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Validasi',
                text2: 'Email tidak valid',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } else {
            Daftar()
        }
    }


    const Daftar = async () => {
        setIsLoading(true)
        let datas = {
            nik,
            nama_lengkap,
            email,
            no_hp,
        }
        let url = 'createpemohon'
        let daftar = await uploadsinglefile(datas, url)
        if (daftar === 1) {
            setIsLoading(false)
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Pendaftaran Berhasil',
                text2: 'Silahkan cek email anda untuk informasi kode akses 👋',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            refRBSheet2.current.close()
            refRBSheet.current.open()
        } else {
            setIsLoading(false)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Pendaftaran gagal',
                text2: 'Email atau NIK sudah terdaftar',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        }
    }

    const Login = async () => {

        setIsLoading(true)
        let datas = {
            email,
            akses
        }

        let url = 'loginpemohon'

        let login = await loginPost(datas, url)
        if (login.status === 1) {
            const jsonValue = JSON.stringify(login.datas.data[0])
            console.log(jsonValue)
            let setlogin = await AsyncStorage.setItem('login', true)
            let userdata = await AsyncStorage.setItem('userData', jsonValue)
            setIsLoading(false)
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Login Berhasil',
                text2: 'Anda akan di alihkan ke halaman utama 👋',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            refRBSheet.current.close()
            toHOme()

        } else {
            setIsLoading(false)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Login gagal',
                text2: 'Email atau Akses tidak sesuai',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        }
    }

    const toHOme = () => {
        navigation.navigate('Route')
    }


    return (
        <View style={[styles.wrapper]}>
            <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
            <Toast ref={(toastRef) => Toast.setRef(toastRef)} style={{ zIndex: 100 }} />
            <View style={[styles.swipperStyleContainer]}>
                <Swiper 
                    autoplay
                    autoplayTimeout = {4}
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
                                backgroundColor: 'white',
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
                    {onboard.map((data, index) =>
                        <View key={index}  >
                            <View style={styles.slide1} key={index}>
                                <Image source={data.image} resizeMode='contain' style={{ width: '80%', height:'60%' }} />
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{data.title}</Text>
                                <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center', marginLeft: 20, marginRight:20, marginTop:20,  textAlign:'center' }}>{data.desc}</Text>
                            </View>
                        </View>
                    )}
                    {/* <View style={styles.slide1}>
                        <Image source={require('../../assets/img/nn.jpg')} style={{ width: '100%', height: '100%' }} />
                    </View> */}
                </Swiper>
            </View>
            <View style={[styles.buttonStyleContainer]}>
                <TouchableOpacity onPress={() => refRBSheet.current.open()} style={[styles.buttonStyle]}>
                    <Text style={{ fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => refRBSheet2.current.open()} style={[styles.buttonStyle, { marginTop: 10, backgroundColor: '#0974cc', }]}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Daftar</Text>
                </TouchableOpacity>
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
                <View style={[styles.authContainer, { marginTop: 10, }]}>
                    <TextInput
                        placeholder="Masukan email terdaftar"
                        style={[styles.textInputStyle]}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        placeholder="Kode Akses"
                        style={[styles.textInputStyle, { marginTop: 10, }]}
                        //secureTextEntry={true}
                        onChangeText={(text) => setAkses(text)}
                    />
                    <TouchableOpacity onPress={Login} style={[styles.buttonStyle2, { marginTop: 20, }]}>
                        {isLoading ? (
                            <DotIndicator color='white' size={6} />
                        ) : (
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Login</Text>
                            )}
                    </TouchableOpacity>
                </View>
            </RBSheet>

            <RBSheet
                ref={refRBSheet2}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={hp('50%')}
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
                <ScrollView style={[styles.authContainer, { marginTop: 10, }]}>
                    <TextInput
                        placeholder="Nomor Induk Kependudukan (NIK)"
                        keyboardType='numeric'
                        maxLength={16}
                        style={[styles.textInputStyle, { marginTop: 10, }]}
                        onChangeText={(text) => setNik(text)}

                    />
                    <TextInput
                        placeholder="Nama Lengkap"
                        style={[styles.textInputStyle, { marginTop: 10, }]}
                        onChangeText={(text) => setNamaLengkap(text)}

                    />
                    <TextInput
                        placeholder="Email"
                        style={[styles.textInputStyle, { marginTop: 10, }]}
                        onChangeText={(text) => setEmail(text)}

                    />
                    <TextInput
                        placeholder="Nomor Handphone"
                        keyboardType='numeric'
                        style={[styles.textInputStyle, { marginTop: 10, }]}
                        onChangeText={(text) => setNoHp(text)}

                    />
                    <TouchableOpacity onPress={Validation} style={[styles.buttonStyle2, { marginTop: 20, }]} disabled={isLoading}>
                        {isLoading ? (
                            <DotIndicator color='white' size={6} />
                        ) : (
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>Daftar</Text>
                            )}
                    </TouchableOpacity>
                </ScrollView>
            </RBSheet>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#2e86de',
    },
    slide1: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextContainer : {
        height: '20%',
        width: '100%'
    },
    swipperStyleContainer: {
        width: wp('100%'),
        height: hp('80%'),
        bottom: 0
    },
    buttonStyleContainer: {
        width: wp('100%'),
        height: hp('20%'),
        bottom: 0,
        padding: 20,
        justifyContent: 'flex-end'
    },
    buttonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    buttonStyle2: {
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
        paddingRight: 20
    }

})