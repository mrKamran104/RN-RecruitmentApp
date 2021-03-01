import { Alert } from 'react-native';
import firebase from './firebase';

export function SignupUser(user) {
    // console.log('before SignupUser', user);
    let create_user = {
        name: user.userName,
        email: user.email,
        address: user.address,
        gender: user.gender,
        bloodGroup: user.bloodGroup,
        donor: user.donor,
        phoneNo: user.phoneNo
    }
    return (dispatch) => {
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(async (result) => {
                // handle the data ..
                // console.log(result.user.uid)
                create_user['uid'] = result.user.uid;
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response);
                    };
                    xhr.onerror = function () {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = "blob";
                    xhr.open("GET", user.photo, true);
                    xhr.send(null);
                });

                const ref = firebase.storage().ref().child(`${result.user.uid}.${user.photo.substring(user.photo.lastIndexOf('.') + 1)}`)
                let d = await ref.put(blob, { contentType: 'image/*' })
                let url = await d.ref.getDownloadURL();
                create_user['photo'] = url;
                // console.log("uploadImage", url)

                return firebase.database().ref('/').child(`users/${result.user.uid}`).set(create_user)
                    .then(() => {
                        // console.log('SignupUser database', create_user);
                        createTwoButtonAlert('Hurry',
                            'You are successfully signup,\n Click "Ok" to go Login screen', user.func);
                        dispatch({ type: 'SignupUser', payload: create_user });
                    });
            }).catch(function (error) {
                // console.log("SignupUser Error: ",error);
                dispatch({ type: 'Disable', payload: false });
                createTwoButtonAlert('Error!!!', `${error}`, () =>
                    console.log('OK Pressed'),
                );
            });
    };
}

export function Disable(para) {
    return (dispatch) => {
        dispatch({ type: 'Disable', payload: para });
    };
}

export function SigninUser(user) {
    return (dispatch) => {
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(function (result) {
                console.log(result);
                return firebase
                    .database()
                    .ref('/')
                    .child(`users/${result.user.uid}`)
                    .once('value')
                    .then((data) => {
                        console.log(data.val().address);
                        dispatch({
                            type: 'SigninUser',
                            payload: { data: data.val(), login: user.login },
                        });
                    });
            })
            .catch(function (error) {
                // Handle Errors here.
                // console.log(error);
                dispatch({ type: 'Disable', payload: false });
                createTwoButtonAlert('Error!!!', `${error}`, () =>
                    console.log('OK Pressed'),
                );
            });
    };
}

export function updateProfile(user) {
    let update_user = {
        uid: user.uid,
        email: user.email,
        name: user.userName,
        address: user.address,
        gender: user.gender,
        bloodGroup: user.bloodGroup,
        donor: user.donor,
        phoneNo: user.phoneNo
    };

    return async (dispatch) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", user.photo, true);
            xhr.send(null);
        });

        const ref = firebase.storage().ref().child(`${user.uid}.${user.photo.substring(user.photo.lastIndexOf('.') + 1)}`)
        let d = await ref.put(blob, { contentType: 'image/*' })
        let url = await d.ref.getDownloadURL();
        update_user['photo'] = url

        return firebase.database().ref('/')
            .child(`users/${user.uid}`)
            .update(update_user)
            .then(() => {
                console.log('database', update_user);
                dispatch({ type: 'updateProfile', payload: update_user });
            });
    }
}

// export function FacebookLogin() {

// }

// export function GmailLogin() {

// }

export const GetDonor = (Blood) => {
    // console.log('Blood Group: ', Blood.Group);
    let donors = [];
    return (dispatch) => {
        firebase.database().ref('/users/').orderByChild('bloodGroup').equalTo(Blood.Group).once('value')
            .then((data) => {
                // console.log('Donor data: ', data)
                data.forEach((child) => {
                    donors.push({
                        name: child.val().name,
                        email: child.val().email,
                        bloodGroup: child.val().bloodGroup,
                        address: child.val().address,
                        donor: child.val().donor,
                        gender: child.val().gender,
                        uid: child.val().uid,
                        photo: child.val().photo,
                        phoneNo: child.val().phoneNo
                    });
                });
                dispatch({ type: 'GetDonor', payload: donors });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export function Logout(data) {
    return (dispatch) =>
        firebase.auth().signOut()
            .then(() => {
                // Sign-out successful.
                dispatch({ type: 'Logout', payload: data });
            })
            .catch((error) => {
                // An error happened.
            });
}

const createTwoButtonAlert = (title, msg, func) => {
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
};
