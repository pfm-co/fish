'use strict';


import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
const ActivityIndicator = require('ActivityIndicator');
import styles from './styles';
import I18n from 'react-native-i18n'

import { login } from '../../actions/user';

const {
  replaceAt,
} = actions;


const background = require('../../../images/bg3_small.jpg');
const appLogo = require('../../../images/1_allah.png');

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      password: props.password,
    };
  }

  componentWillReceiveProps(nextProps)
  {
    // user login was successfull, navigate to home page
    if (nextProps.isLoggedIn == true)
    {
        this.props.replaceAt('login', { key: route }, this.props.navigation.key);
    }
  }


  render() {
    let errorMsg;
    if (this.props.authState.hasError) {
        errorMsg = (
            <Text style={styles.loginError}>
                { I18n.t('Login.LoginError') + '  ' +
                  this.props.authState.errorMsg
                }
            </Text>
        );
    }

    return (
      <Container>
        <View style={styles.container}>
          <Content  scrollEnabled={false}>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Image source={appLogo} style={styles.appLogo} />

                <InputGroup style={[styles.input, {marginTop: 150}]}>
                  <Icon name="ios-person" />
                  <Input 
                    placeholder={I18n.t("Login.Username")}
                    onChangeText={username => this.setState({ username })}
                    value={this.state.username}
                   />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Icon name="ios-unlock-outline" />
                  <Input
                    placeholder={I18n.t("Login.Password")}
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                  />
                </InputGroup>

                <ActivityIndicator
                    size="small"
                    color="#382B5C"
                    animating={this.props.authState.isLoginInProgress}
                />

                
                <Button primary ={styles.btn} onPress={() => { 
                  // this.replaceRoute('home'); 
                  this.props.login(this.state.username, this.state.password);
                }}>
                  <Text style={styles.btnText}>{I18n.t("Login.Login")}</Text>
                </Button>

                {errorMsg}
                
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }


}



function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    login: (username, password) => dispatch(login(username, password)),
  };
}

const mapStoreToProps = store => ({
  navigation: store.cardNavigation,
  username: store.user.username,
  password: store.user.password,
  authState: {
    isLoginInProgress: store.user.isLoginInProgress,
    hasError: store.user.hasError,
    errorMsg: store.user.errorMsg,

  }

});

export default connect(mapStoreToProps, bindActions)(Login);
