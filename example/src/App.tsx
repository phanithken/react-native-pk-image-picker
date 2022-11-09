import * as React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { PKImagePicker } from '../../lib/typescript/PKImagePicker';
import { useState } from 'react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenPicker = () => setIsOpen(true);
  const handleClosePicker = () => setIsOpen(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenPicker}>
        Open Picker
      </TouchableOpacity>
      <PKImagePicker
        isVisible={isOpen}
        multiple={true}
        onClose={handleClosePicker}
        maximum={10}
      />
    </View>
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
