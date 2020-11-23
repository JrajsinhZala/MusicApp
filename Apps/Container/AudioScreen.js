import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Audio from '../Component/Audio';
import MusicFiles, {RNAndroidAudioStore} from 'react-native-get-music-files';

export default function AudioScreen({navigation}) {
  const [audio, setAudio] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Platform.OS == 'android') {
      setLoading(true);
      RNAndroidAudioStore.getAll({
        blured: true, // works only when 'cover' is set to true
        artist: true,
        duration: true, //default : true
        genre: true,
        title: true,
        cover: true,
        minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
        fields: [
          'title',
          'albumTitle',
          'genre',
          'lyrics',
          'artwork',
          'duration',
        ], // for iOs Version
      })
        .then((tracks) => {
          console.log('tracks', tracks);
          setLoading(false);
          setAudio(tracks);
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      MusicFiles.getAll({
        blured: true, 
        artist: true,
        duration: true,
        genre: true,
        title: true,
        cover: true,
        minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
        fields: [
          'title',
          'albumTitle',
          'genre',
          'lyrics',
          'artwork',
          'duration',
        ], // for iOs Version
      })
        .then((tracks) => {
          setAudio(tracks);
        })
        .catch((error) => {
          console.log('error', error);
          // catch the error
        });
    }
  }, []);
  renderList = () => {
    if (loading) {
      return <ActivityIndicator color="black" />;
    } else {
      return <Audio list={audio} navigation={navigation} />;
    }
  };
  return (
    <SafeAreaView style={{flex: 1, marginTop: 10}}>
      {this.renderList()}
    </SafeAreaView>
  );
}
