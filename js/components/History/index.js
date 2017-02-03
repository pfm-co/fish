
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, View, Picker, Button} from 'native-base';
const { Text, Heading1, Heading2, Paragraph } = require('../../common/FmText');
const FmHeader = require('../../common/FmHeader');

import styles from './styles';
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome';
const Item = Picker.Item;

import { changePayslipYearMonth } from '../../actions/settings';
import { navigateTo } from '../../actions/drawer';


class History extends Component {
  static propTypes = {
    navigator: React.PropTypes.shape({}),
  }

constructor(props) {
    super(props);

    this.onSelectMonth = this.onSelectMonth.bind(this);

    this.state = {
        payslipYear: props.payslipYear.toString(),
        payslipMonth: props.payslipMonth.toString()
    };
  }

  componentWillMount() {
    const navigator = this.props.navigator;

  }

  componentDidMount()
  {
      
  }

  onSelectMonth(month: int)
  {
    debugger;
    this.props.changePayslipYearMonth(month.toString(), this.state.payslipYear);
    this.props.navigateTo('home', 'home');
  }

  render() {

    const content = (
      <View style={styles.content}>
        <Heading2 style={{}}>تاریخچه</Heading2>
        <Paragraph style={{fontSize: 17, marginTop: 15}}> برای تغییر تاریخچه فیش حقوقی، ماه و سال مورد نظر را انتخاب کنید: </Paragraph>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          <Picker
              iosHeader={I18n.t("Home.SelectOne")}
              mode="dropdown"
              selectedValue={this.state.payslipYear}
              onValueChange={(newValue) => this.setState({payslipYear: newValue})}
              style={styles.picker}
          >
              <Item label="1395" value="1395" />
              <Item label="1394" value="1394" />
              <Item label="1393" value="1393" />
              <Item label="1392" value="1392" />
              <Item label="1391" value="1391" />
          </Picker>

          <Text style={{marginLeft: 20}}>{I18n.t("Common.Year") + ": "}</Text>
        </View>

        <View style={{flex:1, flexDirection: 'column', marginLeft: 30, marginRight: 30, marginTop: 50}}>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Button bordered info onPress={() => this.onSelectMonth(1)}> <Text>فروردین</Text> </Button>
            <Button bordered info> اردیبهشت </Button>
            <Button bordered info> خرداد </Button>
          </View>
        
        </View>

      </View>
    );


    return (
      <Container>
        <View style={styles.container}>
          <FmHeader
              style={styles.header}
              rightItem={{
                  layout: 'icon',
                  title: 'Menu',
                  icon: require('../../common/img/hamburger.png'),
                  onPress: () => this.props.openDrawer(),
              }}
              >
              <View style={styles.headerContent}>
                  <View><Text style={styles.headerContentText}>{I18n.t("Common.AppName")}</Text></View>
              </View>
          </FmHeader>

          <Content>
            
            {content}

          </Content>
        </View>
      </Container>

    );
  }
}


function bindActions(dispatch) {
  return {
      changePayslipYearMonth: (month: int, year: int) => dispatch(changePayslipYearMonth(month, year)),
      navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),

  };
}

const mapStoreToProps = store => ({
    payslipYear: store.settings.payslipYear,
    payslipMonth: store.settings.payslipMonth,
});

export default connect(mapStoreToProps, bindActions)(History);
