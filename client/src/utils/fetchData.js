import axios from 'axios';

// Function to get data from API
export const getDataAPI = async (url, token = localStorage.getItem("firstLogin")) => {
    const res = await axios.get(`${url}`, {
        headers: { Authorization: token }
    });
    return res;
};

// Function to post data to API
export const postDataAPI = async (url, post, token = localStorage.getItem("firstLogin")) => {
    const res = await axios.post(`${url}`, post, {
        headers: { Authorization: token }
    });
    return res;
};

// Function to update data in API
export const putDataAPI = async (url, post, token = localStorage.getItem("firstLogin")) => {
    const res = await axios.put(`${url}`, post, {
        headers: { Authorization: token }
    });
    return res;
};

// Function to patch data in API
export const patchDataAPI = async (url, post, token = localStorage.getItem("firstLogin")) => {
    const res = await axios.patch(`${url}`, post, {
        headers: { Authorization: token }
    });
    return res;
};

// Function to delete data from API
export const deleteDataAPI = async (url, token = localStorage.getItem("firstLogin")) => {
    const res = await axios.delete(`${url}`, {
        headers: { Authorization: token }
    });
    return res;
};
