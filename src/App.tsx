import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as React from 'react';
import {Button, Text, View} from 'react-native';
import styled from 'styled-components';
import {
  border,
  color,
  compose,
  flexbox,
  layout,
  position,
  space,
  system,
} from 'styled-system';

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
    <CenterView>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate(SCREENS.SETTINGS)}
      />
    </CenterView>
  );
};

const SettingsScreen = () => {
  return (
    <CenterView>
      <Text>Details Screen</Text>
      <Box width={50} height={50} bg="#228877" />
    </CenterView>
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

const CenterView = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Box = styled(View)(
  compose(position, layout, flexbox, space, color, border),
  system({
    borderRadius: true,
  }),
);
