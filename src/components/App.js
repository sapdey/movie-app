import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';

import Home from './Home/';
import Detail from './Detail';
import ListView from './List';

class App extends Component {

    render() {
        return (
            // <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <RootStack />
                </View>
            // </SafeAreaView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fafafa'
    }
});

const RootStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: () => ({
                headerMode: 'none',
                header: null,
            })
        },
        Detail: {
            screen: Detail,
            header: null
        },
        List: {
            screen: ListView
        }
    },
    {
        initialRouteName: 'Home',
    }
);

export default App;