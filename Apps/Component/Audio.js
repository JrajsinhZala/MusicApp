import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import icons from '../resources/icons';

export default function Audio(props) {
  const playFile = (video) => {
    props.navigation.navigate('VideoPlay', {
      video: video,
      fileType: 'audio',
    });
  };
  const EmptyListMessage = ({item}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={icons.audio} style={{width: 100, height: 100}} />
        <Text style={styles.emptyListStyle}>No Audios Found</Text>
      </View>
    );
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            marginStart: 10,
            marginEnd: 10,
            marginBottom: 10,
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
          }}>
          <Image source={{uri: song.cover}} style={{width: 30, height: 30,borderRadius:4}} />
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
                <Text style={styles.songDuration}>
                  {minutes + ':' + seconds}
                </Text>
              </View>
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
    justifyContent: 'space-between',
    marginStart: 5,
    flex: 1,
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
    fontWeight: 'bold',
  },
});
