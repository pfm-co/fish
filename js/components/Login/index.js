'use strict';


import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
var Modal   = require('react-native-modalbox');
var { Text } = require('../../common/FmText');
const ActivityIndicator = require('ActivityIndicator');
import styles from './styles';
import I18n from 'react-native-i18n'

import { login } from '../../actions/user';

const {
  jumpTo,
  replaceAt,
  pushRoute
} = actions;


const background = require('../../../images/bg3_small.jpg');
const appLogo = require('../../../images/appLogo_black.png');

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func,
    jumpTo: React.PropTypes.func,
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
    
    console.log("componentWillReceiveProps nextProps.isLoggedIn", nextProps.authState.isLoggedIn);
    if (nextProps.authState.isLoggedIn && !this.props.authState.isLoggedIn)
    {
        // user login was successfull, navigate to home page
        // this.props.pushRoute( { key: 'home' } , this.props.navigation.key);
        this.props.replaceAt('login', {key: 'home'}, this.props.navigation.key);
    }

    if (nextProps.authState.hasError)
    {
      this.modalDlg.open();
    }
  }


  render() {
    return (
      <Container>
        <Content scrollEnabled={false}>
          <View style={styles.bg}>

            <Image source={appLogo} style={styles.appLogo} />

            <View style={styles.loginForm}> 
              <InputGroup 
                iconRight={true} 
                style={[styles.input, {marginTop: 65}]}
              >
                <Icon name="ios-person" style={{fontSize: 27, color: "#135ca1"}} />
                <Input 
                  placeholder={I18n.t("Login.Username")}
                  onChangeText={username => this.setState({ username })}
                  value={this.state.username}
                  style={styles.inputText}
                />
              </InputGroup>

              <InputGroup 
                iconRight={true} 
                style={styles.input}
              >
                <Icon name="ios-unlock-outline" style={{fontSize: 27, color: "#135ca1"}} />
                <Input
                  placeholder={I18n.t("Login.Password")}
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  style={styles.inputText}
                />
              </InputGroup>

              <ActivityIndicator
                  size="small"
                  color="#382B5C"
                  animating={this.props.authState.isLoginInProgress}
              />

              
              <Button primary style={styles.btn} onPress={() => { 
                this.modalDlg.close();
                this.props.login(this.state.username, this.state.password);
              }}>
                <Text style={styles.btnText}>{I18n.t("Login.Login")}</Text>
              </Button>

            </View>
            
            <View style={styles.bottomSpacer} />

          </View>

          <Modal 
            style={[styles.modal]} 
            backdrop={true}  
            position={"center"}
            backdropOpacity={0.3}
            ref={(modalDlg) => {
                this.modalDlg = modalDlg;
            }}
            animationDuration={200}
            >
            <Text style={styles.loginError}>
                { I18n.t('Login.LoginError') + '، ' +
                  this.props.authState.errorMsg
                }
            </Text>
          </Modal>

        </Content>
      </Container>
    );
  }


}



function bindActions(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    jumpTo: (routeKey, key) => dispatch(jumpTo(routeKey, key)),
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
    isLoggedIn: store.user.isLoggedIn,
  }

});

export default connect(mapStoreToProps, bindActions)(Login);
