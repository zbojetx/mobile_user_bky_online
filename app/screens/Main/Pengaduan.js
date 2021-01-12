import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';
import { Button } from 'react-native-paper';


const Pengaduan = () => {
    const [oengaduan, setPengaduan] = useState('')
    return (
        <View style={[styles.wrapper]}>
            <StatusBar backgroundColor='#20bf6b' barStyle='light-content' />
            <TextInput
                multiline={true}
                numberOfLines={6}
                placeholder="Tulis aduan anda"
                style={{ 
                    borderRadius:8,
                    borderWidth: 1,
                    borderColor: 'grey',
                    textAlignVertical: 'top',
                    marginBottom: 20,
                 }}
            //onChangeText={(text) => this.setState({ text })}
            />
            <Button icon="camera" mode="outlined" onPress={() => console.log('Pressed')} labelStyle={{ color: 'black' }} style={{ marginBottom: 10 }}> Ambil Foto </Button>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}> Simpan </Button>
        </View>
    )

}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        backgroundColor: 'white'
    }
})

export default Pengaduan;
