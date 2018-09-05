import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions, Image, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ajax from '../../ajax';
import Img from '../common/Image';
import Title from '../common/Title';
import Starrating from '../common/Starrating';
import HR from '../common/hr';
import Shimmer from '../common/Shimmer';
import Genre from '../common/Genre';
import Feature from '../Home/Feature';
import Images from '../common/Images';
import util from '../../util';

let fullWidth = Dimensions.get('window').width;
class Detail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            backgroundColor: 'transparent',
        },
        headerRight: (
            <TouchableOpacity
                onPress={() => navigation.navigate('Searchtab')}
                style={{ width: 40, height: 40, borderRadius: 50, flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
            >
                <Ionicons style={{ fontSize: 22 }} name='ios-search' />
            </TouchableOpacity>
        ),
    })

    state = {
        movie: this.props.navigation.state.params.item,
        db: this.props.navigation.state.params.db,
        credits: {
            cast: [],
            crew: []
        },
        castLoading: true,
        directorLoading: true,
        videosLoading: true,
        director: ' ',
        videos: [
            { id: 0 },
            { id: 1 },
            { id: 2 },
        ],
        images: {
            backdrops: []
        },
        watchlist: '',
        watchListButton: true
    }
    items = [];

    async componentDidMount() {
        // this.setState({ castLoading: true, directorLoading: true });
        let present = await util.isPresent(this.state.db, this.state.movie);
        (present)
            ? this.setState({ watchlist: 'Remove from', watchListButton: false })
            : this.setState({ watchlist: 'Add to', watchListButton: false });
        
        const credits = await ajax.fetchMovies(this.state.db, this.state.movie.id + '/credits');
        this.setState({ credits, castLoading: false }, () => {
            this.getDirector();
        });
        const videos = await ajax.fetchMovies(this.state.db, this.state.movie.id + '/videos');
        const images = await ajax.fetchMovies(this.state.db, this.state.movie.id + '/images');
        this.setState({ videos: videos.results, videosLoading: false, images });

    }

    async getDirector() {
        if (this.state.credits.crew && this.state.credits.crew.length > 0) {
            await this.state.credits.crew.forEach((item) => {
                if (item.job === 'Director') {
                    this.setState({ director: item.name, directorLoading: false });
                }
            })
        }
    }

    navigateToPerson = (item) => () => {
        this.props.navigation.navigate({
            routeName: 'Person',
            params: { item },
            key: 'Person' + item.id
        });
    }

    navigateToYoutube = (video) => () => {
        this.props.navigation.navigate('Youtube', { video });
    }

    addRemoveFavorite = async () => {
        if (this.state.watchlist === 'Add to') {
            await util.add(this.state.db, this.state.movie);
            this.setState({ watchlist: 'Remove from' })
        } else {
            await util.remove(this.state.db, this.state.movie);
            this.setState({ watchlist: 'Add to' })
        }

    }

    render() {
        let { belongs_to_collection = {}, backdrop_path, id, poster_path, title, runtime, vote_average, overview, genre_ids, release_date, original_name, first_air_date } = this.state.movie;
        let { credits: { cast }, director, movieLoading, directorLoading, videos, videosLoading, db, images, watchlist } = this.state;
        let { imageContainer, posterImage, mainContainer, titleContainer, titleLine, description, genre, genress, videoContainer, youtubeLogo, wishlistButton } = styles;
        (poster_path === undefined) ? backdrop_path : poster_path;
        return (
            <View style={{ marginTop: -60 }}>
                <ScrollView>
                    <View style={imageContainer}>
                        <Img src={backdrop_path} />
                    </View>
                    <View style={posterImage}>
                        <Img src={poster_path} />
                    </View>
                    <View style={mainContainer}>
                        <View style={titleContainer}>
                            <View style={{ flex: 1 }}>
                                <Title lines={2} style={titleLine} type="title" size="title" text={title ? title : original_name} />
                                {runtime && <Text>{runtime + 'min'}</Text>}
                                <Starrating votes={vote_average} />
                                <View style={genress}>
                                    {/* <Text> */}
                                    <Genre ids={genre_ids} />
                                    {/* </Text> */}
                                </View>
                                <Shimmer visible={watchlist} style={{ width: 160, height: 25, marginTop: 5, borderRadius: 1 }}>
                                    <TouchableOpacity onPress={this.addRemoveFavorite}>
                                        <View style={wishlistButton}>
                                            <Text style={{ color: '#ffffff' }}>{watchlist} favorites</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Shimmer>
                            </View>
                        </View>
                        <View style={description}>
                            <Text style={{ fontSize: 18, marginTop: 5, marginBottom: 5 }}>Description</Text>
                            <Text style={{ fontSize: 16, textAlign: 'justify' }}>{overview}</Text>
                        </View>
                        <HR />
                        <View>
                            {
                                db === 'movie'
                                    ? <View>
                                        <Text style={{ fontSize: 18 }}>Release Date</Text>
                                        <Text style={{ fontSize: 16 }}>{release_date}</Text>
                                    </View>
                                    : <View>
                                        <Text style={{ fontSize: 18 }}>First airing</Text>
                                        <Text style={{ fontSize: 16 }}>{first_air_date}</Text>
                                    </View>
                            }
                            {
                                db === 'movie' && <View>
                                    <Text style={{ fontSize: 18, marginTop: 5 }}>Director</Text>
                                    <Shimmer visible={!directorLoading} style={{ height: 12, marginTop: 2, width: 130 }}>
                                        <Text style={{ fontSize: 16 }}>{director}</Text>
                                    </Shimmer>
                                </View>
                            }
                        </View>
                        <HR />
                        <View>
                            <Text style={{ fontSize: 18, marginBottom: 5 }}>Trailer</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {videos.map(item => (
                                    <TouchableOpacity key={item.id} style={videoContainer} onPress={this.navigateToYoutube(item)}>
                                        <Shimmer visible={!videosLoading} style={[videoContainer, { borderRadius: 0 }]}>
                                            <Image
                                                style={{ backgroundColor: '#eee' }}
                                                source={{ uri: `https://img.youtube.com/vi/${item.key}/hqdefault.jpg` }}
                                                style={{ width: '100%', height: '100%', opacity: 0.8 }}
                                            />
                                            {!videosLoading && <View style={youtubeLogo}>
                                                <Ionicons name="logo-youtube" size={50} color='#ff0000' style={{ marginTop: -7 }} />
                                            </View>}
                                        </Shimmer>
                                    </TouchableOpacity>
                                ))}

                            </ScrollView>
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
                        {images.backdrops.length > 0 && <Images images={images.backdrops} width={300} height={200} />}
                        <HR />
                        <Feature db={db} type={`${id}/similar`} title={`Similar ${db === 'tv' ? 'Shows' : 'Movies'}`} size="stitle" />
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
        resizeMode: 'cover',
    },
    posterImage: {
        width: 105,
        height: 155,
        top: 170,
        left: 25,
        marginRight: 10,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,.04)',
        borderWidth: 1,
        borderStyle: 'solid',
        overflow: 'hidden',
        position: 'absolute',
        elevation: 1
    },
    mainContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#ffffff'
    },
    titleContainer: {
        flexDirection: 'row',
        marginLeft: 125,
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
    wishlistButton: {
        width: 170,
        height: 25,
        marginTop: 5,
        backgroundColor: '#00a8e1',
        borderRadius: 5,
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        marginTop: 20,
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
        height: 171,
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    singleVideo: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    youtubeLogo: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        translateX: -25,
        translateY: -20,
        backgroundColor: '#fff',
        borderRadius: 9.5,
        overflow: 'hidden',
        height: 37
    }
});

export default withNavigation(Detail);