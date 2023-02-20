import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, Button} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

enum SCREENS {
  TIMER = 'timer',
  SETTINGS = 'settings',
}

type RootStackParamList = {
  [SCREENS.TIMER]: undefined;
  [SCREENS.SETTINGS]: undefined;
  // Profile: {userId: string};
};

// type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

type Props = NativeStackScreenProps<RootStackParamList, SCREENS.TIMER>;
const TimerScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate(SCREENS.SETTINGS)}
      />
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SCREENS.TIMER} component={TimerScreen} />
        <Stack.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
