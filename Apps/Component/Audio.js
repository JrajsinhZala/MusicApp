import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';

export default function Audio(props) {
  const playFile = (video) => {
    props.navigation.navigate('VideoPlay', {
      video: video,
      fileType: 'audio',
    });
  };
  const EmptyListMessage = ({item}) => {
    return <Text style={styles.emptyListStyle}>No Audio Found</Text>;
  };

  const renderItem = (item, index) => {
    let song = item.item;
    let album = song.album;
    if (album == null) {
      album = 'No Album ';
    }
    let minutes;
    let seconds;
    if (Platform.OS == 'android') {
      minutes = Math.floor(song.duration / 60000);
      seconds = ((song.duration % 60000) / 1000).toFixed(0);
    } else {
      minutes = Math.floor(song.duration / 60);
      seconds = minutes < 10 ? '0' + minutes : minute;
    }

    return (
      <TouchableWithoutFeedback onPress={() => playFile(song)}>
        <View style={styles.songInfo}>
          <View>
            <Text style={styles.songTitle} numberOfLines={1}>
              {song.title}
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
    marginTop: 1,
    borderBottomColor: '#737373',
    paddingTop: 3,
    borderBottomWidth: 0.6,
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
  songView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  songTitle: {color: '#b3b3b3', overflow: 'hidden'},
  songAlbum: {color: '#737373', overflow: 'hidden', width: '60%'},
  songDuration: {color: '#b3b3b3', fontSize: 16},
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
