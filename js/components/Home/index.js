'use strict';


import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Picker, Card, CardItem, InputGroup, Input, Button, Icon, View } from 'native-base';
const { Text } = require('../../common/FmText');
import ExpandablePanel from '../../common/ExpandablePanel';
const ActivityIndicator = require('ActivityIndicator');
const FmHeader = require('../../common/FmHeader');
const Item = Picker.Item;
const moment = require('moment-jalaali');

import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import I18n from 'react-native-i18n'
import { openDrawer } from '../../actions/drawer';
import { updateAdditionalInfo } from '../../actions/user';
import { changePayslipYearMonth } from '../../actions/settings';


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

    let m = moment();

    this.state = {
      isLoadingPayslip: false,
      paySlipResult: {status: false, data: {}},
      hasError: false,
      errorMsg: '',
      emptyPayslip: false,
      currentYear: m.jYear(),
      currentMonth: m.jMonth()
    };

    this.loadPayslip = this.loadPayslip.bind(this);
    this.onNextMonth = this.onNextMonth.bind(this);
    this.onPrevMonth = this.onPrevMonth.bind(this);

  }

  componentDidMount() {
      this.loadPayslip(this.props.payslipMonth, this.props.payslipYear);
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.payslipMonth !== this.props.payslipMonth || nextProps.payslipYear !== this.props.payslipYear)
    {
      this.loadPayslip(nextProps.payslipMonth, nextProps.payslipYear);
    }
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

  onNextMonth()
  {


    let year = this.props.payslipYear;
    let nextMonth = this.props.payslipMonth;
    if (nextMonth == 11)
    {
      if (year != this.state.currentYear)
      {
        nextMonth = 0;
        year++;
      }
    }
    else if (nextMonth < this.state.currentMonth)
      nextMonth++;
    
    this.props.changePayslipYearMonth(nextMonth, year);
  }

  onPrevMonth()
  {
    let year = this.props.payslipYear;
    let prevMonth = this.props.payslipMonth;
    if (prevMonth == 0 && year != this.state.currentYear - 5)
    {
      // Due to employer request, limit year to current year, for now
      return;
      // prevMonth = 11;
      // year--;
    }
    else
      prevMonth--;
    
    this.props.changePayslipYearMonth(prevMonth, year);
  }

  loadPayslip(month: int, year:int)
  {
    let that = this;
    // moment's months are 0 indexed, we need 1 indexed months (1 - 12)
    month++;
    try
    {
        this.setState({
          isLoadingPayslip: true,
        });

        let url = "http://fish.medu.ir/api/view/" + year + "/" + month;
        fetch(url, {
          method: "GET",
          headers: new Headers({'token': this.props.loginToken}),
        })
        .then(result => {
          return result.json()
        })
        .then(result => {
          if (result)
          {
            if (result.status)
            {
              if (result.data.job.length == 0)
              {
                that.setState({
                  hasError: false,
                  errorMsg: '',
                  isLoadingPayslip: false,
                  emptyPayslip: true,
                  paySlipResult: {status: true, data: result.data},
                  
                });
              }
              else
              {
                that.setState({
                  isLoadingPayslip: false,
                  emptyPayslip: false,
                  paySlipResult: {status: true, data: result.data},
                });

                that.props.updateAdditionalInfo('', result.data.info[1].value, result.data.info[0].value,
                  result.data.info[3].value + '');
              }
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
          this.setState({
            isLoadingPayslip: false,
            hasError: true,
            errorMsg: "Unresolved error, contact server administrator"
          });

        });
    }
    catch(e)
    {
      console.log("Error logging in: ", e);

      this.setState({
            isLoadingPayslip: false,
            hasError: true,
            errorMsg: "Unresolved error, contact server administrator"
          });
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
    const payslipContent = !this.state.isLoadingPayslip && this.state.paySlipResult.status && !this.state.emptyPayslip ? 
    (
    <View>
      <ExpandablePanel expanded={false} style={styles.expandableLayout}
              headerItem=
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
                    <Text style={[styles.paymentDetailsHeaderText, {flex:1}]}>{I18n.t("Home.MoneyAmount") + ' ' + I18n.t("Home.CurrencyUnitPrnth")}</Text>
                    <Text style={[styles.paymentDetailsHeaderText, {flex:3.5}]}>{I18n.t("Home.PaymentTitle")}</Text>
                  </View>

                {this.state.paySlipResult.data.payment.map(payment => {
                  return (
                    <View style={styles.paymentDetailsItemView} key={'payment' + payment.title}>
                      <Text style={[styles.payslipRowValueText, {flex:1}]}>
                        {this.formatMoney(payment.value)}
                      </Text>
                      <Text style={[styles.payslipRowTitleText, {flex:4}]}>{payment.title}</Text>
                    </View>
                  );
                })}

                </View>
            </ExpandablePanel>


            <ExpandablePanel expanded={false} style={styles.expandableLayout}
              headerItem=
              {
                  <View style={styles.payslipHeaderView}>
                    <Text style={styles.payslipHeaderText}>{this.formatMoney(this.calculateTotalDeduction(this.state.paySlipResult.data.deduction))} {I18n.t("Home.CurrencyUnit")}</Text>
                    <Text style={styles.payslipHeaderText}>{I18n.t("Home.Deductions")}</Text>
                  </View>
              }
            >
                <View style={styles.payslipDetailsView}>

                  <View style={styles.paymentDetailsItemHeaderView}>
                    <Text style={[styles.paymentDetailsHeaderText, {flex:1}]}>{I18n.t("Home.Remaining") }</Text>
                    <Text style={[styles.paymentDetailsHeaderText, {flex:1}]}>{I18n.t("Home.MoneyAmount") + ' ' + I18n.t("Home.CurrencyUnitPrnth")}</Text>
                    <Text style={[styles.paymentDetailsHeaderText, {flex:2.2}]}>{I18n.t("Home.DeductionTitle")}</Text>
                  </View>

                {this.state.paySlipResult.data.deduction.map(deduction => {
                  return (
                    <View style={styles.paymentDetailsItemView} key={'deduction' + deduction.title}>
                      <Text style={[styles.payslipRowValueText, {flex:1}]}>{ (typeof deduction.remain) == "string" ? "" : (this.formatMoney(deduction.remain))}</Text>
                      <Text style={[styles.payslipRowValueText, {flex:1}]}>{this.formatMoney(deduction.value)}</Text>
                      <Text style={[styles.payslipRowTitleText, {flex:2.2}]}>{deduction.title}</Text>
                    </View>
                  );
                })}

                </View>
            </ExpandablePanel>
            

            <ExpandablePanel expanded={false} style={styles.expandableLayout}
              headerItem=
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
                      <Text style={[styles.payslipRowValueText, {flex:1}]}>{typeof jobDetails.value === "string" ? jobDetails.value : (this.formatMoney(jobDetails.value) + (jobDetails.value.toString().length > 3 ? ' ' + I18n.t("Home.CurrencyUnit") : '' ))}</Text>
                      <Text style={[styles.payslipRowTitleText, {flex:1}]}>{jobDetails.title}</Text>
                    </View>
                  );
                })}

              </View>
            </ExpandablePanel>


            <ExpandablePanel expanded={false} style={styles.expandableLayout}
              onToggle={() => { this.refs.Content.scrollToEnd() }}
              headerItem=
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
                    <View style={[styles.paymentDetailsItemView, 
                        {borderTopWidth: i == 0 ? 0 : 1,  marginTop: i == 0 ? 3 : 10}]} key={'insuranceDetails' + insuranceDetails.key}>
                      <Text style={[styles.payslipRowValueText]}>{insuranceDetails.value}</Text>
                      <Text style={[styles.payslipRowValueText]}>{insuranceDetails.title}</Text>
                    </View>
                  );
                })}

              </View>
            </ExpandablePanel>

            <Card style={styles.cardContainer}>
              <CardItem>
                <Text style={styles.cardText}>مبلغ فوق به حساب {this.props.userInfo.accountNumber} در بانک {this.props.userInfo.bankName} واریز خواهد شد.</Text>
              </CardItem>
            
            </Card>
        </View>
    )
    :
    (null)
    ;

    const content = this.state.isLoadingPayslip ? (
      <View style={styles.loadingView}>
        <ActivityIndicator
            size="large"
            color="#0067EA"
            animating={true}
            style={{alignSelf: 'center'}}
        />

        <Text style={{marginTop: 20}}>در حال دریافت فیش حقوقی...</Text>

      </View>
    ) : this.state.paySlipResult.status ?
    (
      <View style={styles.content}>
          <Card style={styles.card}>
            <CardItem>
              <View style={styles.topSummaryView}>
                  <TouchableOpacity 
                    style={styles.btnChangeMonth} 
                    onPress={() => this.onPrevMonth()}>
                      <Ionicon name="ios-arrow-back" size={15} color="#04436c" style={{marginRight: 5}}  />
                      <Text style={{color: "#0a619a"}}>ماه قبل</Text>
                  </TouchableOpacity>

                  <Text style={styles.periodText}>{this.props.payslipMonthStr} {this.props.payslipYear}</Text>

                  {
                    (this.state.currentYear != this.props.payslipYear || 
                      (this.state.currentYear == this.props.payslipYear && this.props.payslipMonth) < this.state.currentMonth) ?
                    <TouchableOpacity 
                      style={styles.btnChangeMonth} 
                      onPress={() => this.onNextMonth()}>
                        <Text style={{color: "#0a619a"}}>ماه بعد</Text>
                        <Ionicon name="ios-arrow-forward" size={15} color="#04436c" style={{marginLeft: 5}}  />
                    </TouchableOpacity>
                    :
                    <View style={{flex: 0.3}} />
                  }
                  
              </View>
                { 
                  !this.state.emptyPayslip && 
                  <Text style={styles.topSalarySummary}>
                    {I18n.t("Home.TotalPayment")} : 
                      {'  ' + this.formatMoney(
                                    this.calculateTotalPayment(this.state.paySlipResult.data.payment) -
                                      this.calculateTotalDeduction(this.state.paySlipResult.data.deduction)) 
                                        + '  ' + I18n.t("Home.CurrencyUnit")}
                  </Text> 
                }
                {
                  this.state.emptyPayslip && 
                  <Text style={styles.topSalarySummary}>
                    در تاریخ انتخاب شده اطلاعاتی وجود ندارد
                  </Text>
                }
              </CardItem>
          </Card>

          {payslipContent}

          <View style={styles.bottomSpacer}/>

          </View>
        ) : (
          <View style={styles.errorViewContainer}>
            <View style={styles.errorView}>
              <MaterialIcon name="error-outline" size={50} color="#f05900" />
              <Text style={styles.errorText}>{I18n.t("Home.NetworkError")}</Text>
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

          <ScrollView ref="Content">
            
            {content}

          </ScrollView>
        </View>
      </Container>
    );
  }


}



function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    openDrawer: () => dispatch(openDrawer()),
    updateAdditionalInfo: (province: string, region: string, bankName: string, accountNumber: string) => dispatch(updateAdditionalInfo(province, region, bankName, accountNumber)),
    changePayslipYearMonth: (month: int, year: int) => dispatch(changePayslipYearMonth(month, year)),
  };
}

const mapStoreToProps = store => ({
  navigation: store.cardNavigation,
  loginToken: store.user.token,
  payslipMonth: store.settings.payslipMonth,
  payslipYear: store.settings.payslipYear,
  payslipMonthStr: store.settings.payslipMonthStr,
  userInfo: store.user
});

export default connect(mapStoreToProps, bindActions)(Home);
