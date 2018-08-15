import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

const Title = (props) => {
    let { type, text, lines = 1 } = props;
    return (<Text numberOfLines={lines} style={styles[type]}>{text}</Text>)
};

Title.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24
    },
    title: {
        fontSize: 18
    },
    stitle: {
        fontSize: 14
    }
});

export default Title;