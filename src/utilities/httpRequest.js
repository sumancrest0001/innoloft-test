import axios from 'axios';

const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((response) => {
                return resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const putRequest = (url, data) => {
    return new Promise((resolve, reject) => {
        axios
            .put(url, data)
            .then((response) => {
                return resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export { getRequest, putRequest };
