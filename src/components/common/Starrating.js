import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';


class Starrating extends PureComponent {
    static propTypes = {
        votes: PropTypes.number.isRequired
    }
    render() {
        let { votes } = this.props;
        let { starrating, star } = styles;
        return (
            <View>
                {
                    votes === 0
                        ? <Text>No rating</Text>
                        : <View style={starrating}>
                            <Text>{votes + '/10'}</Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={votes / 2}
                                number={5}
                                selectedStar={() => { }}
                                starStyle={star}
                                fullStarColor="#FFD700"
                                emptyStarColor="#eee"
                            />
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    starrating: {
        width: '100%',
        // flex: 1,
        flexDirection: 'row',
        // height: 50
    },
    star: {
        fontSize: 14,
        flex: 1,
        marginLeft: 5,
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Starrating;