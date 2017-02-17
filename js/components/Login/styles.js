
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


module.exports = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    bottom: 0,
  },
  loginForm: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },
  bottomSpacer: {
    flex: 1,
    height:300
  },
  bg: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  appLogo: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginTop: 40,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
    marginRight: 20,
    marginLeft:20,
  },
  inputText: {
    color: "#135ca1",
    textAlign: 'right',
    paddingRight: 7,
    fontSize: 17,
    fontFamily: require('../../env').fontFamily,

  },
  btn: {
    width: deviceWidth * 0.90,
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 7,
    paddingTop: 5,
    backgroundColor: "#0387d2",
    borderRadius: 4,
  },
  btnText: {
    fontSize: 20,
    color: '#FFF'
  },
  loginError: {
    fontSize: 16,
    color: '#f1f1f1',
    alignSelf: 'center',
  },
  modal: {
    height: deviceHeight / 4,
    width: deviceWidth * 0.90,
    borderRadius: 10,
    backgroundColor: "#EB1D36",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    paddingRight: 15,
    paddingLeft: 15,
    zIndex: 10000,
    
  },
});
