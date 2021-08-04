import * as React from 'react';

import { Text, TextProps } from './Themed';

export function Subtitle(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'segoe-ui' }]} />;
}
