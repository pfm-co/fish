
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
	pickersView: {
		flex:1,
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'space-between',
	},
	picker: {
		width: 110,
	},
	card: {
		marginLeft:10,
		marginRight:10,
	},
	topSalarySummary: {
		alignSelf: 'center',
		fontSize: 16,
		color: '#4E0000',
		marginTop:3,
	},
	paymentsView: {
		flexDirection: 'column',
	},
	paymentHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',

	},
	paymentDetailsView: {
		flexDirection: 'column',
		marginTop: 10,
	},
	paymentDetailsItemView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	}


});
