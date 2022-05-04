import axios from 'axios';
import env from "react-dotenv";


const Axios = axios.create({
    baseURL: env.END_POINT
});

Axios.interceptors.request.use((config) => {
    // config.params['api_key'] = "ee58e73e99cf0fb8cc3ded0d80f4e990";
    config.params = config.params || {};
    return config;
});

export default Axios;