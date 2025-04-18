// src/api/userApi.js
import axios from './axiosInstance.js';

export const fetchAllUsers = async () => {
    const res = await axios.get('/users');
    return res.data;
};
import axios from './axiosInstance';

export const getAllUsers = (roleName = '') =>
    axios.get(`/user`, {
        params: roleName ? { roleName } : {}
    }).then(res => res.data);

export const getUserById = (id) =>
    axios.get(`/user/${id}`).then(res => res.data);

export const updateUser = (id, data) =>
    axios.put(`/user/${id}`, data).then(res => res.data);

export const deleteUser = (id) =>
    axios.delete(`/user`, { params: { id } }).then(res => res.data);
