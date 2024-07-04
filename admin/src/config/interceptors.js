import axios from 'axios';
import {Constants} from "./constants";
import {Auth} from "../services/authService";
import {Alert} from "../services/alertService";
import store from "../redux/store";
import {loadingStart, loadingEnd} from '../redux/utilities/actionCreator';
// import {logOut} from "../redux/authentication/actionCreator";

const axiosInstance = axios.create({});
axiosInstance.interceptors.request.use(request => requestHandler(request));
axiosInstance.interceptors.response.use(response => successHandler(response),error => errorHandler(error));

const requestHandler = (request) => {
    store.dispatch(loadingStart());
    return request;
};

const errorHandler = (error) => {
    store.dispatch(loadingEnd());
    if (error.response && error.response.status === 401) {
        const removeStorage = () => {
            Auth.removeCookies(
                Constants.STORAGE_ACCESS_TOKEN, (callback) => Auth.removeCookies(
                    Constants.STORAGE_REFRESH_TOKEN, (callback) => Auth.removeCookies(
                        Constants.STORAGE_USER_INFO, (callback) => Auth.removeCookies(
                            Constants.STORAGE_USER_SCOPES, (callback) => Auth.removeCookies(
                                Constants.STORAGE_USER_LOGGED_IN, (callback) => {
                                    setTimeout(() => {
                                        window.location.reload(false);
                                    }, 1500);
                                }
                            )
                        )
                    )
                )
            )
        };
        // store.dispatch(logOut());
        axios.delete(Constants.AUTH + 'logout', {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${Auth.getAccessToken()}`}
        }).then(res => removeStorage()).catch((err) => removeStorage());
        // axios.post(
        //     Constants.BASE_ENDPOINT + 'auth/login-renew',
        //     {refresh: Auth.getRefreshToken()},
        //     {headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${btoa(Constants.CLIENT_ID + ':' + Constants.CLIENT_SECRET)}`}}
        //     )
        //     .then((res) => {
        //         Auth.renewTokens(res.data.data);
        //         error.config.headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${Auth.getAccessToken()}`};
        //         setTimeout(() => {
        //             axios(error.config);
        //             window.location.reload();
        //         }, 1000);
        //     })
        //     .catch((err) => store.dispatch(logOut()));
        // Alert.error({title: 'Access token expired please logout (We are working on this issue)', status: 401});
        return error
    } else if (error.response && error.response.status === 405) {
        Alert.error({title: 'something went wrong', status: 405});
        return error
    } else if (error.response && error.response.status === 406) {
        Alert.error({title: error?.response?.data?.message && typeof error.response.data.message === 'string' ? error.response.data.message : 'something went wrong', status: 406})
        return error
    } else if (error.response && error.response.status === 400) {
        Alert.error({title: 'something went wrong', status: 400});
        return error
    } else if (error.response && error.response.status === 422) {
        Alert.error({title: error?.response?.data?.message && typeof error.response.data.message === 'string' ? error.response.data.message : 'something went wrong', status: 422})
        return error
    } else {
        Alert.error({title: 'Server not found', status: 500});
        return error
    }
};

const successHandler = (response) => {
    store.dispatch(loadingEnd());
    return response
};
export default axiosInstance;
