import { StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Test from '@/components/Test';

export default function App() {
  return (
    <View style={styles.container}>
      <Test />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
