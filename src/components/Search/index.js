import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ajax from '../../ajax';
import ListItem from '../common/ListItem';
import Feature from '../Home/Feature';

class SearchTab extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: <TextInput
                style={{ width: 100 }}
                placeholder="Search"
                autoFocus
                onChangeText={(text) => params.handleThis(text)}
            />,
            headerRight: (
                <TouchableOpacity
                    style={{ width: 40, height: 40, borderRadius: 50, flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
                >
                    <Ionicons style={{ fontSize: 22 }} name='ios-search' />
                </TouchableOpacity>),
            headerStyle: {
                elevation: 0
            }
        }
    };

    state = {
        text: '',
        results: []
    }
    count = 2

    componentDidMount() {
        this.props.navigation.setParams({
            handleThis: this.handleChange,

        });
    }

    handleChange = (text) => {
        this.setState({ text }, () => {
            this.startTimer();
        });
    }

    startTimer() {
        if (this.timeoutId !== '') {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            this.searchText();
        }, 200);
    }

    async searchText() {
        if (this.state.text.trim().length > 0) {
            const results = await ajax.search(this.state.text.trim());
            console.log(results);

            this.setState({ results: results.results });
        }

    }

    _renderItem({ item }) {
        if (item.media_type === "movie") {
            return <ListItem item={item} db='movie' column />
        }
        else if (item.media_type === "tv") {
            return <ListItem item={item} db='tv' column />
        }
        // } else if (r.media_type === 'person') {
        //     return <View>
        //         <Text>{r.name}</Text>
        //     </View>
        // }
    }

    handleLoadMore = async () => {
        let newResults = await ajax.search(this.state.text.trim(), this.count);

        this.setState({
            movies: this.state.results.concat(...newResults.results),
        }, () => {
            this.count++;
        })
    }

    render() {
        let { results } = this.state;
        let { container } = styles;
        return (
            <View style={container}>
                <View>
                    {
                        results.length > 0
                            ? <FlatList
                                data={results}
                                keyExtractor={(item, index) => item.id.toString()}
                                renderItem={this._renderItem}
                                onEndReached={this.handleLoadMore}
                                onEndThreshold={30}
                            />
                            : <Feature db='trending' type='movie/day' title="Trending" size="stitle" />
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    }
});

export default SearchTab;