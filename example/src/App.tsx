import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PKImagePicker } from 'react-native-pk-image-picker';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenPicker = () => setIsOpen(true);
  const handleClosePicker = () => setIsOpen(false);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOpenPicker}>
          <Text>Open Picker</Text>
        </TouchableOpacity>
        <PKImagePicker
          isVisible={isOpen}
          multiple={true}
          onClose={handleClosePicker}
          maximum={10}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
