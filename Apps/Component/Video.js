
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableWithoutFeedback, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import VideoPlay from './VideoPlay'

export default function Audio(props) {


    const renderItem = (item, index) => {
        let video = item.item
        let album = video.album;
        if (album == null) {
            album = "No Album ";
        }
        let minutes = Math.floor(video.duration / 60000);;
        let seconds = ((video.duration % 60000) / 1000).toFixed(0);
        return (
            <TouchableWithoutFeedback onPress={() => playFile(video)}>
                <View style={styles.songInfo}>
                    <View>
                        <Text style={styles.songTitle} numberOfLines={1}>{video.title}</Text>
                    </View>
                    <View style={styles.songView}>
                        <Text style={styles.songAlbum} numberOfLines={1}>{album}</Text>
                        <View >
                            <Text style={styles.songDuration}>{minutes + ":" + seconds}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const playFile = (video) => {
       
        props.navigation.navigate('VideoPlay', {
            video: video,
            fileType: 'video'
        })
    }


    return (
        <FlatList data={props.list}
            renderItem={(item, index) => renderItem(item, index)} />
    );



}

const styles = StyleSheet.create({
    songInfo: {
        marginTop: 1,
        borderBottomColor: "#737373",
        paddingTop: 3,
        borderBottomWidth: 0.6,
        justifyContent: "space-between",
        padding: 10,
        margin: 10
    },
    songView: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    songTitle: { color: "#b3b3b3", overflow: "hidden" },
    songAlbum: { color: "#737373", overflow: "hidden", width: "60%" },
    songDuration: { color: "#b3b3b3", fontSize: 16, },
});


