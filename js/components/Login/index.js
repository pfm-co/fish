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


  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <InputGroup style={styles.input}>
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
                    size="large"
                    color="#fff600"
                    animating={false}
                />

                
                <Button style={styles.btn} onPress={() => { 
                  // this.replaceRoute('home'); 
                  this.props.login(this.state.username, this.state.password);
                }}>
                  <Text style={styles.btnText}>{I18n.t("Login.Login")}</Text>
                </Button>
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
});

export default connect(mapStoreToProps, bindActions)(Login);
