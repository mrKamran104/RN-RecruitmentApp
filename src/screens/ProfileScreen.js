import {
    ActionSheet, Button,
    CheckBox, Form,
    Input, Item,
    Label
} from 'native-base';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Picker, StyleSheet, Text, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { updateProfile } from '../store/actions';
import { openCamera, openGallery } from '../utils/ImageSelection';
import Header from './../utils/Header';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

var BUTTONS = [
    { text: "Choose from Gallery", icon: "camera", iconColor: "#2c8ef4" },
    { text: "Capture from Camera", icon: "camera", iconColor: "#f42ced" },
    // { text: "Delete", icon: "trash", iconColor: "#fa213b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
// var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 2;

function ProfileScreen(props) {
    // const ImageUri = Image.resolveAssetSource(demo).uri;

    // const [login, setLogin] = useState(false)
    // const { navigation } = props;
    const [userName, setUserName] = useState(props.userName);
    const [genderRadio, setGenderRadio] = useState(props.gender);
    const [userAddress, setUserAddress] = useState(props.address);
    const [userEmail, setUserEmail] = useState(props.email);
    const [resourcePath, setResourcePath] = useState(props.photo);
    const [bgSelected, setBgSelected] = useState(props.bloodGroup)
    const [donor, setDonor] = useState(props.donor)
    const [edit, setEdit] = useState(false);
    const [phoneNo, setPhoneNo] = useState(props.phoneNo)

    // console.log("Profile", donor, bgSelected, props.bloodGroup)
    const EditProfile = () => {
        if (userName === '' || userAddress === '' || phoneNo === '') {
            // setError('Fields are required');
            createTwoButtonAlert('Error!!!', 'All fields are required!!!', () => console.log('OK Pressed'));
            return;
        }
        setEdit(true);
        if (edit) {
            props.updateProfile({
                uid: props.uid,
                userName: userName,
                address: userAddress,
                email: userEmail,
                gender: genderRadio,
                bloodGroup: bgSelected,
                donor: donor,
                photo: resourcePath,
                phoneNo: phoneNo
            });
            setEdit(false);
        }
        // props.SignupUser({email: userEmail, password: userPass, userName: userName})
        // createTwoButtonAlert('Hurry', 'You are successfully signup,\n Click "Ok" to go Login screen', ()=> navigation.navigate('Signin', {params: {userName: userName}}));
        // console.log('Signup Email', props.SignupUser);
        // props.Login(true);
    };

    const RadioButton = (props) => {
        return (
            <View
                style={[
                    {
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    props.style,
                ]}>
                {props.selected ? (
                    <View
                        style={[
                            {
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#000',
                            },
                            props.innerStyle,
                        ]}
                    />
                ) : null}
            </View>
        );
    };

    const createTwoButtonAlert = (title, msg, func) =>
        Alert.alert(
            title,
            msg,
            [
                ,
                // {
                //   text: "Cancel",
                //   onPress: () => console.log("Cancel Pressed"),
                //   style: "cancel"
                // },
                { text: 'OK', onPress: func },
            ],
            { cancelable: false },
        );

    return (
        <View
            style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: 'white',
            }}>
            <Header Title="Profile" Drawer={() => props.navigation.toggleDrawer()} />
            <View style={{ marginTop: 15 }}>
                <TouchableOpacity
                    disabled={!edit ? true : false}
                    onPress={
                        () =>
                            ActionSheet.show(
                                {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                    title: "Please select a option:"
                                },
                                async (buttonIndex) => {
                                    if (buttonIndex === 0) {
                                        let d = await openGallery(resourcePath); setResourcePath(d)
                                    }
                                    else if (buttonIndex === 1) {
                                        let d = await openCamera(resourcePath); setResourcePath(d)
                                    }
                                    else {

                                    }
                                }
                            )
                    } >
                    <Image
                        source={{ uri: resourcePath }}
                        style={{
                            height: 150,
                            width: 150,
                            resizeMode: 'cover',
                            alignSelf: 'center',
                            borderRadius: 150
                        }}
                    />
                    {/* <Text style={styles.buttonText}>Select File</Text> */}
                </TouchableOpacity>
            </View>

            {/* <View> */}
            <View style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input
                            value={userName}
                            onChangeText={(val) => setUserName(val)}
                            disabled={!edit ? true : false}
                        />
                    </Item>

                    <Text style={{ marginStart: 20, fontSize: 16, marginTop: 10 }}>
                        Gender
            </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: 80,
                            marginTop: 10,
                        }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => setGenderRadio(true)} disabled={!edit ? true : false}>
                            {RadioButton({
                                selected: genderRadio,
                                style: { borderColor: 'green' },
                                innerStyle: { backgroundColor: 'green' },
                            })}
                            <Text style={{ paddingLeft: 10, textAlignVertical: 'center' }}>
                                Male
                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => setGenderRadio(false)} disabled={!edit ? true : false}>
                            {RadioButton({
                                selected: !genderRadio,
                                style: { borderColor: 'green' },
                                innerStyle: { backgroundColor: 'green' },
                            })}
                            <Text style={{ paddingLeft: 10, textAlignVertical: 'center' }}>
                                Female
                </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginStart: 15, marginTop: 15, flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{ textAlignVertical: 'center' }}>Please choose your Blood
                        Group:
  </Text>


                        {!edit ?
                            <Picker
                                selectedValue={bgSelected}
                                style={{ height: 20, width: 150 }}
                            >
                                <Picker.Item label={bgSelected} value={bgSelected} />
                            </Picker>
                            :
                            <Picker
                                selectedValue={bgSelected}
                                style={{ height: 20, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => { setBgSelected(itemValue); console.log(itemValue) }}
                            >
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>}
                    </View>

                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            value={userEmail}
                            // autoCompleteType="email"
                            disabled={true}
                            onChangeText={(val) => setUserEmail(val)}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Address</Label>
                        <Input
                            value={userAddress}
                            disabled={!edit ? true : false}
                            onChangeText={(val) => setUserAddress(val)}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Phone #</Label>
                        <Input
                            value={phoneNo}
                            disabled={!edit ? true : false}
                            onChangeText={(val) => setPhoneNo(val)}
                        />
                    </Item>
                </Form>
                <View style={{ marginStart: 15, marginTop: 20, flexDirection: 'row', }}>
                    <CheckBox checked={donor} onPress={() => setDonor(!donor)} disabled={!edit ? true : false} />
                    <Text style={{ marginStart: 25 }}>I want to be a Donor</Text>
                </View>

            </View>
            <View style={styles.container2}>
                <Button style={styles.signup} onPress={EditProfile} iconLeft block>
                    <Text style={{ color: 'white' }}>{!edit ? 'Edit' : 'Update'}</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        // bottom: 50,
        // backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 30,
        // flex: 0.3,
        // borderWidth: 5,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
    },
    container2: {
        width: WIDTH,
        // bottom: 50,
        // backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 30,
        // position: 'absolute',
        // zIndex: 2,
        // left: 0,
        // bottom: 0,
        // flex: 0.3,
        // flex: 0.3,
        // borderWidth: 5,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
    },
    signup: {
        marginTop: 50,
        marginEnd: 30,
        marginStart: 30,
        backgroundColor: 'green',
    },
    backButton: {
        // color: 'white',
        position: 'absolute',
        top: 10,
        left: 15,
        // backgroundColor: '',
        // fontSize: 20,
    },
    boder: {
        borderTopRightRadius: 80,
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    image: {
        // flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 42,
        paddingTop: 15,
        paddingBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        // backgroundColor: '#000000a0',
    },
    ImageBg: {
        flex: 1,
        // height: 50,
        flexDirection: 'column',
    },
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
        userName: state.root.userName,
        email: state.root.email,
        address: state.root.address,
        uid: state.root.uid,
        gender: state.root.gender,
        bloodGroup: state.root.bloodGroup,
        donor: state.root.donor,
        photo: state.root.photo,
        phoneNo: state.root.phoneNo,
    };
}
function mapDispatchToProp(dispatch) {
    return {
        updateProfile: (data) => { dispatch(updateProfile(data)); },
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(ProfileScreen);
