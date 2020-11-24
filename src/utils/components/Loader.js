import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = (props) => {
  const { color, backgroundColor } = props;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor || 'white',
      }}
    >
      <ActivityIndicator size="large" color={color || '#0000ff'} style={{ flex: 1 }} />
    </View>
  );
};

export default Loader;
