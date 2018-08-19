import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { movieGenres } from '../../constants';

const styles = StyleSheet.create({
    genres: {
        flexDirection: 'row',
    },
    genre: {
        backgroundColor: '#e7e7e7',
        padding: 5,
        marginRight: 5
    },
  });

export default Genre = ({ ids }) => (
    <View style={styles.genres}>
        {
            ids.length > 0 && ids.map(item => {
                console.log(item, movieGenres[item]);
                
                if (movieGenres[item] === 'undefined') {
                    return;
                }
                return (
                    <Text key={item} style={styles.genre}>{movieGenres[item]}</Text>
                )
            })
        }
    </View>
)
