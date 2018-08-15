import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

class Feature extends Component {
    static propTypes = {
        movies: PropTypes.array.isRequired
    }
    render() {
        return (
            <View></View>
        )
    }
}

const styles = StyleSheet.create({

});

export default Feature;