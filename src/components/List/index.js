import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types'

import ListItem from '../common/ListItem';
import ajax from '../../ajax';


class ListView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            movies: props.navigation.getParam('movies', [])
        }
    }
    count = 2

    _renderItem({ item }) {
        return (
            <ListItem item={item} column db='movie' />
        );
    }

    handleLoadMore = async () => {
        if (!this.props.navigation.getParam('loadMore', false)) {
            let type = this.props.navigation.getParam('type', 'search');
            let newMovies = await ajax.fetchMovies('movie', type, this.count);

            this.setState({
                movies: this.state.movies.concat(...newMovies.results),
            }, () => {
                this.count++;
            })
        }
    }

    render() {
        let { movies } = this.state;
        return (
            <View>
                <FlatList
                    data={movies}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                    onEndReached={this.handleLoadMore}
                    onEndThreshold={0.3}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        height: 50
    }
});

export default ListView;