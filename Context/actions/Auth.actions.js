import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseURL from "../../assets/common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_USER_FOLLOWING = "UPDATE_USER_FOLLOWING";

export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if(data){
            const token = data.token;
            // using AsyncStorage to set local storage in the app to access 'jwt' from anywhere
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            const userEmail = user.email;
            const updatedUser = { ...data.user}
            dispatch(setCurrentUser(decoded, updatedUser)) 
        } else {
            logoutUser(dispatch)
        }
    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Pls provide correct credentials",
            text2: ""
        });
        logoutUser(dispatch)
    })
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data)=> console.log('getUserProfile Data',data))
    .catch((error) => console.log('getUserProfile error', error))
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}

export const updateUserFollowing = ({following}) => {
    return {
        type: UPDATE_USER_FOLLOWING,
        userProfile: following
    }
}