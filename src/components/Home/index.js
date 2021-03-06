import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import Feature from './Feature';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Hr from '../common/hr';

class Home extends Component {
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
        }
    });
    render() {
        return (
            <View style={styles.list}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Feature db='movie' type='now_playing' title="Now Playing" size="heading" />
                    <Hr />
                    <Feature db='movie' type="popular" title="Popular" size="heading" />
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

export default Home;