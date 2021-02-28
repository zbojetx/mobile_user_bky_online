import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { get_all, uploadsinglefile, get_all_by_id } from './../../api/api';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import "moment/min/locales";
moment.locale('id')



function Tracking({ navigation }) {
    moment.locale('id')
    const [idberkas, setIdBerkas] = useState('')
    const [trackinglist, setTrackingList] = useState([])
    const [isScan, setIsScan] = useState(false)

    const getTracking = async () => {
        let url = '/gettrackingbyid'
        if (idberkas === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Validasi',
                text2: 'Kode berkas tidak boleh kosong',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } else {
            const data = await get_all_by_id(url, idberkas)
            if(data.data.datas.length === 0){
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Validasi',
                    text2: 'Berkas tidak ditemukan',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
            }else{
                setTrackingList(data.data.datas)
            }
        }


    }

    const onSuccess = async (e) => {
        let id = e.data
        let url = '/gettrackingbyid'
        const data = await get_all_by_id(url, id)
        setTrackingList(data.data.datas)
        setIsScan(false)
    }


    return (
        <View style={{ height: '100%' }}>
            <StatusBar backgroundColor='#ff4757' barStyle='light-content' />
            <Toast ref={(toastRef) => Toast.setRef(toastRef)} />
            <View style={[styles.TrackingArea]}>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        placeholder="Masukan nomor berkas anda"
                        style={[styles.textInputStyle]}
                        onChangeText={text => setIdBerkas(text)}
                    />
                    <TouchableOpacity style={[styles.buttonQrStyle]} onPress={() => setIsScan(true)}>
                        <IconMaterial name="qr-code-scanner" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={getTracking} style={[styles.buttonStyle, { marginTop: 10, height: 50 }]}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Cari Berkas</Text>
                </TouchableOpacity>
            </View >
            {
                isScan ? (
                    <QRCodeScanner
                        onRead={onSuccess}
                        topContent={
                            < View style={{
                                width: '100%', backgroundColor: '#ff4757', marginTop: -10, justifyContent: 'center', alignItems: 'center'
                            }}>

                            </View >
                        }
                        bottomContent={
                            < View style={{ height: hp('20%'), width: '100%', backgroundColor: '#ff4757', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => setIsScan(false)} ><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
                            </View >
                        }
                    />
                ) : (
                        <ScrollView style={{ padding: 10 }}>
                            {trackinglist.map((item, index) =>
                                <View style={[styles.ListItem]} key={index}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center', padding: 10, }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment(item.created_at).format('LL')}</Text>
                                        </View>
                                        <View style={{ width: '70%' }}>
                                            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'black', borderStyle: 'dashed', borderRadius: 1, }}>
                                                <View style={{ width: '50%', padding: 5 }}>
                                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>{item.nama_bidang}</Text>
                                                </View>
                                                <View style={{ width: '50%', padding: 5, alignItems: 'flex-end' }}>
                                                    <Text style={{ fontSize: 12 }}>{item.nama_pegawai}</Text>
                                                </View>
                                            </View>
                                            <View style={{ padding: 5 }}>
                                                <Text style={{ fontSize: 12, }}>{item.status}</Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>
                            )}
                        </ScrollView>
                    )



            }

        </View >
    )
}

export default Tracking

const styles = StyleSheet.create({
    TrackingArea: {
        height: hp('25%'),
        backgroundColor: '#ff4757',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonStyle: {
        width: '95%',
        height: 40,
        backgroundColor: "#c0392b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderTopRightRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    textInputStyle: {
        width: '80%',
        backgroundColor: '#f5f6fa',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        height: 50
    },
    buttonQrStyle: {
        width: 50,
        aspectRatio: 1,
        backgroundColor: '#b2bec3',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ListItem: {

        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderTopRightRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        zIndex: 2,
        borderLeftWidth: 8,
        borderLeftColor: '#54a0ff'
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'white',
        fontWeight: 'bold'
    },
    buttonTouchable: {
        padding: 16
    }
})