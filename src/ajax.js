import { key, url } from './constants';

export default {
    async fetchMovies(db, type, count=1) {
        try {
            let response = await fetch(
                `${url}/${db}/${type}?api_key=${key}&page=${count}`
            );
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },
    async search(text, count=1) {
        try {
            let response = await fetch(
                `${url}/search/multi?api_key=${key}&query=${text}&page=${count}`
            );
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },
}