import * as api from '../api';

export const login = (formData, history) => async(dispatch) => {
    try {
        const { data } = await api.login(formData);
        dispatch({ type: 'AUTH', data });
        history.push('/');
    } catch (error) {
        console.log({error: error.response});
    }
}

export const register = (formData, history) => async(dispatch) => {
    try {
        const { data } = await api.register(formData);
        dispatch({ type: 'AUTH', data });
        history.push('/');
    } catch (error) {
        console.log({error: error.response});
    }
}

export const logout = () => async(dispatch) => {
    dispatch({ type: 'LOGOUT' });
}