
import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Dimensions, Platform, View } from 'react-native';
import Video from 'react-native-video';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.video = props.route.params.video
        this.fileType = props.route.params.fileType
    }

    render() {
        console.log('file', Platform.OS == 'android' ? `file://${this.video.path}` : this.video.path);
        return (
            <View style={styles.container}>
                <Video
                    audioOnly={this.fileType == 'video' ? false : true}
                    source={{ uri: Platform.OS == 'android' ? `file://${this.video.path}` : this.video.path }}
                    onBuffer={(data) => { console.log(data); }}
                    onError={(data) => { console.log(data); }}
                    style={Platform.OS === "android" ? styles.videoContainerAndroid : styles.videoContainerIOS}
                    resizeMode="contain"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    videoContainerAndroid: {
        height: "100%",
        width: "100%"
    },
    videoContainerIOS: {
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').width,
        minWidth: Dimensions.get('window').height,
        minHeight: Dimensions.get('window').width,
        width: Dimensions.get('screen').height,
        height: Dimensions.get('screen').width,

        transform: [{ rotate: '90deg' }],
    }
});


