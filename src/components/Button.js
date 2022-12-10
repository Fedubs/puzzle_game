import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({title, level, submit}) => {
  return (
    <TouchableOpacity onPress={submit} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 6,
    backgroundColor: '#540cd1',
    borderColor: '#545454',
    borderWidth: 1,
    // elevation: 8,
    shadowColor: '#540cd1',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5, // <- Radius of the shadow
    borderRadius: 20,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 15,
    lineHeight: 26,
    letterSpacing: 1.5,
  },
});
export default Button;
