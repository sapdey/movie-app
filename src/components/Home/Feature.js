import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { withNavigation } from 'react-navigation';

import Title from '../common/Title';
import ajax from '../../ajax';
import Img from '../common/Image';
import ListItem from '../common/ListItem';

class Feature extends Component {
    static propTypes = {
        // movies: PropTypes.array.isRequired
    }
    state = {
        movies: [
            { poster_path: '', title: '', vote_average: -1, id: 0 },
            { poster_path: '', title: '', vote_average: -1, id: 1 },
            { poster_path: '', title: '', vote_average: -1, id: 2 },
            { poster_path: '', title: '', vote_average: -1, id: 3 },
            { poster_path: '', title: '', vote_average: -1, id: 4 }
        ],
        db: this.props.db === 'trending' ? 'movie' : this.props.db // handled on for trending search
    }
    async componentDidMount() {
        if (this.props.type) {
            this.setState({ loading: true })
            ajax.fetchMovies(this.props.db, this.props.type)
                .then(movies => this.setState({ movies: movies.results, loading: false }));
        } else {
            AsyncStorage.getItem(this.props.db)
                .then(movies => {
                    movies = JSON.parse(movies);
                    if (movies) {
                        this.setState({ movies });
                    }
                })
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.render) {
            AsyncStorage.getItem(this.props.db)
                .then(movies => {
                    movies = JSON.parse(movies);
                    if (movies) {
                        this.setState({ movies });
                    }
                })
        }
    }

    // _renderItem({ item }) {
    //     return (
    //         <ListItem style={styles.item} item={item} loading={loading} movie/>
    //     );
    // }

    goToListView = () => {
        this.props.navigation.navigate('List', {
            type: this.props.type,
            movies: this.state.movies,
            loadMore: this.props.render
        });
    }
    render() {
        let { movies } = this.state;
        let { title, text } = styles;
        return (
            <View>
                <View style={title}>
                    <Title text={this.props.title} size={this.props.size} />
                    <TouchableOpacity disabled={movies.length > 0 && movies[0].poster_path === '' && movies[0].title === '' && movies[0].vote_average === 0} onPress={this.goToListView}>
                        <Text style={text}>See all</Text>
                    </TouchableOpacity>
                </View>
                {/* <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={movies}
                    renderItem={this._renderItem}
                    sliderWidth={1000}
                    itemWidth={1000}
                /> */}

                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {movies.length > 0 && movies.map(item => this._renderItem(item))}
                </ScrollView> */}
                <FlatList
                    data={movies}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id.toString()}
                    removeClippedSubviews={false}
                    // renderItem={this._renderItem}
                    renderItem={({ item }) => (
                        <ListItem style={styles.item} item={item} db={this.state.db} />
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    slide: {
        // backgroundColor: '#ffffff'
    },
    item: {
        maxWidth: 210,
    },
    title: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    text: {
        color: '#02b3e4',
        marginRight: 10
    }

});

export default withNavigation(Feature);