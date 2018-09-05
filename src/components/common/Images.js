import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Lightbox from 'react-native-lightbox';

import Img from './Image';

class Images extends Component {
    static propTypes = {
        images: PropTypes.array.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }

    render() {
        let { images, width, height } = this.props;
        return (
            <View>
                <Text style={{ fontSize: 18 }}>Photos</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ height: 200, width: '100%' }}
                    renderItem={({ item }) => (
                        <View style={{ width, height, borderRadius: 5, overflow: 'hidden', marginRight: 20 }}>
                            <Lightbox underlayColor="white" >
                                <Img resizeMode="contain" src={item.file_path} style={{ width: '100%', height: '100%' }} />
                            </Lightbox>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

export default Images;