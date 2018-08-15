import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
            {poster_path: '', title: '', vote_average: 0, id: 0},
            {poster_path: '', title: '', vote_average: 0, id: 1},
            {poster_path: '', title: '', vote_average: 0, id: 2},
            {poster_path: '', title: '', vote_average: 0, id: 3},
            {poster_path: '', title: '', vote_average: 0, id: 4}
        ]
    }
    async componentDidMount() {
        this.setState({ loading: true})
        const movies = await ajax.fetchMovies(this.props.type);
        this.setState({
            movies: movies.results,
            loading: false
        });
        console.log(movies);

    }

    _renderItem({ item }) {
        return (
            <ListItem style={styles.item} item={item} loading={loading}/>
        );
    }

    goToListView = () => {
        this.props.navigation.navigate('List', {
            type: this.props.type,
            movies: this.state.movies,
        });
    }
    render() {
        let { movies } = this.state;
        let { title, text } = styles;
        return (
            <View>
                <View style={title}>
                    <Title text={this.props.title} type="heading" />
                    <TouchableOpacity onPress={this.goToListView}>
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
                    // renderItem={this._renderItem}
                    renderItem={({ item }) => (
                        <ListItem style={styles.item} item={item}/>
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