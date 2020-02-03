import axios from 'axios';
import { loadState } from './StateLoader';

const api = axios.create();
api.interceptors.request.use(function (config: any) {
    const user = loadState().user;
    if (typeof user === 'undefined' || user === null) {

        return config;
    } else {
        const token = user.token;
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-type'] = 'application/json';
        return config;
    }
}, (err: any) => {
    return Promise.reject(err);
});

export { api }