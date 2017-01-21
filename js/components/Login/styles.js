
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWith = Dimensions.get('window').width;


module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
    height: deviceHeight,
    width: deviceWith,
  },
  input: {
    marginBottom: 20,
    marginRight: 20,
    marginLeft:20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop:5,
    paddingBottom:5,
  },
  btnText: {
    fontSize: 20,
  },
  loginError: {
    fontSize: 20,
    color: '#ea0000',
    marginTop: 15
  },
});
