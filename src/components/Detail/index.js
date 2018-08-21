import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';


import ajax from '../../ajax';
import Img from '../common/Image';
import Title from '../common/Title';
import Starrating from '../common/Starrating';
import HR from '../common/hr';
import Shimmer from '../common/Shimmer';
import YouTubeUI from "../common/Youtube";
import Genre from '../common/Genre';

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: this.props.navigation.state.params.item,
            db: this.props.navigation.state.params.db,
            credits: {},
            castLoading: true,
            directorLoading: true,
            videosLoading: true,
            director: ' ',
            videos: []
        }
    }

    async componentDidMount() {
        // this.setState({ castLoading: true, directorLoading: true });
        const credits = await ajax.fetchMovies(this.state.db, this.state.movie.id + '/credits');
        this.setState({ credits, castLoading: false }, () => {
            this.getDirector();
        });
        const videos = await ajax.fetchMovies(this.state.db, this.state.movie.id + '/videos');
        this.setState({ videos: videos.results, videosLoading: false });
    }

    // _renderItem({ item }) {
    //     return (
    //         <TouchableOpacity style={styles.cast} onPress={this.navigateToPerson(item)} >
    //             <Shimmer visible={true}>
    //                 <Img src={item.profile_path} />
    //             </Shimmer>
    //         </TouchableOpacity>
    //     )
    // }

    async getDirector() {
        if (this.state.credits.crew) {
            await this.state.credits.crew.forEach((item) => {
                if (item.job === 'Director') {
                    this.setState({ director: item.name, directorLoading: false });
                }
            })
        }
    }

    navigateToPerson = (item) => () => {
        this.props.navigation.navigate('Person', { item });
    }

    render() {
        let { belongs_to_collection = {}, backdrop_path, poster_path, title, runtime, vote_average, overview, genre_ids, release_date, original_name } = this.state.movie;
        let { credits: { cast }, director, movieLoading, directorLoading, videos, videosLoading } = this.state;

        let { imageContainer, posterImage, mainContainer, titleContainer, titleLine, description, genre, genress, videoContainer } = styles
        return (
            <View>
                <ScrollView>
                    <View style={imageContainer}>
                        <Img src={backdrop_path} />
                    </View>
                    <View style={mainContainer}>
                        <View style={titleContainer}>
                            <View style={posterImage}>
                                <Img src={poster_path} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Title lines={2} style={titleLine} type="title" text={title ? title : original_name} />
                                {runtime && <Text>{runtime + 'min'}</Text>}
                                <Starrating votes={vote_average} />
                                <View style={genress}>
                                    {/* <Text> */}
                                    <Genre ids={genre_ids} />
                                    {/* </Text> */}
                                </View>
                            </View>

                        </View>
                        <View style={description}>
                            <Text style={{ fontSize: 16, textAlign: 'justify' }}>{overview}</Text>
                        </View>
                        <HR />
                        <View>
                            <Text style={{ fontSize: 18 }}>Release Date</Text>
                            <Text style={{ fontSize: 16 }}>{release_date}</Text>
                            <Text style={{ fontSize: 18, marginTop: 5 }}>Director</Text>
                            <Shimmer visible={!directorLoading} style={{ height: 12, marginTop: 2, width: 130 }}>
                                <Text style={{ fontSize: 16 }}>{director}</Text>
                            </Shimmer>
                        </View>
                        <HR />
                        <View>
                            <Text style={{ fontSize: 18, marginBottom: 5 }}>Casts</Text>
                            <FlatList
                                data={cast}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.cast} onPress={this.navigateToPerson(item)} >
                                        <Shimmer visible={true}>
                                            <Img src={item.profile_path} />
                                        </Shimmer>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <HR />

                        <View>
                            <Text style={{ fontSize: 18, marginBottom: 5 }}>Trailer</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {videos.map(item => (
                                    <View key={item.id} style={videoContainer}>
                                        <Shimmer visible={!videosLoading}>
                                            <YouTubeUI
                                                id={item.key}
                                                maxResults={videos.length}
                                            />
                                        </Shimmer>
                                    </View>
                                ))}

                            </ScrollView>
                        </View>
                        <HR />
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
        // flexWrap: 'wrap'
        // flex: 1,
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
    },
    videoContainer: {
        width: 300,
        height: 200,
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden'
    }
});

export default withNavigation(Detail);