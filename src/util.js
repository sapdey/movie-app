import { AsyncStorage } from 'react-native';

export default {
    async add(key, item) {
        let items = await AsyncStorage.getItem(key.toString());
        if(!items) {
            items = [];
        } else {
            items = JSON.parse(items);
        }
        items.push(item);
        await AsyncStorage.setItem(key.toString(), JSON.stringify(items));
    },
    async isPresent(key, item) {
        let items = await AsyncStorage.getItem(key.toString());
        if(!items) {
            return false;
        }
        return await JSON.parse(items).find(i => i.id === item.id);
    },
    async remove(key, item) {
        let items = await AsyncStorage.getItem(key.toString());
        let newItems = await JSON.parse(items).filter(i => i.id !== item.id);
        await AsyncStorage.setItem(key.toString(), JSON.stringify(newItems));
    }
}