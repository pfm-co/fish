
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
			backgroundColor: '#0396a6',
		},
		})
	},
	headerContent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		// very very strangely, settings backgroundColor fixed alignment of inner text of headerContent!!!
		backgroundColor: "#00000000",
		width: deviceWith * 0.70,
	},
	headerContentText: {
		color: "#f5f5f5",
		textAlign: 'center',
		alignSelf: 'center',
		fontSize: 21,
		color: "#f5f5f5",
		flex: 1,
	},
    content: {
        padding: 15
    }

});
