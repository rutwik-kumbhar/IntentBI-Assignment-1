import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8081/api/v1/'
});


instance.interceptors.request.use(
    function (config) {
        const userData = localStorage.getItem('userData')
        if (userData) {
            const data = JSON.parse(userData)
            config.headers['Authorization'] = `Bearer ${data.token}`;
        }

        console.log('Request Interceptor:', config);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        // Do something with response data
        console.log('Response Interceptor:', response);
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);


export const getSalesData = async (pageNumber = 1, pageSize = 10) => {
    return instance.get(`sales/records?pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

export const login = (data) => {
    return instance.post('auth/user/sign/in', data)
}

export const deleteRecord = (id) => {
    return instance.delete(`sales/records/${id}`)
}

export const updateRecord = (id, data) => {
    return instance.put(`sales/records/${id}`, data)
}

export const addRecord = (data) => {
    return instance.post(`sales/records`, data)
}

export default instance