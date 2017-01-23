'use strict';


import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Picker, Card, CardItem, InputGroup, Text, Input, Button, Icon, View } from 'native-base';
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
          console.log(result);
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
                  
              </View>
          </FmHeader>

          <Content>
            <Card style={styles.card}>
              <CardItem>
                <View style={styles.pickersView}>
                   <Picker
                        iosHeader={I18n.t("Home.SelectOne")}
                        mode="dropdown"
                        selectedValue={this.state.year}
                        onValueChange={(newValue) => this.setState({year: newValue})}
                        style={styles.picker}
                    >
                        <Item label="1395" value="1395" />
                        <Item label="1394" value="1394" />
                        <Item label="1393" value="1393" />
                        <Item label="1392" value="1392" />
                   </Picker>

                    <Picker
                        iosHeader={I18n.t("Home.SelectOne")}
                        mode="dropdown"
                        selectedValue={this.state.month}
                        onValueChange={(newValue) => this.setState({month: newValue})}
                        style={styles.picker}
                    >
                        <Item label="فروردین" value="1" />
                        <Item label="اردیبهشت" value="2" />
                        <Item label="خرداد" value="3" />
                        <Item label="تیر" value="4" />
                        <Item label="مرداد" value="5" />
                        <Item label="شهریور" value="6" />
                        <Item label="مهر" value="7" />
                        <Item label="آبان" value="8" />
                        <Item label="آذر" value="9" />
                        <Item label="دی" value="10" />
                        <Item label="بهمن" value="11" />
                        <Item label="اسفند" value="12" />
                    </Picker>
                 </View>
                 <Text style={styles.topSalarySummary}>مبلغ کل دریافتی: 15,365,100 ریال</Text>
               </CardItem>
            </Card>
            <Card  style={styles.card}>
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
});

export default connect(mapStoreToProps, bindActions)(Home);
