
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
import { openDrawer } from '../../actions/drawer';



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
    this.props.changePayslipYearMonth(month - 1, this.state.payslipYear);
    this.props.navigateTo('home', 'home');
  }

  render() {

    const content = (
      <View style={styles.content}>
        <Heading2 style={{}}>تاریخچه</Heading2>
        <Paragraph style={{fontSize: 17, marginTop: 15}}> برای تغییر تاریخچه فیش حقوقی، ماه و سال مورد نظر را انتخاب کنید: </Paragraph>

        <View style={styles.pickerContainer}>
          <Picker
              iosHeader={I18n.t("Home.SelectOne")}
              mode="dropdown"
              selectedValue={this.state.payslipYear}
              onValueChange={(newValue) => this.setState({payslipYear: newValue})}
              style={styles.picker}
          >
              <Item label="1395" value="1395" />
          </Picker>

          <Text style={{marginLeft: 20}}>{I18n.t("Common.Year") + ": "}</Text>
        </View>

        <View style={styles.monthsContainer}>
          
          <View style={styles.monthsRow}>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(3)}> <Text>خرداد</Text> </Button>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(2)}> <Text>اردیبهشت</Text> </Button>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(1)}> <Text>فروردین</Text> </Button>
          </View>

          <View style={styles.monthsRow}>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(6)}> <Text>شهریور</Text> </Button>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(5)}> <Text>مرداد</Text> </Button>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(4)}> <Text>تیر</Text> </Button>
          </View>
        

          <View style={styles.monthsRow}>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(9)}> <Text>آذر</Text> </Button>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(8)}> <Text>آبان</Text> </Button>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(7)}> <Text>مهر</Text> </Button>
          </View>

          <View style={styles.monthsRow}>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(12)}> <Text>اسفند</Text> </Button>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(11)}> <Text>بهمن</Text> </Button>
            <Button bordered info style={styles.monthBtn} onPress={() => this.onSelectMonth(10)}> <Text>دی</Text> </Button>
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
              leftItem={{
                layout: 'icon',
                title: 'Back',
                icon: require('../../common/img/back_white.png'),
                onPress: () => this.props.navigateTo('home', 'home')
              }}
              >
              <View style={styles.headerContent}>
                  <Text style={styles.headerContentText}>تاریخچه</Text>
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
      openDrawer: () => dispatch(openDrawer()),
      changePayslipYearMonth: (month: int, year: int) => dispatch(changePayslipYearMonth(month, year)),
      navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),

  };
}

const mapStoreToProps = store => ({
    payslipYear: store.settings.payslipYear,
    payslipMonth: store.settings.payslipMonth,
});

export default connect(mapStoreToProps, bindActions)(History);
