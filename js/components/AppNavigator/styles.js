const React = require('react-native');

const { StyleSheet, Dimensions } = React;
const Platform = require('Platform');

const deviceHeight = Dimensions.get('window').height;
const deviceWith = Dimensions.get('window').width;
const drawerWidth = deviceWith / 1.3 > 290 ? 290 : deviceWith / 1.3;

module.exports = StyleSheet.create({
    drawer: {
      flex: 1,
      backgroundColor: 'white',
      zIndex:1000
    },
    content: {
      flex: 1,
    },
    modal: {
      height: deviceHeight / 4,
      width: deviceWith * 0.90,
      borderRadius: 7,
      backgroundColor: "#F9F9F9",
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 30,
      paddingBottom: 20,
      paddingRight: 15,
      paddingLeft: 15,
    },
    header: {
      padding: 20,
      paddingBottom: 0,
      justifyContent: 'flex-start',
    },
    accountItem: {
      width: drawerWidth,
      flex:1,
      flexDirection:"column",
      justifyContent: 'space-between',
      paddingRight: 40,
      paddingBottom: 7
    },
    topAccountDetails: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 30
    },
    accountIdText: {
      color: "#001431"
    },
    nameView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    nameText: {
      marginTop: 10,
      color: '#6f0000',
      fontSize: 23,
    },
    regionText: {
      color: '#6f0000',
      fontSize: 13,
      marginTop:7,
    },
    logout: {
      fontSize: 15,
      color: '#b80101',
    },
    profilePic:
    {
      width: 70,
      height: 70,
      borderRadius: 35,
    }

});