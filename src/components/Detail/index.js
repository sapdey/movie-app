import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import ajax from '../../ajax';
import Img from '../common/Image';
import Title from '../common/Title';
import Starrating from '../common/Starrating';
import HR from '../common/hr';
import Shimmer from '../common/Shimmer';

class Detail extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('title', 'Details')
    //     };
    // };
    state = {
        movie: {},
        credits: {},
        loading: false,
        director: ' ',
    }
    async componentDidMount() {
        this.setState({ loading: true });
        const id = this.props.navigation.state.params.id;
        const movie = await ajax.fetchMovies(id);
        const credits = await ajax.fetchMovies(id + '/credits')
        this.setState({ movie, credits, loading: false }, () => {
            this.getDirector();
            console.log(this.state.movie);
        });
        console.log('done');

    }

    _renderItem({ item }) {
        return (
            <TouchableOpacity style={styles.cast}>
                <Shimmer autoRun={true} visible={true}>
                    <Img src={item.profile_path} />
                </Shimmer>
            </TouchableOpacity>
        )
    }

    async getDirector() {
        if (this.state.credits.crew) {
            await this.state.credits.crew.forEach((item) => {
                if (item.job === 'Director') {
                    console.log('new', item);
                    this.setState({ director: item.name });
                }
            })
        }
    }

    // async getDirector() {
    //     if (this.state.credits.crew) {
    //         for (const item of this.state.credits.crew) {
    //             if (item.job === 'Director') {
    //                 await console.log('new', item);
    //                 await this.setState({ director: item.name });
    //             }
    //         }
    //     }
    // }

    render() {
        let { belongs_to_collection = {}, backdrop_path = '', poster_path = '', title = '', runtime, vote_average, overview = '', genres = [] } = this.state.movie;
        let { credits: { cast }, director, loading } = this.state;
        console.log(this.state.credits);

        let { imageContainer, posterImage, mainContainer, titleContainer, titleLine, description, genre, genress } = styles
        return (
            <View>
                <ScrollView>
                    <Shimmer visible={!loading} style={[imageContainer, { opacity: 1 }]}>
                        <View style={imageContainer}>
                            <Img src={backdrop_path} />
                        </View>
                    </Shimmer>
                    <View style={mainContainer}>
                        <View style={titleContainer}>
                            <View style={posterImage}>
                                <Shimmer visible={!loading} style={[posterImage, { borderRadius: 0 }]}>
                                    <Img src={poster_path} />
                                </Shimmer>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Shimmer visible={!loading} style={{ height: 18, marginTop: 5 }} autoRun={true} visible={!loading}>
                                    <Title lines={2} style={titleLine} type="title" text={title} />
                                </Shimmer>
                                <Shimmer visible={!loading} style={{ height: 12, marginTop: 2, width: 50 }}>
                                    {runtime && <Text>{runtime + 'min'}</Text>}
                                </Shimmer>
                                <Shimmer visible={!loading} style={{ height: 12, marginTop: 2, width: 130 }}>
                                    {vote_average && <Starrating votes={vote_average} />}
                                </Shimmer>
                                <View style={genress}>
                                    {/* <Text> */}
                                    {
                                        genres.length > 0 && genres.map(item => (
                                            <Text key={item.id} style={genre}>{item.name}</Text>
                                        ))
                                    }
                                    {/* </Text> */}
                                </View>
                            </View>

                        </View>
                        <View style={description}>
                            <Shimmer visible={!loading} style={{ height: 18, marginTop: 5, width: '100%' }} autoRun={true} visible={!loading}></Shimmer>
                            <Shimmer visible={!loading} style={{ height: 18, marginTop: 5, width: '100%' }} autoRun={true} visible={!loading}></Shimmer>
                            <Shimmer visible={!loading} style={{ height: 18, marginTop: 5, width: '100%' }} autoRun={true} visible={!loading}></Shimmer>
                            <Shimmer visible={!loading} style={{ height: 18, marginTop: 5, width: '100%' }} autoRun={true} visible={!loading}></Shimmer>
                            <Text>{overview}</Text>
                        </View>
                        <HR />
                        <View>
                            <Text>Director</Text>
                            <Text>{director}</Text>
                        </View>
                        <HR />
                        <View>
                            <Text>Casts</Text>
                            <FlatList
                                data={cast}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => item.id.toString()}
                                renderItem={this._renderItem}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 200,
        opacity: 0.6,
        resizeMode: 'cover'
    },
    posterImage: {
        width: 105,
        height: 155,
        // top: '-15%',
        // marginTop: -50,
        zIndex: 1,
        marginRight: 10,
        // marginLeft: 10,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,.04)',
        borderWidth: 1,
        borderStyle: 'solid',
        overflow: 'hidden',
    },
    mainContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#ffffff'
    },
    titleContainer: {
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        // marginLeft: 30,
        // paddingRight: 20
    },
    titleLine: {
        // flex: 1,
        // flexWrap: 'wrap'
    },
    genress: {
        flexDirection: 'row',
        // flexWrap: 'wrap'
    },
    genre: {
        backgroundColor: '#e7e7e7',
        padding: 5,
        marginRight: 5
    },
    description: {
        backgroundColor: '#ffffff',
        textAlign: 'center'
        // height: '100%'
    },
    cast: {
        width: 50,
        height: 50,
        backgroundColor: '#eee',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 50,
        overflow: 'hidden'
    }
});

export default Detail;