import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Youtube from "react-native-youtube";
import ajax from '../../ajax';
import { youtubeKey } from '../../constants';

export default class YoutubeUI extends Component {
    static navigationOptions = { title: 'Youtube', header: null }
    state = {
        video: this.props.navigation.state.params.video,
        isReady: false
    }

    // async componentDidMount() {
    //     const youtube = await ajax.youtube(this.state.video.key);
    //     // this.setState({ youtube });
    // }

    render() {
        console.log(this.state.video);
        let { video, isReady } = this.state;
        return (
            <View style={styles.video}>
                <Youtube
                    videoId={video.key}
                    apiKey={youtubeKey}
                    style={{ width: '100%', flex: 1 }}
                    // play={isReady}
                    fullscreen
                    onReady={e => this.setState({ isReady: true })}
                // onChangeState={e => this.setState({ status: e.state })}
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    video: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})