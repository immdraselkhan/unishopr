import { Button, notification } from 'antd';
import React from 'react';
import store from '../redux/store';

export class Alert {
    static success = ({title, status}) => {
        notification['success']({
            message: status,
            description: title.toUpperCase(),
        });
    };

    static info = ({title, status}) => {
        notification['info']({
            message: status,
            description: title.toUpperCase(),
        });
    };

    static warning = ({title, status}) => {
        notification['warning']({
            message: status,
            description: title.toUpperCase(),
        });
    };

    static error = ({title, status}) => {
        notification['error']({
            message: status,
            description: title.toUpperCase(),
        });
    };

    static confirm = ({action, noDispatch}) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => {
                notification.close(key);
                if (noDispatch) action();
                else store.dispatch(action);
            }}>
                Confirm
            </Button>
        );
        notification.open({
            message: 'Are you sure?',
            description: 'Once you do this, data can not be revoked.',
            btn,
            key,
            onClose: close,
        });
    };
}