
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
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  middleSpacer: {
    flex: 1,
  },
  bottomSpacer: {
    flex: 1,
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
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginTop: 50,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
    marginRight: 20,
    marginLeft:20,
  },
  inputText: {
    color: "#f5f5f5",
    textAlign: 'right',
    paddingRight: 7,

  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
    paddingLeft: 70,
    paddingRight: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
    backgroundColor: "#0387d2",
  },
  btnText: {
    fontSize: 20,
    color: '#DBDBDB'
  },
  loginError: {
    fontSize: 16,
    color: '#f1f1f1',
    alignSelf: 'center',
  },
  modal: {
    height: deviceHeight / 4,
    width: deviceWith * 0.90,
    borderRadius: 10,
    backgroundColor: "#EB1D36",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    paddingRight: 15,
    paddingLeft: 15,
  },
});
