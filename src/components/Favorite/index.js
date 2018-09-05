import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationEvents } from "react-navigation";

import Feature from '../Home/Feature';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Hr from '../common/hr';

class Favorites extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'MovieDB',
        headerRight: (
            <TouchableOpacity
                onPress={() => navigation.navigate('Searchtab')}
                style={{ width: 40, height: 40, borderRadius: 50, flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
            >
                <Ionicons style={{ fontSize: 22 }} name='ios-search' />
            </TouchableOpacity>
        ),
        headerStyle: {
            elevation: 0
        },
    })

    state = {
        render: false,
        tv: []
    }
    reRender = () => {
        this.setState({ render: true });
    }

    render() {
        console.log(this.state);
        
        return (
            <View style={styles.list}>
                <NavigationEvents
                    onWillFocus={payload => {
                        this.reRender();
                    }}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Feature db='movie' type={false} title="Watchlist Movies" size="heading" render={this.state.render} />
                    <Hr />
                    <Feature db='tv' type={false} title="Watchlist TV" size="heading" render={this.state.render} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
        flex: 1,
        width: '100%',
        paddingTop: 25,
        paddingLeft: 10,
        paddingRight: 5
    }
})

export default Favorites;