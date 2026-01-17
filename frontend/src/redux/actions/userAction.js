import axios from 'axios';
import { loadUser } from '../features/UserSlice';

export const asyncLoginAction = (userData) => async (dispatch, getState) => {
    
    const response = await axios.post('http://localhost:3000/api/auth/login', userData, { withCredentials: true });
    dispatch(loadUser(response.data));
}

export const asyncRegisterAction = (userData) => async (dispatch, getState) => {
    const response = await axios.post('http://localhost:3000/api/auth/register', userData, { withCredentials: true });
    dispatch(loadUser(response.data));
}
