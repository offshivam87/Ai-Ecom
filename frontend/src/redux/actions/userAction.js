import axios from 'axios';
import { loadUser } from '../features/UserSlice';

export const asyncLoginAction = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(
            'https://dleapkart.onrender.com/api/auth/login',
            userData,
            { withCredentials: true }
        );

        dispatch(loadUser(response.data.user));
        return response.data;

    } catch (error) {
        throw error.response.data; // frontend handle kare
    }
};

export const asyncRegisterAction = (userData) => async (dispatch, getState) => {
    const response = await axios.post('https://dleapkart.onrender.com/api/auth/register', userData);
    dispatch(loadUser(response.data));
}
