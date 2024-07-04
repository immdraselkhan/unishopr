import actions from './actions';
import {RequestService as req} from '../../services/requestService';
import { Constants } from '../../config/constants';
import { Alert } from '../../services/alertService';
import { Auth } from '../../services/authService';
import history from '../../utility/history';

const {  } = actions;

const login = (data) => {
    return async dispatch => {
        req.postRequest({ url: Constants.AUTH + 'login', auth: 'basic', body: data}, (cb) => {
            Auth.setCookies(
                Constants.STORAGE_ACCESS_TOKEN,
                cb.access, (callback) => Auth.setCookies(
                    Constants.STORAGE_REFRESH_TOKEN,
                    cb.refresh, (callback) => Auth.setCookies(
                        Constants.STORAGE_USER_INFO,
                        cb.user, (callback) => Auth.setCookies(
                            Constants.STORAGE_USER_SCOPES,
                            cb.scopes, (callback) => Auth.setCookies(
                                Constants.STORAGE_USER_LOGGED_IN,
                                true, (callback) => {
                                    setTimeout(() => {
                                        history.push('/admin');
                                        window.location.reload(false);
                                    }, 1500);
                                }
                            )
                        )
                    )
                )
            )
        })
    };
};

const logOut = () => {
    return async dispatch => {
        try {
            Alert.info({title: 'Logging out..'});
            req.deleteRequest({ url: Constants.AUTH + 'logout', auth: 'bearer'}, (cb) => {
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
            });
        } catch (err) {
            console.log(err)
        }
    };
};

const changePassword = (data, action) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.AUTH}change-password`,
            auth: 'bearer',
            body: data
        }, async (cb) => {
            if (action) action()
        })
    };
};

export { login, logOut, changePassword };
