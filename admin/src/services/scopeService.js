import {Constants} from "../config/constants";
import Cookies from 'js-cookie';

let userScopes;
let userInfo;

const init = () => {
    userScopes = JSON.parse(Cookies.get(Constants.STORAGE_USER_SCOPES));
    userInfo = JSON.parse(Cookies.get(Constants.STORAGE_USER_INFO));
};

export class Scope {
    static checkScopes = (scopes) => {
        init();
        return (userInfo && userInfo.superAdmin) ? true : userScopes.length > 0 ? userScopes.some(function (v) {
            return scopes.indexOf(v) >= 0;
        }) : false;
    }
}
