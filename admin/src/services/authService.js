import {Constants} from "../config/constants";
import Cookies from 'js-cookie';

let accessToken;
let refreshToken;
let userInfo;

const init = () => {
    accessToken = JSON.parse(Cookies.get(Constants.STORAGE_ACCESS_TOKEN));
    refreshToken = JSON.parse(Cookies.get(Constants.STORAGE_REFRESH_TOKEN));
    userInfo = JSON.parse(Cookies.get(Constants.STORAGE_USER_INFO));
};

export class Auth {
    static setCookies = (key, data, callback) => callback(Cookies.set(key, JSON.stringify(data)));
    static removeCookies = (key, callback) => callback(Cookies.remove(key));

    static getAccessToken = () => {
        init();
        return accessToken.token;
    };

    static getRefreshToken = () => {
        init();
        return refreshToken.token;
    };

    static getUserInfo = () => {
        init();
        return userInfo;
    };

    static clearLocalStorage = () => {
        init();
        setTimeout(() => window.location.href = window.location.origin + '/login', 1500);
        localStorage.clear();
    };

    static userLocked = () => {
        init();
        setTimeout(() => window.location.href = window.location.origin + '/locked', 1500);
    };

    static renewTokens = (data) => {
        // Alert.error({title: 'Please try again', status: 'Token Renewed!'});
        Auth.setCookies(Constants.STORAGE_ACCESS_TOKEN, data.access, (cb) => {
            Auth.setCookies(Constants.STORAGE_REFRESH_TOKEN, data.refresh, (cb) => {
                return true;
            })
        })
    }


}
