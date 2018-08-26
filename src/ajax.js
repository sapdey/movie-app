import { key, url, youtubeKey } from './constants';

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
    async youtube(id) {
        try {
            let response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${youtubeKey}`
            );
            let responseJson = await response.json();
            console.log(responseJson);
            
        } catch (error) {
            console.error(error);
        }
    }
}