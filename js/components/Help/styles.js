
const React = require('react-native');

const { StyleSheet, Dimensions } = React;
const Platform = require('Platform');

const deviceHeight = Dimensions.get('window').height;
const deviceWith = Dimensions.get('window').width;



module.exports = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FBFAFA',
    },
	header: {
		...Platform.select({
			android: {
			backgroundColor: '#5597B8',
		},
		})
	},
	headerContent: {
		...Platform.select({
		android: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			// very very strangely, settings backgroundColor fixed alignment of inner text of headerContent!!!
			backgroundColor: "#00000000",
			marginRight: 40,
		},
		ios: {
			height: 65,
			alignItems: 'center',
			justifyContent: 'center',
		}
	})
	},
	headerContentText: {
		color: "#f5f5f5",
		textAlign: 'center',
		alignSelf: 'center',
	},
    content: {
        padding: 15
    }

});
