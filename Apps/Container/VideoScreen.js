import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Video from '../Component/Video';
import {RNAndroidAudioStore} from 'react-native-get-music-files';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MediaHelper from 'react-native-media-helper';
import AsyncStorage from '@react-native-community/async-storage';

export default function VideoScreen({navigation}) {
  const [video, setVideo] = useState([]);
  const [select, setSelect] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Platform.OS == 'android') {
      setLoading(true);
      RNAndroidAudioStore.getVideo({
        blured: true,
        artist: true,
        duration: true,
        cover: false,
        genre: true,
        title: true,
        cover: true,
        minimumSongDuration: 10000,
      })
        .then((tracks) => {
          setLoading(false);
          if (tracks !== 'Something get wrong with musicCursor') {
            setVideo(tracks);
          } else {
            setVideo([]);
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      //for ios
    }
  }, []);

  let selectedVideo = (item) => {
    if (item.node.type == 'video') {
      console.log(item);
      const track = {
        albumTitle: 'Judwaa 2',
        artwork: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAQQ',
        duration: 261.093,
        genre: 'Bollywood Music',
        lyrics: '',
        title: 'Chalti Hai Kya 9 Se 12 - DJMaza.Life',
      };
      // storeData(item)
    } else {
      alert('please select video file');
    }
    setSelect(false);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@video', value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@video');
      if (value !== null) {
      }
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      {select ? (
        <MediaHelper
          onCancel={() => setSelect(false)}
          numPhotos={20} // just for android
          numVideos={20} // just for android
          media="all" // just for ios
          num={20}
          onSelectedItem={(item) => selectedVideo(item)}
        />
      ) : loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <Video list={video} navigation={navigation} />
      )}

      {Platform.OS == 'ios' ? (
        <View
          style={{
            justifyContent: 'flex-end',
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={() => setSelect(true)}
            style={{
              height: 50,
              width: 50,
              backgroundColor: 'orange',
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
