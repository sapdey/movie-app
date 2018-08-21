import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import ajax from '../../ajax';
import Img from '../common/Image';

class Person extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            person: this.props.navigation.state.params.item,
            details: {},
            credits: {}
        }
    }

    async componentDidMount() {
        const details = await ajax.fetchMovies('person', this.state.person.id);
        this.setState({ details });
        const credits = await ajax.fetchMovies('person', this.state.person.id + '/combined_credits');
        this.setState({ credits });
    }

    render() {
        console.log(this.state);
        let { profile_path } = this.state.person;
        return (
            <View>
                <Img src={profile_path} />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

export default Person;