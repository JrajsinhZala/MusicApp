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

  return (
    <SafeAreaView style={{flex: 1, marginTop: 10}}>
      {loading ? (
        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                padding: 10,
                fontSize: 18,
                flex: 1,
              }}>
              Scanning Audio Files....
            </Text>
            <ActivityIndicator color="black" style={{padding: 10}} />
          </View>
        </View>
      ) : (
        <Audio list={audio} navigation={navigation} />
      )}
    </SafeAreaView>
  );
}
