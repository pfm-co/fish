
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWith = Dimensions.get('window').width;


module.exports = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: deviceWith,
    height: deviceHeight,
    bottom: 0,
    resizeMode: "stretch", // or 'stretch'
    alignSelf: 'stretch',
  },
  bg: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    width: null,
    height: null,
    bottom: 0,
  },
  appLogo: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    marginTop: 50,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
    marginRight: 20,
    marginLeft:20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop:5,
    paddingBottom:5,
  },
  btnText: {
    fontSize: 20,
    color: '#DBDBDB'
  },
  loginError: {
    fontSize: 20,
    color: '#ea0000',
    marginTop: 15,
    alignSelf: 'center',
  },
});
