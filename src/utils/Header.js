import {
    Icon
} from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Header = (props) => {

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity style={{marginStart: 5,}} onPress={props.Drawer}>
                    <Icon tyle="Feather" name="menu" size={24} color="#6b6b6b" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.Title}>{props.Title}</Text>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        paddingVertical: 12,
        textAlign: 'center',
        backgroundColor: 'white',
        // paddingRight: 50
    },
    Title: { color: '#000000', fontWeight: 'bold', fontSize: 30, marginLeft: 50},
})
