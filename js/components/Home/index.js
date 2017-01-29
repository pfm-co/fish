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
import { openDrawer } from '../../actions/drawer';


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

  calculateTotalDeduction(deduction: Array[])
  {
    let totalDeduction = 0;
    for (let i = 0; i < deduction.length; i++)
    {
      totalDeduction += deduction[i].value;
    }

    return totalDeduction;
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

remove_duplicates_safe(arr) {
    var seen = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i].key in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i].key] = true;
        }
    }
    return ret_arr;

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
                {'  ' + this.formatMoney(
                              this.calculateTotalPayment(this.state.paySlipResult.data.payment) -
                                 this.calculateTotalDeduction(this.state.paySlipResult.data.deduction)) 
                                  + '  ' + I18n.t("Home.CurrencyUnit")}
              </Text>
            </CardItem>
        </Card>

            <ExpandablePanel headerItem=
              {
                  <View style={styles.payslipHeaderView}>
                    <Text style={styles.payslipHeaderText}>
                        {this.formatMoney(this.calculateTotalPayment(this.state.paySlipResult.data.payment))} 
                        { " " + I18n.t("Home.CurrencyUnit")}
                    </Text>
                    <Text style={styles.payslipHeaderText}>{I18n.t("Home.PaidAmount")}</Text>
                  </View>
              }
            >
                <View style={styles.payslipDetailsView}>

                  <View style={styles.paymentDetailsItemHeaderView}>
                    <Text style={[styles.paymentDetailsHeaderText, {flex:1}]}>{I18n.t("Home.MoneyAmount")}</Text>
                    <Text style={[styles.paymentDetailsHeaderText, {flex:3.5}]}>{I18n.t("Home.PaymentTitle")}</Text>
                  </View>

                {this.state.paySlipResult.data.payment.map(payment => {
                  return (
                    <View style={styles.paymentDetailsItemView} key={'payment' + payment.title}>
                      <Text style={[styles.payslipRowValueText, {flex:1}]}>
                        {this.formatMoney(payment.value) + " " + I18n.t("Home.CurrencyUnit")}
                      </Text>
                      <Text style={[styles.payslipRowTitleText, {flex:4}]}>{payment.title}</Text>
                    </View>
                  );
                })}

                </View>
            </ExpandablePanel>


            <ExpandablePanel headerItem=
              {
                  <View style={styles.payslipHeaderView}>
                    <Text style={styles.payslipHeaderText}>{this.formatMoney(this.calculateTotalDeduction(this.state.paySlipResult.data.deduction))} {I18n.t("Home.CurrencyUnit")}</Text>
                    <Text style={styles.payslipHeaderText}>{I18n.t("Home.Deductions")}</Text>
                  </View>
              }
            >
                <View style={styles.payslipDetailsView}>

                  <View style={styles.paymentDetailsItemHeaderView}>
                    <Text style={[styles.paymentDetailsHeaderText, {flex:1}]}>{I18n.t("Home.Remaining")}</Text>
                    <Text style={[styles.paymentDetailsHeaderText, {flex:1}]}>{I18n.t("Home.MoneyAmount")}</Text>
                    <Text style={[styles.paymentDetailsHeaderText, {flex:3}]}>{I18n.t("Home.DeductionTitle")}</Text>
                  </View>

                {this.state.paySlipResult.data.deduction.map(deduction => {
                  return (
                    <View style={styles.paymentDetailsItemView} key={'deduction' + deduction.title}>
                      <Text style={[styles.payslipRowValueText, {flex:1}]}>{deduction.remain == "" ? "" : (this.formatMoney(deduction.remain) + ' ریال')}</Text>
                      <Text style={[styles.payslipRowValueText, {flex:1}]}>{this.formatMoney(deduction.value) + ' ریال'}</Text>
                      <Text style={[styles.payslipRowTitleText, {flex:3}]}>{deduction.title}</Text>
                    </View>
                  );
                })}

                </View>
            </ExpandablePanel>
            

            <ExpandablePanel headerItem=
              {
                  <View style={styles.payslipHeaderView}>
                    <View style={{flex:1}}></View>
                    <Text style={styles.payslipHeaderText}>{I18n.t("Home.JobDetais")}</Text>
                  </View>
              }
            >
              <View style={[styles.payslipDetailsView, {marginTop: 0}]}>

                {this.remove_duplicates_safe(this.state.paySlipResult.data.job).map((jobDetails, i) => {
                  return (
                    <View style={[styles.paymentDetailsItemView, 
                        {borderTopWidth: i == 0 ? 0 : 1, marginTop: i == 0 ? 3 : 10}]} key={'jobDetails' + jobDetails.key}>
                      <Text style={[styles.payslipRowValueText, {flex:1}]}>{jobDetails.value}</Text>
                      <Text style={[styles.payslipRowTitleText, {flex:3}]}>{jobDetails.title}</Text>
                    </View>
                  );
                })}

              </View>
            </ExpandablePanel>


            <ExpandablePanel headerItem=
              {
                  <View style={styles.payslipHeaderView}>
                    <View style={{flex:1}}></View>
                    <Text style={styles.payslipHeaderText}>{I18n.t("Home.InsuranceDetails")}</Text>
                  </View>
              }
            >
              <View style={[styles.payslipDetailsView, {marginTop: 0}]}>

                {this.state.paySlipResult.data.insurance.map((insuranceDetails, i) => {
                  return (
                    <View style={[styles.paymentDetailsItemView, {borderTopWidth: i == 0 ? 0 : 1}]} key={'insuranceDetails' + insuranceDetails.key}>
                      <Text style={styles.payslipRowValueText}>{insuranceDetails.value}</Text>
                      <Text style={styles.payslipRowTitleText}>{insuranceDetails.title}</Text>
                    </View>
                  );
                })}

              </View>
            </ExpandablePanel>

            <View style={styles.bottomSpacer}/>

          </View>
        ) : (
          <View>
            <Text>ERRRRORRR this is intentialy left ugly!</Text>
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
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    openDrawer: () => dispatch(openDrawer()),
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
