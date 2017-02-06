
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
	topSummaryView: {
		flex:1,
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'space-between',
	},
	periodText: {
		fontSize: 23,
		color: "#360000"
	},
	content: {
		flex: 1,
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
	expandableLayout: {
		paddingTop: 20,
		marginLeft: 10,
		marginRight: 10,
	},
	payslipHeaderView: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'space-between',

	},
	payslipHeaderText:{
		fontSize: 18,
		color: "#00032a",
	},
	payslipDetailsView: {
		flexDirection: 'column',
		marginTop: 10,
	},
	paymentDetailsItemView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		borderTopColor: "#d3d3d3",
		borderTopWidth: 1,
		borderStyle: 'solid',
		paddingTop: 8,
	},
	paymentDetailsItemHeaderView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 13,
		borderBottomColor: "#949494",
		borderBottomWidth: 0,
		borderStyle: 'solid',
	},
	paymentDetailsHeaderText: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	payslipRowTitleText: {
		color: "#00010f",
	},
	payslipRowValueText: {
		color: "#00033f",
		alignSelf: 'flex-start',
		textAlign: 'right',
	},
	bottomSpacer:
	{
		flex:1,
		height: 25,
	}

});
