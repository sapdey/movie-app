import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

const Title = (props) => {
    let { size, text, lines = 1 } = props;
    return (<Text numberOfLines={lines} style={styles[size]}>{text}</Text>)
};

Title.propTypes = {
    // text: PropTypes.string.isRequired,
    // type: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 26
    },
    title: {
        fontSize: 22
    },
    stitle: {
        fontSize: 18
    },
    small: {
        fontSize: 16
    }
});

export default Title;