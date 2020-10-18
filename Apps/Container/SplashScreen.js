import React, {useEffect, useState} from 'react';
import {Text, View, PermissionsAndroid, Alert, Image} from 'react-native';
import icons from '../resources/icons';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    androidPermission();
  }, []);

  const androidPermission = async () => {
    console.log('check android Permission');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to read the music file ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('tabStack');
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to Play music file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
      }}>
      <Image
        source={icons.logo}
        style={{width: 150, height: 150, marginBottom: 20}}
      />
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>
        Music App
      </Text>
    </View>
  );
}
