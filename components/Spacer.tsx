import React from 'react';
import { DimensionValue, View } from 'react-native';

type SpacerPropType = {
  height?: DimensionValue;
  width?: DimensionValue;
};

const Spacer = ({ height = 20, width = '100%' }: SpacerPropType) => {
  return (
    <View
      style={{
        height: height,
        width: width,
      }}
    ></View>
  );
};

export default Spacer;
