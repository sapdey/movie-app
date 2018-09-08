import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'
import ajax from '../../ajax';
import Img from '../common/Image';
import Title from '../common/Title';
import Shimmer from "../common/Shimmer";
import ListItem from "../common/ListItem";
import Images from '../common/Images';
import FavoriteButton from '../common/FavoriteButton';

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: this.props.navigation.state.params.item,
            details: {},
            credits: {},
            images: [],
            loading: true,
        }
        this.db = "celeb"
    }

    async componentDidMount() {
        const details = ajax.fetchMovies('person', this.state.person.id)
        const credits = ajax.fetchMovies('person', this.state.person.id + '/combined_credits')
        const images = ajax.fetchMovies('person', this.state.person.id + '/images')
        Promise.all([details, credits, images]).then(results => {
            this.setState({ 
                details: results[0],
                credits: results[1],
                images: results[2].profiles,
                loading: false
            })
        })
    }

    navigateToPerson = (item) => () => {
        this.props.navigation.navigate('Person', { item });
    }

    render() {
        let { credits: { cast }, images, loading, person } = this.state;
        let { profile_path, name, } = this.state.person;
        let { biography, gender, birthday, place_of_birth } = this.state.details
        let { imageContainer, posterImage, mainContainer, titleContainer, titleLine, description, genre, genress, videoContainer, youtubeLogo } = styles;
        return (
            <View style={{ marginTop: -60 }}>
                <ScrollView>
                    <View style={imageContainer}>

                    </View>
                    <View style={posterImage}>
                        <Img src={profile_path} />
                    </View>
                    <View style={mainContainer}>
                        <View style={titleContainer}>
                            <View style={{ flex: 1, height: 50 }}>
                                <Title lines={2} style={titleLine} type="title" size="title" text={name} />
                                <Shimmer visible={!loading} style={{ height: 12, width: 50 }}>
                                    <Text>{gender === 1 ? 'Female' : 'Male'}</Text>
                                </Shimmer>
                                <FavoriteButton db={this.db} item={person} />
                            </View>
                        </View>
                        <View style={description}>
                            <Shimmer visible={!loading} style={{ height: 14, marginBottom: 5, width: '100%' }} />
                            <Shimmer visible={!loading} style={{ height: 14, marginBottom: 5, width: '100%' }} />
                            <Shimmer visible={!loading} style={{ height: 14, marginBottom: 5, width: '100%' }} />
                            <Shimmer visible={!loading} style={{ height: 14, marginBottom: 5, width: '100%' }} />
                            <Shimmer visible={!loading} style={{ height: 14, marginBottom: 5, width: '100%' }} />
                            <Text style={{ fontSize: 16, textAlign: 'justify' }}>{biography}</Text>
                        </View>
                        <HR />
                        <View>
                            <View>
                                <Text style={{ fontSize: 18 }}>Birth Date</Text>
                                <Shimmer visible={!loading} style={{ height: 12, marginTop: 2, width: 100 }}>
                                    <Text style={{ fontSize: 16 }}>{birthday}</Text>
                                </Shimmer>
                            </View>

                            <View>
                                <Text style={{ fontSize: 18, marginTop: 5 }}>Place of Birth</Text>
                                <Shimmer visible={!loading} style={{ height: 12, marginTop: 2, width: 130 }}>
                                    <Text style={{ fontSize: 16 }}>{place_of_birth}</Text>
                                </Shimmer>
                            </View>
                        </View>
                        <HR />
                        {/* <View>
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
                        <HR /> */}
                        <Images images={images} width={150} height={240} />
                        <HR />
                        <Text style={{ fontSize: 18 }}>Filmography</Text>
                        <View>
                            <FlatList
                                data={cast}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => item.id.toString()}
                                // renderItem={this._renderItem}
                                renderItem={({ item }) => (
                                    <ListItem style={styles.item} item={item} db={item.media_type} />
                                )}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View >
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
        top: 150,
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
    description: {
        marginTop: 60,
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

export default Person;