import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class CustomButton extends Component{
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#000',
    titleColor: '#fff',
    onPress: () => null,
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity style={[
        styles.button,
        {backgroundColor: this.props.buttonColor}
      ]}
      onPress={this.props.onPress}>
        <Image source={require("../../assets/images/qrcode.png")} />
        <Text style={[
          styles.title,
          {color: this.props.titleColor}
        ]}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 63,
    height: 63,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
  },
});