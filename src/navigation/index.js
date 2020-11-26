import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UnivList from '../screens/UnivList';
// import AppCode from '../screens/AppCode';
// import Login from '../screens/Login';
// import SelExam from '../screens/SelExam';
// import Evaluate from '../screens/Evaluate';
// import InterviewRecord from '../screens/InterviewRecord';
// import VideoSample from '../samples/VideoSample';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const options = {
  transitionSpec: {
    open: config,
    close: config,
  },
};

// const EvaluateStack = () => {
//   return (
//     <Stack.Navigator headerMode="none" initialRouteName="Evaluate">
//       <Stack.Screen name="Evaluate" component={Evaluate} />
//       <Stack.Screen name="InterviewRecord" component={InterviewRecord} />
//     </Stack.Navigator>
//   );
// };

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator headerMode="none" initialRouteName="UnivList">
        <Stack.Screen name="UnivList" component={UnivList} options={{ animationEnabled: false }} />
        {/* <Stack.Screen name="AppCode" component={AppCode} options={{ animationEnabled: false }} /> */}
        {/* <Stack.Screen name="Login" component={Login} options={{ animationEnabled: false }} /> */}
        {/* <Stack.Screen name="SelExam" component={SelExam} options={{ animationEnabled: false }} /> */}
        {/* <Stack.Screen name="EvaluateStack" component={EvaluateStack} options={{ animationEnabled: false }} /> */}
        {/* <Stack.Screen name="VideoSample" component={VideoSample} options={{ animationEnabled: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
