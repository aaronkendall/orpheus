import React from 'react';
import { TouchableHighlight, Text } from 'react-native';

import { styles } from '../style/styles';

const Button = ({onPress, text}) => {
  return(
    <TouchableHighlight onPress={onPress} style={styles.button}>
      <Text>
        {text}
      </Text>
    </TouchableHighlight>
  );
};

export default Button;
