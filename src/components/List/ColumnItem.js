import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

class ColumnItem extends Component {
    static propTypes = {
        movies: PropTypes.array.isRequired
    }
    render() {
        return (
            <View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

});

export default ColumnItem;