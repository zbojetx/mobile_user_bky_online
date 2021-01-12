import React, { useState, useEffect, useRef } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    RefreshControl
} from 'react-native';
import { FAB, Modal, Portal, Provider, Appbar } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
import { Picker } from '@react-native-community/picker';
import { get_all, uploadsinglefile, get_all_by_id } from './../../api/api';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import RBSheet from "react-native-raw-bottom-sheet";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
moment.locale('id')


function Pra({ navigation }) {
    moment.locale('id')
    const [refreshing, setRefreshing] = React.useState(false);
    const [singleFile, setSingleFile] = useState(null);
    const [visible, setVisible] = useState(false);
    const [filename, setFileName] = useState("Pilih Berkas PDF")
    const [jenispermohonanlist, setJenisPermohonanList] = useState([])
    const [jenispermohonanx, setJenisPermohonan] = useState('')
    const [praberkas, setPraBerkas] = useState([])
    const [datuser, setDataUser] = useState([])

    const [isLoading, setIsLoading] = useState('')

    const refRBSheet = useRef();

    useEffect(() => {
        jenisPermohonan()
        getPraByNik()
        getData()
    }, [])

    const getData = async () => {
        const datas = await AsyncStorage.getItem('userData')
        if (datas != null){
            setDataUser(JSON.parse(datas))
        }
    }

    const jenisPermohonan = async () => {
        let url = '/getjenispermohonan'
        const data = await get_all(url)
        console.log(data)
        setJenisPermohonanList(data.datas)
    }

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const getPraByNik = async () => {
        let nik = '6172012512930003'
        let url = '/getpraberkasbynik'
        const data = await get_all_by_id(url, nik)
        console.log("datas")
        console.log(data.data.datas)
        setPraBerkas(data.data.datas)
    }

    

    const selectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setFileName(JSON.stringify(res.name))
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            // Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                // If user canceled the document selection
                //alert('Canceled');
            } else {
                // For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const uploadFile = async () => {
        setIsLoading(true)
        let url = 'createpraberkas'
        if (singleFile != null && jenispermohonanx !== '') {
            // If file selected then create FormData
            const fileToUpload = singleFile;
            const data = new FormData();
            data.append('nik',  datuser.nik);
            data.append('pdf', fileToUpload);
            data.append('jenis_pra_berkas', jenispermohonanx)
            // Please change file upload URL
            let upload = await uploadsinglefile(data, url)
            if (upload == 1) {
                setIsLoading(false)
                resetForm()
                getPraByNik()
                hideModal()
                Toast.show({
                    text1: 'Berkas berhasil di upload',
                    text2: 'Kami akan segera memeriksa berkas anda',
                });
            }
        } else {
            // If no file selected the show alert
            alert('Lengkapi Form');
        }
    };

    const resetForm = () => {
        setSingleFile(null)
        setJenisPermohonan('')
        setFileName('Pilih Berkas PDF')
    }



    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 15, borderRadius: 8 };
    return (
        <View style={{ height: '100%' }}>
            <StatusBar backgroundColor='#3867d6' barStyle='light-content' />
            <Appbar.Header
                style={{
                    backgroundColor: '#3867d6'
                }}
            >
                <Appbar.BackAction />
                <Appbar.Content title="Pra Berkas" />
                {/* <Appbar.Action icon="magnify" onPress={_handleSearch} />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
            </Appbar.Header>
            <Toast ref={(toastRef) => Toast.setRef(toastRef)} style={{ zIndex: 100 }} />
            <Provider>
                <Portal style={{ padding: 20 }}>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{ backgroundColor: '#ff4757', padding: 8, borderRadius: 8 }}>
                            <Text style={{ fontSize: 12, color: 'white' }}>Pastikan anda sudah menyiapkan dan mengisi serta melengkapi berkas yang anda dapatkan dari menu Jenis Permohonan</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.textInputStyle, { marginTop: 30, height: 50 }]}
                        >
                            <Picker
                                selectedValue={jenispermohonanx}
                                style={{ width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setJenisPermohonan(itemValue)
                                }}
                            >
                                <Picker.Item label="Pilih Jenis Permohonan" value="" />
                                {jenispermohonanlist.map((item, index) =>
                                    <Picker.Item key={index} label={item.nama_permohonan} value={item.nama_permohonan} />
                                )}

                            </Picker>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // placeholder="Pilih Jenis Permohonan"
                            style={[styles.textInputStyle, { marginTop: 10, height: 50 }]}
                            //disable
                            onPress={selectFile}
                        >
                            <Text>{filename}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={uploadFile} style={[styles.buttonStyle, { marginTop: 10, height: 50 }]}>
                            {isLoading ? (
                                <DotIndicator color='white' size={6} />
                            ) : (
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Upload Berkas</Text>
                                )}

                        </TouchableOpacity>

                    </Modal>
                </Portal>

                {praberkas.length === 0 ? (
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <IconMaterial name="folder-open" size={32} color="grey" />
                        <Text style={{ color: 'grey' }}>Belum ada berkas</Text>
                    </View>
                ) : (
                        <ScrollView style={{ padding: 10 }}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={jenisPermohonan} />
                            }
                        >
                            {praberkas.map((item, index) =>
                                <View style={[styles.ListItem]} key={index}>
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#c8d6e5', flexDirection: 'row' }}>
                                        <View style={{ width: '50%', padding: 5 }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>{item.jenis_pra_berkas}</Text>
                                        </View>
                                        <View style={{ width: '50%', padding: 5, alignItems: 'flex-end' }}>
                                            <Text style={{ fontSize: 12 }}>{moment(item.created_at).format('LL')}</Text>
                                        </View>
                                    </View>
                                    <View style={{ padding: 5 }}>
                                        <Text style={{ fontSize: 12, }}>{item.status}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => refRBSheet.current.open()} style={[styles.buttonStyle, { marginTop: 10, }]}>
                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Cek Hasil</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    )}


            </Provider>

            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={showModal}
                label="Ajukan Pra Berkas"
            />

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

            </RBSheet>
        </View>

    )
}

export default Pra;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 10,
        bottom: 10,
        backgroundColor: '#eb3b5a',
        zIndex: 10
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
    buttonStyle: {
        width: '100%',
        height: 40,
        backgroundColor: "#54a0ff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
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

