import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DashBoardStack from './Apps/Routers/DashBoardStack';




const App = (props) => {

  return (
    <NavigationContainer>  
      <DashBoardStack />
    </NavigationContainer>
  );

};

export default App;
