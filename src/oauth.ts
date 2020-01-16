import axios from 'axios';


// axios.interceptors.request.use((config: any) => {
//     const token = 'test token';
//     if (token !== null) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (err: any) => {
//     return Promise.reject(err);
// })

const api = axios.create();
api.interceptors.request.use(function(config: any) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0Iiwicm9sZSI6MCwiZmlyc3ROYW1lIjpudWxsLCJsYXN0TmFtZSI6bnVsbCwiaWF0IjoxNTc5MTg4MjM2fQ.VOntpkTBSsTA_TCan3FyA9W_J8l1XHmJLUzTvbMQsl0";
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-type'] = 'application/json';
    return config;
}, (err:any) => {
    return Promise.reject(err);
});
console.log(api);
export { api }