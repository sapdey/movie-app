import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types'
import Feature from './Feature';

class Home extends Component {
    // static propTypes = {
    //     movies: PropTypes.array.isRequired
    // }
    render() {
        return (
            <View style={styles.list}>
                <ScrollView>
                    <Feature type='now_playing' title="Now Playing" />
                    
                    <Feature type="popular" title="Popular" />
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
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 5
    }
})

export default Home;