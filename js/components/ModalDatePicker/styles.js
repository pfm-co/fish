
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWith = Dimensions.get('window').width;



module.exports = StyleSheet.create({
  modal: {
    height: deviceHeight / 4,
    width: deviceWith * 0.90,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
    pickersView: {
        flex:1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    picker: {
        width: 110,
    },
    messageText: {
        fontSize: 18,
        color: "#000B3D",
        textAlign: 'center',
        alignSelf: 'center',
    }
});
