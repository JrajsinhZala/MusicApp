import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';
import icons from '../resources/icons';
import VideoPlay from './VideoPlay';

export default function Video(props) {
  const EmptyListMessage = ({item}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={icons.video}
          style={{width: 100, height: 100}}
        />
        <Text style={styles.emptyListStyle}>No Videos Found</Text>
      </View>
    );
  };
  const renderItem = (item, index) => {
    let video = item.item;
    let album = video.album;
    if (album == null) {
      album = 'No Album ';
    }
    let minutes = Math.floor(video.duration / 60000);
    let seconds = ((video.duration % 60000) / 1000).toFixed(0);
    return (
      <TouchableWithoutFeedback onPress={() => playFile(video)}>
        <View style={styles.songInfo}>
          <View>
            <Text style={styles.songTitle} numberOfLines={1}>
              {video.title}
            </Text>
          </View>
          <View style={styles.songView}>
            <Text style={styles.songAlbum} numberOfLines={1}>
              {album}
            </Text>
            <View>
              <Text style={styles.songDuration}>{minutes + ':' + seconds}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const playFile = (video) => {
    props.navigation.navigate('VideoPlay', {
      video: video,
      fileType: 'video',
    });
  };

  return (
    <FlatList
      data={props.list}
      renderItem={(item, index) => renderItem(item, index)}
      ListEmptyComponent={EmptyListMessage}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: props.list.length > 0 ? 'flex-start' : 'center',
      }}
    />
  );
}

const styles = StyleSheet.create({
  songInfo: {
    justifyContent: 'space-between',
    padding: 10,
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  songView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  songTitle: {color: '#000000', overflow: 'hidden'},
  songAlbum: {color: '#000000', overflow: 'hidden', width: '60%'},
  songDuration: {color: '#000000', fontSize: 16},
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight:'bold'
  },
});
