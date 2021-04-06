export default (animes = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'ADD':
            return [...animes, action.payload];
        default:
            return animes;
    }
}