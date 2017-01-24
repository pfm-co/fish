'use strict';


import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Picker, Card, CardItem, InputGroup, Input, Button, Icon, View } from 'native-base';
var { Text } = require('../../common/FmText');
import ExpandablePanel from '../../common/ExpandablePanel';
const ActivityIndicator = require('ActivityIndicator');
const FmHeader = require('../../common/FmHeader');
const Item = Picker.Item;

import styles from './styles';
import I18n from 'react-native-i18n'

const {
  replaceAt,
} = actions;


class Home extends Component {
  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  static contextTypes = {
    openDrawer: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoadingPayslip: false,
      paySlipResult: {status: false, data: {}},
      hasError: false,
      errorMsg: '',
    };

    this.loadPayslip = this.loadPayslip.bind(this);

  }

  componentDidMount() {
    this.loadPayslip();
  }

  formatMoney(num) {
      var p = num.toFixed(2).split(".");
      return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
          return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") ;
  }

  calculateTotalPayment(payments: Array[])
  {
    let totalPayment = 0;
    for (let i = 0; i < payments.length; i++)
    {
      totalPayment += payments[i].value;
    }

    return totalPayment;
  }

  loadPayslip()
  {
    let that = this;
    try
    {
        this.setState({
          isLoadingPayslip: true,
        });

        fetch("http://fish.medu.ir/api/view/1395/10", {
          method: "GET",
          headers: new Headers({'token': this.props.loginToken}),
        })
        .then(result => {
          return result.json()
        })
        .then(result => {
          console.log('webservice result: ', result);
          if (result)
          {
            if (result.status)
            {
              that.setState({
                isLoadingPayslip: false,
                paySlipResult: {status: true, data: result.data},
              });
            }
            else
            {
              that.setState({
                isLoadingPayslip: false,
                hasError: true,
                errorMsg: result.message
              });
            }
          }
          else
          {
            that.setState({
                isLoadingPayslip: false,
                hasError: true,
                errorMsg: I18n.t("Home.UnknownError"),
              });
          }

        })
        .catch(e => {
          console.log("Error logging in: ", e);

        });
    }
    catch(e)
    {
      console.log("Error logging in: ", e);
    }
  }



  render() {
    const content = this.state.isLoadingPayslip ? (
      <View>
        <ActivityIndicator
            size="small"
            color="#382B5C"
            animating={true}
        />
      </View>
    ) : this.state.paySlipResult.status ?
    (
      <View style={styles.content}>
        <Card style={styles.card}>
              <CardItem>
                <View style={styles.topSummaryView}>
                    <Text style={styles.periodText}>{this.props.payslipMonthStr} {this.props.payslipYear}</Text>
                 </View>
                 <Text style={styles.topSalarySummary}>
                  {I18n.t("Home.TotalPayment")} : 
                    {'  ' + this.formatMoney(this.calculateTotalPayment(this.state.paySlipResult.data.payment))} {I18n.t("Home.CurrencyUnit")}
                 </Text>
               </CardItem>
            </Card>
            <ExpandablePanel headerItem={
              <View style={styles.paymentsView}>
                  <View style={styles.paymentHeader}>
                    <Text>17,654,000 ریال</Text>
                    <Text>پرداختی</Text>
                  </View>
              </View>
            }>
                <View style={styles.paymentDetailsView}>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>
                </View>
            </ExpandablePanel>
            <Card style={styles.card}>
              <CardItem>
                <View style={styles.paymentsView}>
                  <View style={styles.paymentHeader}>
                    <Text>17,654,000 ریال</Text>
                    <Text>پرداختی</Text>
                  </View>
                </View>
              </CardItem>
              <CardItem>
                <View style={styles.paymentDetailsView}>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حقوق پایه</Text>
                  </View>
                </View>
              </CardItem>
            </Card>

            <Card  style={styles.card}>
              <CardItem>
                <View style={styles.paymentsView}>
                  <View style={styles.paymentHeader}>
                    <Text>17,654,000 ریال</Text>
                    <Text>کسورات</Text>
                  </View>
                </View>
              </CardItem>
              <CardItem>
                <View style={styles.paymentDetailsView}>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حق بیمه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حق بیمه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حق بیمه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حق بیمه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حق بیمه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حق بیمه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حق بیمه</Text>
                  </View>

                  <View style={styles.paymentDetailsItemView}>
                    <Text>11,000,000 ریال</Text>
                    <Text>حق بیمه</Text>
                  </View>
                </View>
              </CardItem>
            </Card>
          </View>
        ) : (
          <View>
            <Text>ERRRRORRR</Text>
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
                  onPress: this.context.openDrawer(),
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
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    
  };
}

const mapStoreToProps = store => ({
  navigation: store.cardNavigation,
  loginToken: store.user.token,
  payslipMonth: store.settings.payslipMonth,
  payslipYear: store.settings.payslipYear,
  payslipMonthStr: store.settings.payslipMonthStr,
});

export default connect(mapStoreToProps, bindActions)(Home);
