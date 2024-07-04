import axiosInstance from '../config/interceptors'
import {Constants} from "../config/constants";
import {Auth} from "./authService";
import {Alert} from "./alertService";

const getHeaders = (type) => (type === 'basic')
    ? {'Content-Type': 'application/json', 'Authorization': `Basic ${btoa(Constants.CLIENT_ID + ':' + Constants.CLIENT_SECRET)}`}
    : {'Content-Type': 'application/json', 'Authorization': `Bearer ${Auth.getAccessToken()}`};

export class RequestService {
    static getRequest({url, queries, auth, disableAlert}, callback) {
        axiosInstance.get(url, {headers: getHeaders(auth), params: queries}).then((res) => {
            if (res?.status && res?.status === 200 && res?.data?.data)
                callback(res?.data?.data);
            else if (res?.status && res?.status === 205 && res?.status && res?.data?.message)
                if (!disableAlert)
                    Alert.info({title: res?.data?.message && typeof res?.data?.message === 'string' ? res?.data?.message : 'no data found'});
        });
    }

    static postRequest({url, body, auth, disableAlert}, callback) {
        axiosInstance.post(url, body, {headers: getHeaders(auth)}).then((res) => {
            if (res.status === 201) {
                if (!disableAlert)
                    Alert.success({title: res?.data?.message && typeof res?.data?.message === 'string' ? res?.data?.message : 'success', status: 201});
                callback(res?.data?.data ? res?.data?.data : null);
            }
        });
    }

    static deleteRequest({url, queries, auth, disableAlert}, callback) {
        axiosInstance.delete(url, {headers: getHeaders(auth), params: queries}).then((res) => {
            if (res.status === 202) {
                if (!disableAlert)
                    Alert.success({title: res.data && res.data.message && typeof res.data.message === 'string' ? res.data.message : 'success', status: 202});
                callback(res.data && res.data ? res.data : null);
            }
        });
    }

    static putRequest({url, body, auth, disableAlert}, callback) {
        axiosInstance.put(url, body, {headers: getHeaders(auth)}).then((res) => {
            if (res.status === 202) {
                if (!disableAlert)
                    Alert.success({title: res?.data?.message && typeof res?.data?.message === 'string' ? res?.data?.message : 'success', status: 202});
                callback(res?.data?.data ? res?.data?.data : null);
            }
        });
    }

    static uploadRequest({file, alias, directory, disableAlert}, callback) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("alias", alias);
        formData.append("directory", directory);

        axiosInstance.post(`${Constants.UTILITIES}upload-file`, formData, {
            headers: getHeaders('bearer'),
            'Content-Type': 'multipart/form-data'
        }).then((res) => {
            if (res.status === 201) {
                if (!disableAlert)
                    Alert.success({title: res?.data?.message && typeof res?.data?.message === 'string' ? res?.data?.message : 'success', status: 201});
                callback(res?.data?.data ? res?.data?.data : null);
            }
        });
    }
}