import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Shimmer from './Shimmer';
import util from '../../util';

class FavoriteButton extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    }

    state = {
        watchlist: '',
        watchListButton: true
    }

    componentDidMount() {
        console.log(this.props.db);

        util.isPresent(this.props.db, this.props.item)
            .then(present => {
                (present)
                    ? this.setState({ watchlist: 'Remove from', watchListButton: false })
                    : this.setState({ watchlist: 'Add to', watchListButton: false });
            })

    }

    addRemoveFavorite = () => {
        if (this.state.watchlist === 'Add to') {
            util.add(this.props.db, this.props.item).then(_ => {
                this.setState({ watchlist: 'Remove from' });
            });
        } else {
            util.remove(this.props.db, this.props.item).then(_ => {
                this.setState({ watchlist: 'Add to' });
            })
        }
    }

    render() {
        let { watchlist, watchListButton } = this.state;
        let { wishlistButton } = styles;
        console.log(this.state);

        return (
            <View>
                <Shimmer visible={!watchListButton} style={{ width: 160, height: 25, marginTop: 5 }}>
                    <TouchableOpacity onPress={this.addRemoveFavorite}>
                        <View style={wishlistButton}>
                            <Text style={{ color: '#ffffff' }}>{watchlist} favorites</Text>
                        </View>
                    </TouchableOpacity>
                </Shimmer>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
});

export default FavoriteButton;