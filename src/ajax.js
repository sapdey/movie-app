import { key, url } from './constants';

export default {
    async fetchMovies(type, count=1) {
        try {
            let response = await fetch(
                `${url}/movie/${type}?api_key=${key}&page=${count}`
            );
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },
}