import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

const Img = (props) => {
    const src = 'https://image.tmdb.org/t/p/w500' + props.src;
    return (
        <Image style={styles.image} source={{ uri: src }} />
    )
};

Img.propTypes = {
    src: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    }
});

export default Img;