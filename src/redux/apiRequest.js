import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import { BASE_URL_AUTH, BASE_URL_USER } from '../utils/api';
import { deleteFailed, deleteStart, deleteSuccess, getFailed, getStart, getSuccess } from './userSlice';
import { headers } from '~/utils/headers';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${BASE_URL_AUTH}/login`, user);
        dispatch(loginSuccess(res.data));
        const { username, accessToken, isAdmin, _id } = res.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('username', username);
        localStorage.setItem('isAdmin', isAdmin);
        localStorage.setItem('id', _id);
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(`${BASE_URL_AUTH}/register`, user);
        dispatch(registerSuccess());
        navigate('/signin');
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const getAllUsers = async (dispatch) => {
    dispatch(getStart());
    try {
        const res = await axios.get(`${BASE_URL_USER}`, {
            headers,
        });
        dispatch(getSuccess(res.data));
    } catch (error) {
        dispatch(getFailed());
    }
};

export const deleteUser = async (dispatch, id) => {
    dispatch(deleteStart());
    try {
        const res = await axios.delete(`${BASE_URL_USER}/${id}/delete`, {
            headers,
        });
        dispatch(deleteSuccess(res.data));
        localStorage.setItem('deleteState', 'success');
    } catch (error) {
        dispatch(deleteFailed(error.response.data));
        localStorage.setItem('deleteState', 'error');
    }
};

export const logoutUser = async (dispatch, _id) => {
    dispatch(logoutStart());
    try {
        await axios.post(`${BASE_URL_AUTH}/logout`, _id, {
            headers,
        });
        dispatch(logoutSuccess());
        localStorage.clear();
    } catch (error) {
        dispatch(logoutFailed());
    }
};
