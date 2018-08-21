import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Youtube from "react-native-youtube";

export default class YoutubeUI extends Component {
    state = {
        isReady: false,
        status: ''
    }
    render() {

        return (
            <View>
                <Youtube
                    videoId={this.props.id}
                    apiKey="AIzaSyBAzJnN-YKBQOWvkRt-gK1sbnFoWmSZsAM"
                    style={{ height: 200 }}
                    maxResults={this.props.maxResults}
                    // onReady={e => this.setState({ isReady: true })}
                    // onChangeState={e => this.setState({ status: e.state })}
                />
            </View>
        )
    }
};