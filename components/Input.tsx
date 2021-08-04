import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function Input(){
  return <TextInput style={styles.input} />;
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#535BFE",
    borderWidth: 1,
    borderRadius: 25,
    width: "72%"
  },
});


export default Input;