import * as api from '../api';

export const getAnimes = () => async(dispatch) => {
    try {
        const { data } = await api.fetchAnimes();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.response);
    }
}
export const addAnime = (newAnime, history) => async(dispatch) => {
    try {
        const { data } = await api.addAnime(newAnime);
        console.log()
        dispatch({ type: 'ADD', payload: data });
        history.push('/animes');
    } catch (error) {
        console.log(error.response);
    }
}