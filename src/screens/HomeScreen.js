import {
    Card,
    CardItem,
    Right
} from 'native-base';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Picker, ScrollView, StyleSheet, Text, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { GetDonor } from '../store/actions';
import Header from './../utils/Header';
import DetailsScreen from './DetailsScreen';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

function HomeScreen(props) {

    const { navigation } = props;
    const [searchVal, setSearchVal] = useState('');

    return (
        <View
            style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: '#c1cdd0',
            }}>
            <Header Title="Home" Drawer={() => props.navigation.toggleDrawer()} />
            {/* <Text style={{ padding: 20 }}>Home Screen</Text> */}
            <View
                style={{
                    marginHorizontal: 15,
                    marginTop: 15,
                }}>
                <Text style={{ textAlignVertical: 'center' }}>
                    Please choose Blood Group:
          </Text>
                <View
                    style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Picker
                        selectedValue={searchVal}
                        style={{ height: 20, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => {
                            itemValue === '' ? null : setSearchVal(itemValue);
                            itemValue === '' ? null : console.log(itemValue);
                        }}>
                        <Picker.Item label="Select Blood Group" value="" />
                        <Picker.Item label="A+" value="A+" />
                        <Picker.Item label="A-" value="A-" />
                        <Picker.Item label="B+" value="B+" />
                        <Picker.Item label="B-" value="B-" />
                        <Picker.Item label="AB+" value="AB+" />
                        <Picker.Item label="AB-" value="AB-" />
                        <Picker.Item label="O+" value="O+" />
                        <Picker.Item label="O-" value="O-" />
                    </Picker>
                    <TouchableOpacity
                        onPress={() => props.GetDonor({ Group: searchVal })}
                        style={{
                            backgroundColor: 'green',
                            padding: 8,
                            borderRadius: 4,
                            // marginTop: 20,
                        }}>
                        <Text style={{ color: 'white' }}>Get Donor</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
  
        <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setSearchVal(text)}
        placeholder="Search Blood Group"
        value={searchVal}
      />*/}

            {/* </View>  */}
            <ScrollView style={{ marginTop: 25, marginBottom: 55 }}>
                {props.getDonors?.map((v, i) => {
                    return (
                        props.uid === v.uid ? null :
                            v.donor ? (
                                <View style={{ alignItems: 'center' }} key={i}>
                                    <Card style={{ width: WIDTH - 20 }}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('Details', { params: { select: v } }) }}>
                                            <CardItem>
                                                {/* <Icon type="MaterialIcons" name="chevron-right" style={{ fontSize: 20, fontWeight: 'bold' }} /> */}
                                                <Image
                                                    source={{ uri: v.photo }}
                                                    style={{
                                                        height: 60,
                                                        width: 60,
                                                        marginRight: 10,
                                                        resizeMode: 'contain',
                                                        alignSelf: 'center',
                                                    }}
                                                />
                                                <View>
                                                    <Text>{v.name}</Text>
                                                    <Text>{v.address}</Text>
                                                </View>
                                                <Right>
                                                    <View style={{ alignItems: 'flex-start' }}>
                                                        <Text>{v.bloodGroup}</Text>
                                                        <Text>{v.gender ? 'Male' : 'Female'}</Text>
                                                    </View>
                                                </Right>
                                                {/* <Right style={{ position: 'absolute', right: 15, flexDirection: 'row', flexWrap: 'wrap', }}>
                                              <Icon type="MaterialIcons" name="edit" style={{ fontSize: 35, color: 'green', marginRight: 10 }} onPress={() => editTodo(v, i)} />
                                              <Icon type="MaterialIcons" name="delete-forever" style={{ fontSize: 35, color: 'red', }} onPress={() => delTodo(i)} />
                                            </Right> */}
                                            </CardItem>
                                        </TouchableOpacity>
                                    </Card>
                                </View>
                            ) : null
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: WIDTH, backgroundColor: '#ffffff' },
    contentContainer: {
        backgroundColor: '#f6f6f6',
        flex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    searchContainer: {
        padding: 32,
    },
});

function mapStateToProp(state) {
    return {
        getDonors: state.root.getDonors,
        uid: state.root.uid,
    };
}
function mapDispatchToProp(dispatch) {
    return {
        GetDonor: (data) => {
            dispatch(GetDonor(data));
        },
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(HomeScreen);
