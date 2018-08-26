import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import { withNavigation } from 'react-navigation';

import Img from './Image';
import Title from './Title';
import Starrating from './Starrating';
import Shimmer from './Shimmer';
import { movieGenres } from '../../constants';
import Genre from './Genre';

class ListItem extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired
    }

    navigateToDetail = (item) => () => {
        this.props.navigation.navigate({
            routeName: 'Detail',
            params: { item, db: this.props.db },
            key: 'Detail' + item.id
        });
    }

    render() {
        let { column, item } = this.props;
        let { id, title, poster_path, vote_average, genre_ids, original_title, original_name } = item;
        let { container, image, titleView, titleLine, columnContainer, columnImage, description, genress, genre } = styles;

        return (
            <View style={{ backgroundColor: '#fff'}}>
                {!column
                    ? <View style={container}>
                        <TouchableOpacity disabled={poster_path === '' && title === '' && vote_average === 0} onPress={this.navigateToDetail(item)}>
                            <View style={image}>
                                <Shimmer visible={poster_path !== ''} style={[image, { borderRadius: 0 }]}>
                                    <Img src={poster_path} />
                                </Shimmer>
                            </View>
                            {/* <View style={{ marginLeft: 5 }}> */}
                            <View style={titleView}>
                                <Shimmer visible={title !== ''} style={{ height: 22, marginTop: 5 }} ></Shimmer>
                                <Title lines={2} style={titleLine} size="title" text={title ? title : original_name} />
                            </View>
                            <Shimmer visible={vote_average !== -1} style={{ height: 22, margin: 5, width: 130 }} >
                                <View style={{ margin: 5 }}>
                                    <Starrating votes={vote_average} />
                                </View>
                            </Shimmer>
                            {/* </View> */}
                        </TouchableOpacity>
                    </View>
                    : <TouchableWithoutFeedback onPress={this.navigateToDetail(item)}>
                        <View style={{ backgroundColor: 'transparent', pointerEvents: 'box-none' }}>
                            <View style={[image, columnImage]}>
                                <Img src={poster_path} />
                            </View>
                            <View style={columnContainer}>
                                <View style={{ flex: 3 }}>
                                </View>
                                <View style={description}>
                                    <View>
                                        <Title lines={2} style={titleLine} size="stitle" text={title ? title : original_name} />
                                        <Starrating votes={vote_average} />
                                    </View>
                                    <View style={genress}>
                                        {/* <Text> */}
                                        <Genre ids={genre_ids} />
                                        {/* </Text> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        // padding: 5,
        // backgroundColor: '#eee',
        borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#eee',
        // border: '1px solid rgba(0,0,0,.04)',
        // width: 210,
        height: 395,
        // flex: 1,
        // alignItems: 'stretch'
    },
    image: {
        backgroundColor: '#eee',
        // flex: 1,
        width: 210,
        height: 310,
        borderRadius: 10,
        // borderColor: 'rgba(0,0,0,.04)',
        // borderWidth: 1,
        // borderStyle: 'solid',
        overflow: 'hidden',
        // shadowColor: 'rgba(46,61,73,.2)',
        // shadowOffset: {width: 5, height: 5 },
        // shadowRadius: 25,
        // shadowOpacity: 0.8
    },
    titleView: {
        flexDirection: 'row',
        width: 205,
        marginLeft: 5
    },
    titleLine: {
        flex: 1,
        flexWrap: 'wrap'
    },
    // Column View -->
    columnContainer: {
        backgroundColor: '#fff',
        height: 125,
        // width: '100%',
        borderColor: 'rgba(0,0,0,.04)',
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 25,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        overflow: 'visible',
        borderRadius: 10,
        elevation: 1
    },
    columnImage: {
        width: 84,
        height: 124,
        position: 'absolute',
        top: 10,
        left: 25,
        borderRadius: 5,
        marginRight: 10,
        elevation: 2
    },
    genress: {
        flexDirection: 'row',
        // flexWrap: 'wrap'
    },
    genre: {
        backgroundColor: '#e7e7e7',
        padding: 5,
        marginRight: 5,
        marginBottom: 5
    },
    description: {
        flex: 7,
        justifyContent: 'space-around'
    }
});

export default withNavigation(ListItem);