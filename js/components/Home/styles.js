
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWith = Dimensions.get('window').width;




module.exports = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FBFAFA',
  },


});
