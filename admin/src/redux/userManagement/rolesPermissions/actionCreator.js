import {RequestService as req} from '../../../services/requestService';
import { Constants } from '../../../config/constants';

export const fetchRolesPermissions = (roleId, {state, setState}) => {
    return async dispatch => {
        await req.getRequest({
            url: `${Constants.USER_MANAGEMENT}roles-permissions/${roleId}`, 
            auth: 'bearer'
        }, (cb) => {
            let arr = [];
            cb.forEach((permission) => arr = [...arr, ...permission.checked]);
            setState({ ...state, checked: arr, permissions: cb, roleId});
        });
    };
};

export const saveRolesPermissions = ({roleId, permissions}) => {
    return async dispatch => {
        await req.putRequest({
            url: `${Constants.USER_MANAGEMENT}roles-permissions`,
            body: {roleId, permissions},
            auth: 'bearer'
        }, (cb) => console.log(cb))
    };
};
