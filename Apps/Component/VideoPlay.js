
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, SafeAreaView, Platform, View } from 'react-native';
import Video from 'react-native-video';


export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.video = props.route.params.video
        this.fileType = props.route.params.fileType
        console.log('====================================');
        console.log(props.route.params);
        console.log('====================================');
    }

    render() {
        console.log('file',Platform.OS == 'android' ? `file://${this.video.path}` : this.video.path);
        return (
            <View style={styles.container}>
                <Video
                    audioOnly={this.fileType == 'video' ? false : true}
                    source={{ uri: Platform.OS == 'android' ? `file://${this.video.path}` : this.video.path }}
                    onBuffer={(data) => { console.log(data); }}
                    onError={(data) => { console.log(data); }}
                    style={styles.backgroundVideo}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        backgroundColor: 'green',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});


